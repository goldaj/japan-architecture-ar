import { validateQuad } from "../src/core/geometry.mjs";
import { renderOverlay } from "../src/core/render.mjs";

const photoInput = document.querySelector("#photo");
const canvas = document.querySelector("#preview");
const ctx = canvas.getContext("2d");
const styleInput = document.querySelector("#style");
const opacityInput = document.querySelector("#opacity");
const opacityValue = document.querySelector("#opacity-value");
const status = document.querySelector("#status");
const undoButton = document.querySelector("#undo");
const resetButton = document.querySelector("#reset");
const exportButton = document.querySelector("#export");
const exportOverlayButton = document.querySelector("#export-overlay");

let photograph = null;
let corners = [];
let warning = "";

function statusText() {
  if (!photograph) return "Choisis une photographie pour commencer.";
  if (warning) return warning;
  if (corners.length === 4) return "Façade sélectionnée. Ajuste le style et exporte le PNG.";
  return "Coin " + (corners.length + 1) + "/4 : " +
    ["haut gauche", "haut droit", "bas droit", "bas gauche"][corners.length] + ".";
}

function refreshButtons() {
  undoButton.disabled = corners.length === 0;
  resetButton.disabled = corners.length === 0;
  exportButton.disabled = !photograph || corners.length !== 4;
  exportOverlayButton.disabled = exportButton.disabled;
  opacityValue.textContent = opacityInput.value + " %";
  status.textContent = statusText();
}

function drawGuide(context) {
  if (!corners.length) return;
  context.save();
  const pts = corners.map((p) => ({x:p.x * canvas.width,y:p.y * canvas.height}));
  context.strokeStyle = "#fff0c4";
  context.lineWidth = Math.max(2, canvas.width / 350);
  context.beginPath();
  pts.forEach((point, index) => index === 0 ? context.moveTo(point.x,point.y) : context.lineTo(point.x,point.y));
  if (pts.length === 4) context.closePath();
  context.stroke();
  pts.forEach((p, index) => {
    context.beginPath();
    context.fillStyle = "#fff0c4";
    context.arc(p.x,p.y,Math.max(5,canvas.width/130),0,Math.PI*2);
    context.fill();
    context.font = "bold " + Math.max(13,canvas.width/55) + "px sans-serif";
    context.fillStyle = "#1b202a";
    context.fillText(String(index+1),p.x+11,p.y-11);
  });
  context.restore();
}

function redraw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if (photograph) {
    ctx.drawImage(photograph,0,0,canvas.width,canvas.height);
    if (corners.length === 4) {
      renderOverlay(ctx,corners,{style:styleInput.value,opacity:Number(opacityInput.value)/100});
    }
  } else {
    ctx.fillStyle = "#141a21";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#a9a7a0";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Une photo de façade pour commencer",canvas.width/2,canvas.height/2);
    ctx.textAlign = "left";
  }
  drawGuide(ctx);
  refreshButtons();
}

photoInput.addEventListener("change", () => {
  const file = photoInput.files && photoInput.files[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    warning = "Ce fichier n'est pas une image.";
    refreshButtons();
    return;
  }
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onload = () => {
    URL.revokeObjectURL(url);
    // Bound output memory and pixel cost on phones.
    const factor = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
    canvas.width = Math.max(1,Math.round(image.naturalWidth * factor));
    canvas.height = Math.max(1,Math.round(image.naturalHeight * factor));
    photograph = image;
    corners = [];
    warning = "";
    redraw();
  };
  image.onerror = () => {
    URL.revokeObjectURL(url);
    warning = "Image illisible. Choisis un autre fichier.";
    refreshButtons();
  };
  image.src = url;
});

canvas.addEventListener("click", (event) => {
  if (!photograph) return;
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const x = (event.clientX - rect.left) / rect.width;
  const y = (event.clientY - rect.top) / rect.height;
  if (x < 0 || x > 1 || y < 0 || y > 1) return;
  if (corners.length === 4) corners = [];
  corners.push({x,y});
  warning = "";
  if (corners.length === 4) {
    try {
      validateQuad(corners);
    } catch (error) {
      corners.pop();
      warning = error.message + " Corrige le quatrième coin.";
    }
  }
  redraw();
});

undoButton.addEventListener("click",() => {corners.pop();warning="";redraw();});
resetButton.addEventListener("click",() => {corners=[];warning="";redraw();});
styleInput.addEventListener("change",redraw);
opacityInput.addEventListener("input",redraw);

function downloadPng(transparent) {
  if (!photograph || corners.length !== 4) return;
  const output = document.createElement("canvas");
  output.width = canvas.width;
  output.height = canvas.height;
  const out = output.getContext("2d");
  if (!transparent) out.drawImage(photograph,0,0,output.width,output.height);
  renderOverlay(out,corners,{style:styleInput.value,opacity:Number(opacityInput.value)/100});
  const link = document.createElement("a");
  link.download = transparent ? "japan-architecture-overlay.png" : "japan-architecture-composite.png";
  link.href = output.toDataURL("image/png");
  link.click();
}
exportButton.addEventListener("click",() => downloadPng(false));
exportOverlayButton.addEventListener("click",() => downloadPng(true));
redraw();
