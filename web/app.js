(function(){
"use strict";
const $=id=>document.getElementById(id),video=$("camera"),canvas=$("screen"),ctx=canvas.getContext("2d",{alpha:false});
const sample=document.createElement("canvas");sample.width=160;sample.height=90;
const sampleCtx=sample.getContext("2d",{willReadFrequently:true});
let stream=null,mode="raw",prev=null,anchor={x:80,y:45},frames=0,tracked=0,lost=0,startAt=0,lastFrame=0;
let msSamples=[],intervals=[],running=false,raf=null;
function message(s){$("message").textContent=s;}
function drawRoof(anchorX,anchorY){
 ctx.save();ctx.translate(anchorX,anchorY);const scale=Math.max(.6,Math.min(canvas.width/960,canvas.height/540));ctx.scale(scale,scale);
 ctx.globalAlpha=.9;
 ctx.fillStyle="#663a48";ctx.beginPath();ctx.moveTo(-160,-20);ctx.lineTo(0,-95);ctx.lineTo(160,-20);ctx.lineTo(185,0);ctx.lineTo(-185,0);ctx.closePath();ctx.fill();
 ctx.fillStyle="#392c42";ctx.fillRect(-118,0,236,142);
 ctx.fillStyle="#f2d8bd";ctx.fillRect(-110,10,220,125);
 for(const x of [-70,0,70]){ctx.fillStyle="#4d354b";ctx.fillRect(x-7,16,12,114);}
 for(const x of [-42,42]){ctx.fillStyle="#fff7d7";ctx.fillRect(x-18,28,36,76);}
 ctx.fillStyle="#ad534e";for(const x of [-150,150]){ctx.fillRect(x-6,5,12,85);ctx.beginPath();ctx.ellipse(x,2,24,35,0,0,Math.PI*2);ctx.fill();}
 ctx.fillStyle="#f8edd4";ctx.font="bold 14px sans-serif";ctx.fillText("SURCOUCHE 2D DE RECHERCHE", -130,165);
 ctx.restore();
}
function render(now){
 if(!running)return;
 const start=performance.now();
 if(video.readyState>=2){
  ctx.drawImage(video,0,0,canvas.width,canvas.height);
  if(mode!=="raw"){
   if(mode==="tracked"){
    sampleCtx.drawImage(video,0,0,160,90);
    const rgba=sampleCtx.getImageData(0,0,160,90).data;
    const curr=JapanTracking.gray(rgba,160,90);
    if(prev){
     const result=JapanTracking.estimate(prev,curr,160,90,anchor.x,anchor.y);
     if(result){anchor.x=Math.max(15,Math.min(144,anchor.x+result.dx));anchor.y=Math.max(15,Math.min(74,anchor.y+result.dy));tracked++;}
     else lost++;
    }
    prev=curr;
   }
   drawRoof(anchor.x/160*canvas.width,anchor.y/90*canvas.height);
  }
  frames++;
  if(lastFrame&&intervals.length<1800)intervals.push(now-lastFrame);
  lastFrame=now;
 }
 const spent=performance.now()-start;if(msSamples.length<1800)msSamples.push(spent);
 $("fps").textContent=intervals.length?(1000/(intervals.reduce((a,b)=>a+b,0)/intervals.length)).toFixed(1):"—";
 $("render-ms").textContent=JapanTracking.summarize(msSamples).p95.toFixed(1);
 $("track-rate").textContent=(tracked+lost?(100*tracked/(tracked+lost)).toFixed(0)+"%":"—");
 raf=requestAnimationFrame(render);
}
function changeMode(next){
 if(!["raw","screen","tracked"].includes(next))return;
 mode=next;prev=null;anchor={x:80,y:45};$("mode").textContent=next;
 if(video.readyState>=2){ctx.drawImage(video,0,0,canvas.width,canvas.height);if(next!=="raw")drawRoof(canvas.width/2,canvas.height/2);}
 message(next==="raw"?"Caméra réelle (aucune surcouche).":next==="tracked"?"Surcouche suivie par corrélation locale.":"Surcouche fixe à l'écran.");
}
async function start(){
 if(running)return;
 try{
  stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",width:{ideal:1280}},audio:false});
  video.srcObject=stream;await video.play();running=true;mode="raw";prev=null;frames=0;tracked=0;lost=0;msSamples=[];intervals=[];lastFrame=0;startAt=Date.now();
  $("start").disabled=true;$("stop").disabled=false;changeMode("raw");raf=requestAnimationFrame(render);
 }catch(e){stream?.getTracks().forEach(t=>t.stop());stream=null;message("Caméra inaccessible : autorisation refusée, navigateur incompatible ou contexte HTTP non sécurisé.");}
}
function stop(){
 running=false;if(raf!==null)cancelAnimationFrame(raf);
 stream?.getTracks().forEach(t=>t.stop());stream=null;video.srcObject=null;ctx.fillStyle="#0c1835";ctx.fillRect(0,0,canvas.width,canvas.height);
 $("start").disabled=false;$("stop").disabled=true;message("Caméra arrêtée, pistes média fermées.");
}
$("start").onclick=start;$("stop").onclick=stop;
document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>changeMode(b.dataset.mode));
$("reset").onclick=()=>{anchor={x:80,y:45};prev=null;message("Ancre réinitialisée.");};
$("report").onclick=()=>{
 const report={version:1,experimental:true,mode,started_at:startAt?new Date(startAt).toISOString():null,
 frames,tracking_success:tracked,tracking_lost:lost,render_ms:JapanTracking.summarize(msSamples),
 frame_interval_ms:JapanTracking.summarize(intervals),
 warning:"Mesure de temps de rendu JS seulement, pas de latence caméra-to-display ni stabilité 3D"};
 const url=URL.createObjectURL(new Blob([JSON.stringify(report,null,2)],{type:"application/json"}));
 const a=document.createElement("a");a.href=url;a.download="japan-ar-benchmark.json";document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
 message("Rapport local téléchargé, aucune image exportée.");
};
window.addEventListener("pagehide",stop,{once:true});
})();