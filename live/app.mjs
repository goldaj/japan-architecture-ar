import { StageState } from "./stage-state.mjs";
import { ScopeBridge, DEFAULT_PROMPT } from "./scope-bridge.mjs";

const $=s=>document.querySelector(s);
const input=$("#input"), generated=$("#generated"), stage=$("#stage");
const ctx=stage.getContext("2d",{alpha:false});
const state=new StageState();
const prompt=$("#prompt"),status=$("#status"),stats=$("#stats");
const camBtn=$("#camera"),connectBtn=$("#connect"),disconnectBtn=$("#disconnect"),
  japanBtn=$("#japan"),revealBtn=$("#reveal"),fullscreenBtn=$("#fullscreen");
prompt.value=DEFAULT_PROMPT;
let cameraStream=null,bridge=null,remoteStream=null,lastTick=performance.now(),renderCount=0;
let lastFrameCount=0;
const note=m=>{status.textContent=m;};

function setButtons(){
  connectBtn.disabled=!cameraStream || !!bridge;
  disconnectBtn.disabled=!bridge;
  japanBtn.disabled=!bridge || state.effectEnabled;
  revealBtn.disabled=!cameraStream || !state.effectEnabled;
  camBtn.disabled=!!cameraStream;
}
function reveal(){state.reveal();setButtons();note("Réalité : caméra brute. Le flux génératif peut rester actif en arrière-plan.");}
function enableJapan(){
  if(!bridge)return;
  state.enable();setButtons();
  note(state.degraded(performance.now())
    ?"Mode Japon demandé, mais aucune image générée fraîche : caméra brute affichée."
    :"Mode Japon : vidéo générée visible.");
}
camBtn.addEventListener("click",async()=>{
  if(cameraStream)return;
  try{
    cameraStream=await navigator.mediaDevices.getUserMedia({
      audio:false,video:{width:{ideal:640},height:{ideal:360},frameRate:{ideal:15,max:20}}
    });
    input.srcObject=cameraStream;await input.play();
    note("Caméra ouverte. Démarrer Scope et charger un modèle avant la connexion.");
  }catch(e){note("Accès caméra impossible : "+e.message);}
  setButtons();
});
connectBtn.addEventListener("click",async()=>{
  if(!cameraStream || bridge)return;
  bridge=new ScopeBridge({
    onStatus:note,
    onTrack:stream=>{
      remoteStream=stream;generated.srcObject=stream;
      generated.play().catch(e=>note("Vidéo Scope non lisible : "+e.message));
      // rVFC indicates a decoded, *new* output frame. Mere video readiness is insufficient.
      if(typeof generated.requestVideoFrameCallback!=="function"){
        note("Le navigateur ne prend pas en charge le comptage de frames vidéo; utiliser Chrome/Edge récent.");
      }else{
        const watch=()=>{
          if(!bridge||generated.srcObject!==stream)return;
          generated.requestVideoFrameCallback((now)=>{
            if(!bridge||generated.srcObject!==stream)return;
            state.onGeneratedFrame(now);
            lastFrameCount++;
            watch();
          });
        };
        watch();
      }
    }
  });
  setButtons();note("Ouverture WebRTC vers Scope...");
  try{await bridge.start(cameraStream,prompt.value);}
  catch(e){note("Échec connexion : "+e.message);bridge?.stop();bridge=null;setButtons();}
});
disconnectBtn.addEventListener("click",()=>{
  reveal();bridge?.stop();bridge=null;remoteStream=null;generated.srcObject=null;
  state.clearGenerated();setButtons();note("Scope arrêté; caméra brute active.");
});
japanBtn.addEventListener("click",enableJapan);
revealBtn.addEventListener("click",reveal);
fullscreenBtn.addEventListener("click",()=>stage.requestFullscreen().catch(e=>note(e.message)));
document.addEventListener("keydown",e=>{
  if(["TEXTAREA","INPUT","SELECT"].includes(e.target?.tagName))return;
  const key=e.key.toLowerCase();
  if(key==="r"||e.code==="Space"){e.preventDefault();reveal();}
  if(key==="j"){e.preventDefault();enableJapan();}
});
function render(now){
  // Keep the raw video available on every frame: reveal cannot depend on model.
  const showGenerated=state.source(now)==="generated" && generated.readyState>=2;
  const src=showGenerated?generated:input;
  if(src.readyState>=2){
    ctx.drawImage(src,0,0,stage.width,stage.height);
  }else{
    ctx.fillStyle="#0e151e";ctx.fillRect(0,0,stage.width,stage.height);
    ctx.fillStyle="white";ctx.font="20px sans-serif";ctx.fillText("Caméra indisponible",24,42);
  }
  renderCount++;
  if(now-lastTick>=1000){
    stats.textContent="Source affichée : "+(showGenerated?"Japon (IA)":"Réalité (brute)")+
      " · Rendu écran : "+Math.round(renderCount*1000/(now-lastTick))+" i/s"+
      " · Frames IA reçues : "+lastFrameCount+" (cumul)"+
      (state.degraded(now)?" · Flux IA absent ou périmé":"");
    lastTick=now;renderCount=0;
  }
  requestAnimationFrame(render);
}
requestAnimationFrame(render);setButtons();
window.addEventListener("pagehide",()=>{
  bridge?.stop();
  cameraStream?.getTracks().forEach(t=>t.stop());
});
