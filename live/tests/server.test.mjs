import test from "node:test";
import assert from "node:assert/strict";
import {createLiveServer,approvedScopePath} from "../server.mjs";

test("scope proxy only forwards explicit signalling routes",()=>{
  assert.equal(approvedScopePath("/scope-api/ice-servers","GET"),"/api/v1/webrtc/ice-servers");
  assert.equal(approvedScopePath("/scope-api/offer","POST"),"/api/v1/webrtc/offer");
  assert.equal(approvedScopePath("/scope-api/offer/sID_13","PATCH"),"/api/v1/webrtc/offer/sID_13");
  assert.equal(approvedScopePath("/scope-api/offer/../x","PATCH"),null);
  assert.equal(approvedScopePath("/scope-api/anything","GET"),null);
});
test("serves live client, proxies only JSON signalling and blocks foreign origins",async()=>{
  const seen=[];
  const upstream=async(url,opts)=>{
    seen.push({url,method:opts.method});
    return {status:200,ok:true,text:async()=>JSON.stringify({iceServers:[]})};
  };
  const srv=createLiveServer({fetchFn:upstream});
  await new Promise(ok=>srv.listen(0,"127.0.0.1",ok));
  const base="http://127.0.0.1:"+srv.address().port;
  try{
    let r=await fetch(base+"/");
    assert.equal(r.status,200);
    assert.match(await r.text(),/Japan Live/);
    r=await fetch(base+"/scope-api/ice-servers");
    assert.deepEqual(await r.json(),{iceServers:[]});
    r=await fetch(base+"/scope-api/offer",{method:"POST",headers:{
      Origin:"https://malicious.example","Content-Type":"application/json"
    },body:"{}"});
    assert.equal(r.status,403);
    r=await fetch(base+"/scope-api/offer",{method:"POST",
      headers:{"Content-Type":"application/json"},body:"{}"});
    assert.equal(r.status,200);
    assert.deepEqual(seen.map(x=>x.method),["GET","POST"]);
    assert.ok(seen.every(x=>x.url.startsWith("http://127.0.0.1:8000/api/v1/webrtc/")));
  }finally{
    await new Promise((ok,err)=>srv.close(e=>e?err(e):ok()));
  }
});
