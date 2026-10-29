/**
 * WebRTC signalling adapter to an already-running Daydream Scope server.
 * Source: https://github.com/daydreamlive/scope/blob/main/docs/api/sendreceive.md
 * Browser talks to the local proxy /scope-api, media is exchanged with Scope
 * via WebRTC, NOT forwarded or stored by this Node server.
 */
export const DEFAULT_PROMPT = [
  "Continuous live video-to-video transformation of a moving camera.",
  "A believable Japanese residential neighborhood with tiled roofs, timber,",
  "Japanese streets, vegetation, sakura trees, and coherent natural light.",
  "Maintain the same buildings, street layout and tree identities consistently",
  "through turns, occlusion and camera motion. Avoid temporal flicker.",
  "Keep the camera motion responsive; do not invent scene cuts."
].join(" ");

export function buildOffer(sdp, type, prompt) {
  if (typeof sdp!=="string" || !sdp.length || !["offer"].includes(type)) throw new TypeError("Offre WebRTC invalide");
  if (typeof prompt!=="string" || !prompt.trim() || prompt.length>2000) throw new RangeError("Prompt invalide");
  return {sdp,type,initialParameters:{
    input_mode:"video",prompts:[{text:prompt.trim(),weight:1.0}],
    denoising_step_list:[700,500]
  }};
}
export function icePatch(candidate) {
  if (!candidate || typeof candidate.candidate!=="string") throw new TypeError("Candidat ICE invalide");
  return {candidates:[{
    candidate:candidate.candidate,
    sdpMid:candidate.sdpMid ?? null,
    sdpMLineIndex:candidate.sdpMLineIndex ?? null
  }]};
}
async function jsonFetch(url,options={}) {
  const r=await fetch(url,options);
  if (!r.ok) throw new Error("Signalisation Scope impossible (HTTP "+r.status+"). Serveur et modèle chargés ?");
  return r.json();
}
export class ScopeBridge {
  constructor({onTrack=()=>{},onStatus=()=>{}}={}) {
    this.onTrack=onTrack;
    this.onStatus=onStatus;
    this.pc=null;this.dc=null;this.sessionId=null;this.generation=0;
  }
  async start(stream,prompt=DEFAULT_PROMPT) {
    this.stop();
    const generation=this.generation;
    if (!stream?.getVideoTracks()?.length) throw new Error("Caméra non disponible.");
    const ice=await jsonFetch("/scope-api/ice-servers");
    if(generation!==this.generation)return;
    const pc=new RTCPeerConnection({iceServers:ice.iceServers || []});
    this.pc=pc;
    const queued=[];
    const sendCandidate=async (candidate) => {
      if (!this.sessionId || generation!==this.generation) return;
      await jsonFetch("/scope-api/offer/"+encodeURIComponent(this.sessionId), {
        method:"PATCH",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(icePatch(candidate))
      });
    };
    pc.onicecandidate=e=>{
      if(!e.candidate)return;
      if(this.sessionId)sendCandidate(e.candidate).catch(err=>this.onStatus(err.message));
      else queued.push(e.candidate);
    };
    pc.onconnectionstatechange=()=>this.onStatus("WebRTC : "+pc.connectionState);
    pc.ontrack=e=>{if(generation===this.generation)this.onTrack(e.streams?.[0] || new MediaStream([e.track]));};
    this.dc=pc.createDataChannel("parameters",{ordered:true});
    this.dc.onmessage=e=>{
      try{
        const m=JSON.parse(e.data);
        if(m.type==="stream_stopped"){
          this.onStatus("Scope a arrêté le flux : "+(m.error_message||"sans précision"));
          this.stop();
        }
      }catch {this.onStatus("Message Scope non reconnu.");}
    };
    for (const track of stream.getVideoTracks()) pc.addTrack(track,stream);
    try{
      const offer=await pc.createOffer();
      if(generation!==this.generation)return;
      await pc.setLocalDescription(offer);
      const response=await jsonFetch("/scope-api/offer",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify(buildOffer(pc.localDescription.sdp,pc.localDescription.type,prompt))
      });
      if(generation!==this.generation)return;
      if(!response.sessionId || !response.sdp || response.type!=="answer")throw new Error("Réponse WebRTC Scope incomplète");
      this.sessionId=response.sessionId;
      await pc.setRemoteDescription({sdp:response.sdp,type:response.type});
      if(generation!==this.generation)return;
      for (const c of queued) await sendCandidate(c);
      this.onStatus("Connexion Scope initialisée. Attente des images vidéo générées.");
    }catch(error){
      if(generation===this.generation)this.stop();
      throw error;
    }
  }
  stop(){
    ++this.generation;
    this.sessionId=null;
    if(this.dc){this.dc.close();this.dc=null;}
    if(this.pc){this.pc.close();this.pc=null;}
  }
}
