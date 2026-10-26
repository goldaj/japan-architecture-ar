import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import {resolve,dirname} from "node:path";
import {fileURLToPath} from "node:url";

const ROOT=dirname(fileURLToPath(import.meta.url));
const STATIC=Object.freeze({
  "/":["index.html","text/html; charset=utf-8"],
  "/app.mjs":["app.mjs","text/javascript; charset=utf-8"],
  "/stage-state.mjs":["stage-state.mjs","text/javascript; charset=utf-8"],
  "/scope-bridge.mjs":["scope-bridge.mjs","text/javascript; charset=utf-8"],
  "/style.css":["style.css","text/css; charset=utf-8"]
});
const PORT=8766;
const UPSTREAM="http://127.0.0.1:8000";
const MAX_SIGNAL=256*1024;
function reply(res,status,data,type="text/plain; charset=utf-8"){
  res.writeHead(status,{"Content-Type":type,"Cache-Control":"no-store",
    "X-Content-Type-Options":"nosniff"});
  res.end(data);
}
export function approvedScopePath(path,method) {
  if(method==="GET" && path==="/scope-api/ice-servers")return "/api/v1/webrtc/ice-servers";
  if(method==="POST" && path==="/scope-api/offer")return "/api/v1/webrtc/offer";
  const m=/^\/scope-api\/offer\/([A-Za-z0-9_-]{1,128})$/.exec(path);
  if(method==="PATCH" && m)return "/api/v1/webrtc/offer/"+m[1];
  return null;
}
export function createLiveServer({upstream=UPSTREAM,fetchFn=fetch}={}){
  return createServer(async(req,res)=>{
    try {
      const host=req.headers.host;
      if(!host || !/^(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(host)){
        reply(res,403,"Accès local uniquement.");return;
      }
      if(req.headers.origin && req.headers.origin!=="http://"+host){
        reply(res,403,"Origine non autorisée.");return;
      }
      const path=new URL(req.url||"/","http://"+host).pathname;
      if(req.method==="GET" && Object.hasOwn(STATIC,path)){
        const [name,type]=STATIC[path];
        const content=await readFile(resolve(ROOT,name));
        reply(res,200,content,type);return;
      }
      const upstreamPath=approvedScopePath(path,req.method);
      if(!upstreamPath){reply(res,404,"Chemin indisponible.");return;}
      let body=undefined;
      if(req.method!=="GET"){
        if(!String(req.headers["content-type"]||"").startsWith("application/json")){
          reply(res,415,"JSON attendu.");return;
        }
        let buffers=[],bytes=0;
        for await(const chunk of req){
          bytes+=chunk.length;
          if(bytes>MAX_SIGNAL){reply(res,413,"Signal WebRTC trop volumineux.");return;}
          buffers.push(chunk);
        }
        body=Buffer.concat(buffers);
      }
      const r=await fetchFn(upstream+upstreamPath,{
        method:req.method,
        headers:body?{"Content-Type":"application/json"}:undefined,
        body,signal:AbortSignal.timeout(15_000)
      });
      const content=await r.text();
      if(content.length>MAX_SIGNAL*2){reply(res,502,"Réponse Scope trop volumineuse.");return;}
      reply(res,r.status,content,"application/json; charset=utf-8");
    }catch(error){
      reply(res,502,"Scope indisponible : démarrer son serveur sur 127.0.0.1:8000 et charger un modèle compatible.");
    }
  });
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)){
  createLiveServer().listen(PORT,"127.0.0.1",()=>console.log("Japan Live : http://127.0.0.1:"+PORT+" (Scope attendu sur 127.0.0.1:8000)"));
}
