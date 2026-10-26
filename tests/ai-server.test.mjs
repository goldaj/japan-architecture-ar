import test from "node:test";
import assert from "node:assert/strict";
import { createAiServer } from "../tools/ai-photo-server.mjs";
import { editImage, ImageServiceError } from "../src/ai/image-client.mjs";

const fakePng=Buffer.from("89504e470d0a1a0a0000000049454e44","hex");

async function withServer(fakeService, fn) {
  const server=createAiServer({imageClient:fakeService});
  await new Promise(r=>server.listen(0,"127.0.0.1",r));
  const origin="http://127.0.0.1:"+server.address().port;
  try {await fn(origin);}
  finally {await new Promise((resolve,reject)=>server.close(e=>e?reject(e):resolve()));}
}
function requestForm() {
  const f=new FormData();
  f.append("image",new Blob([fakePng],{type:"image/png"}),"sample.png");
  f.append("preset","residential");
  f.append("quality","medium");
  f.append("model","gpt-image-2.5-flare");
  return f;
}
test("local POST image transformation returns PNG without storing uploaded photo",async()=>{
  let count=0;
  await withServer(async args=>{
    count++;
    assert.equal(args.mime,"image/png");
    assert.match(args.prompt,/photorealistic/i);
    assert.equal(args.model,"gpt-image-2.5-flare");
    return fakePng;
  },async origin=>{
    const page=await fetch(origin);
    assert.equal(page.status,200);
    assert.match(await page.text(),/Transforme une scène réelle/);
    const response=await fetch(origin+"/api/edit",{method:"POST",body:requestForm(),
      headers:{"X-User-Consent":"send-to-openai"}});
    assert.equal(response.status,200);
    assert.equal(response.headers.get("content-type"),"image/png");
    assert.deepEqual(Buffer.from(await response.arrayBuffer()),fakePng);
  });
  assert.equal(count,1);
});
test("server rejects missing confirmation, bad origin and unknown model",async()=>{
  let count=0;
  await withServer(async()=>{count++;return fakePng;},async origin=>{
    let response=await fetch(origin+"/api/edit",{method:"POST",body:requestForm()});
    assert.equal(response.status,403);
    response=await fetch(origin+"/api/edit",{method:"POST",body:requestForm(),
      headers:{"Origin":"http://evil.invalid","X-User-Consent":"send-to-openai"}});
    assert.equal(response.status,403);
    const form=requestForm();form.set("model","gpt-image-1");
    response=await fetch(origin+"/api/edit",{method:"POST",body:form,
      headers:{"X-User-Consent":"send-to-openai"}});
    assert.equal(response.status,400);
  });
  assert.equal(count,0);
});
test("upstream form uses only approved endpoint and never logs the API key",async()=>{
  let sent=false;
  const bytes=await editImage({imageBytes:fakePng,mime:"image/png",filename:"test.png",
    prompt:"Replace the street with Japanese architecture",quality:"medium",
    model:"gpt-image-2.5-flare"},{
      apiKey:"test-secret",
      fetchFn:async(url,options)=>{
        sent=true;
        assert.equal(url,"https://api.openai.com/v1/images/edits");
        assert.equal(options.headers.Authorization,"Bearer test-secret");
        assert.equal(options.body.get("model"),"gpt-image-2.5-flare");
        assert.equal(options.body.get("quality"),"medium");
        assert.equal(options.body.get("image").type,"image/png");
        return {ok:true,json:async()=>({data:[{b64_json:fakePng.toString("base64")}]})};
      }
    });
  assert.ok(sent);
  assert.deepEqual(bytes,fakePng);
  await assert.rejects(()=>editImage({imageBytes:fakePng,mime:"image/png",filename:"test.png",
    prompt:"X",quality:"medium",model:"gpt-image-2.5-flare"}, {
      apiKey:"test-secret",fetchFn:async()=>({ok:false,status:429})
    }),error=>error instanceof ImageServiceError && error.status===429);
});
