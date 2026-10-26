const $ = (selector) => document.querySelector(selector);
const photo = $("#photo");
const before = $("#before");
const after = $("#after");
const empty = $("#empty");
const status = $("#status");
const consent = $("#consent");
const generate = $("#generate");
const download = $("#download");
let beforeUrl = null;
let afterUrl = null;
let busy = false;
function refresh() {
  generate.disabled = busy || !photo.files?.[0] || !consent.checked;
  generate.textContent = busy ? "Génération en cours…" : "Générer la transformation";
}
function revoke(url) { if(url) URL.revokeObjectURL(url); }
photo.addEventListener("change",() => {
  revoke(beforeUrl); beforeUrl = null;
  revoke(afterUrl); afterUrl = null;
  after.hidden = true;
  after.removeAttribute("src");
  download.hidden = true;
  empty.hidden = false;
  const file=photo.files?.[0];
  if (file) {
    beforeUrl=URL.createObjectURL(file);
    before.src=beforeUrl;
    status.textContent="Prêt : l'édition utilisera la photo actuellement chargée.";
  }
  refresh();
});
consent.addEventListener("change",refresh);
generate.addEventListener("click",async () => {
  if (busy || !consent.checked || !photo.files?.[0]) return;
  const file=photo.files[0];
  const fields=new FormData();
  fields.append("image",file,file.name);
  for (const name of ["preset","model","quality"]) fields.append(name,$("#"+name).value);
  fields.append("extra",$("#extra").value);
  fields.append("preserveForeground",$("#preserve").checked ? "true" : "false");
  busy=true;
  refresh();
  status.textContent="Envoi au modèle et génération de la photo. Une requête peut durer plusieurs dizaines de secondes.";
  try {
    const response=await fetch("/api/edit",{
      method:"POST",headers:{"X-User-Consent":"send-to-openai"},body:fields
    });
    if(!response.ok){
      const problem=await response.json().catch(()=>({error:"Erreur inconnue."}));
      throw new Error(problem.error || "Erreur de génération");
    }
    const blob=await response.blob();
    if(blob.type!=="image/png"||!blob.size) throw new Error("L'API n'a pas renvoyé un PNG.");
    revoke(afterUrl);
    afterUrl=URL.createObjectURL(blob);
    after.src=afterUrl;
    after.hidden=false;
    download.href=afterUrl;
    download.hidden=false;
    empty.hidden=true;
    status.textContent="Transformation terminée. Tu peux la comparer à la photo originale et télécharger le résultat.";
  } catch(error){
    status.textContent="Échec : "+error.message;
  } finally {busy=false;refresh();}
});
refresh();
