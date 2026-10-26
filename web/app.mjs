import { renderOverlay } from "../src/core/render.mjs";
import {
  MAX_FACADES, MAX_SCENE_BYTES, createScene, addFacade, moveCorner,
  updateFacade, removeFacade, nearestCorner, facadeAtPoint,
  serializeScene, deserializeScene
} from "../src/core/scene.mjs";

const $ = (selector) => document.querySelector(selector);
const photoInput = $("#photo");
const sceneInput = $("#load-scene");
const canvas = $("#preview");
const ctx = canvas.getContext("2d");
const facadeInput = $("#facade");
const styleInput = $("#style");
const opacityInput = $("#opacity");
const opacityValue = $("#opacity-value");
const status = $("#status");
const addButton = $("#add");
const undoButton = $("#undo");
const cancelButton = $("#cancel");
const removeButton = $("#remove");
const resetButton = $("#reset");
const exportButton = $("#export");
const overlayButton = $("#export-overlay");
const saveButton = $("#save-scene");

let photograph = null;
let scene = null;
let selectedId = null;
let pending = null;          // Array while choosing corners, null when editing.
let drag = null;             // { pointerId, cornerIndex }
let warning = "";
let imageLoadToken = 0;

const cornerNames = ["haut gauche", "haut droit", "bas droit", "bas gauche"];

async function sha256(file) {
  if (!globalThis.crypto || !crypto.subtle) {
    throw new Error("Ouvre cette page sur localhost ou HTTPS pour calculer l'empreinte.");
  }
  const bytes = await file.arrayBuffer();
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

function chosen() {
  return scene ? scene.facades.find((f) => f.id === selectedId) ?? null : null;
}

function syncStyle() {
  const selected = chosen();
  if (selected) {
    styleInput.value = selected.style;
    opacityInput.value = String(Math.round(selected.opacity * 100));
  }
}

function syncFacadeList() {
  facadeInput.replaceChildren();
  const placeholder = new Option("Aucune façade", "");
  facadeInput.add(placeholder);
  if (scene) {
    for (const facade of scene.facades) {
      facadeInput.add(new Option("Façade #" + facade.id + " · " + facade.style, String(facade.id)));
    }
  }
  facadeInput.value = selectedId === null ? "" : String(selectedId);
}

function statusMessage() {
  if (warning) return warning;
  if (!scene) return "Choisis une photographie pour commencer.";
  if (pending !== null) {
    return "Façade " + (scene.facades.length + 1) + " : coin " +
      (pending.length + 1) + "/4 (" + cornerNames[pending.length] + ").";
  }
  if (chosen()) {
    return scene.facades.length + " façade(s) · Façade #" + selectedId +
      " sélectionnée. Déplace un coin, modifie le style ou ajoute une autre façade.";
  }
  return scene.facades.length + " façade(s). Clique sur une façade pour l'éditer, ou ajoute-en une.";
}

function refreshControls() {
  const hasFacades = !!scene && scene.facades.length > 0;
  const selecting = pending !== null;
  addButton.disabled = !scene || scene.facades.length >= MAX_FACADES;
  undoButton.disabled = !selecting || pending.length === 0;
  cancelButton.disabled = !selecting;
  removeButton.disabled = !chosen() || selecting;
  resetButton.disabled = !scene || (!hasFacades && (!selecting || pending.length === 0));
  exportButton.disabled = !hasFacades;
  overlayButton.disabled = !hasFacades;
  saveButton.disabled = !hasFacades;
  sceneInput.disabled = !scene;
  facadeInput.disabled = !hasFacades;
  opacityValue.textContent = opacityInput.value + " %";
  status.textContent = statusMessage();
}

function drawQuadGuide(points, active, label) {
  if (!points || !points.length) return;
  const pts = points.map((p) => ({ x: p.x * canvas.width, y: p.y * canvas.height }));
  ctx.save();
  ctx.lineWidth = Math.max(2, canvas.width / 380);
  ctx.strokeStyle = active ? "#fff3b7" : "#6ff4dd";
  ctx.beginPath();
  pts.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
  if (pts.length === 4) ctx.closePath();
  ctx.stroke();
  if (active) {
    ctx.font = "bold " + Math.max(12, canvas.width / 65) + "px sans-serif";
    for (let i = 0; i < pts.length; i++) {
      ctx.beginPath();
      ctx.arc(pts[i].x, pts[i].y, Math.max(6, canvas.width / 140), 0, Math.PI * 2);
      ctx.fillStyle = "#fff3b7";
      ctx.fill();
      ctx.fillStyle = "#18232d";
      ctx.fillText(String(i + 1), pts[i].x + 10, pts[i].y - 10);
    }
  }
  if (label) {
    ctx.font = "bold " + Math.max(13, canvas.width / 70) + "px sans-serif";
    ctx.fillStyle = "#fff3b7";
    ctx.fillText(label, pts[0].x + 12, pts[0].y + 24);
  }
  ctx.restore();
}

function drawComposite(target, transparent = false) {
  if (!scene) return;
  if (!transparent) target.drawImage(photograph, 0, 0, target.canvas.width, target.canvas.height);
  for (const facade of scene.facades) {
    renderOverlay(target, facade.quad, { style: facade.style, opacity: facade.opacity });
  }
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (scene) {
    drawComposite(ctx);
    for (const facade of scene.facades) {
      drawQuadGuide(facade.quad, pending === null && facade.id === selectedId,
        facade.id === selectedId && pending === null ? "#" + facade.id : null);
    }
    if (pending !== null) drawQuadGuide(pending, true, null);
  } else {
    ctx.fillStyle = "#141a21";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ada8a0";
    ctx.fillText("Choisis une photographie de façade", canvas.width / 2, canvas.height / 2);
    ctx.textAlign = "left";
  }
  refreshControls();
}

function notify(message) {
  warning = message;
  refreshControls();
}

photoInput.addEventListener("change", async () => {
  const file = photoInput.files?.[0];
  if (!file) return;
  const token = ++imageLoadToken;
  if (!file.type.startsWith("image/") || file.size === 0 || file.size > 25_000_000) {
    notify("Choisis une image lisible de 25 Mo maximum.");
    return;
  }
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.onerror = () => {
    URL.revokeObjectURL(url);
    if (token === imageLoadToken) notify("Impossible de décoder cette photographie.");
  };
  image.onload = async () => {
    URL.revokeObjectURL(url);
    if (token !== imageLoadToken) return;
    try {
      if (!image.naturalWidth || !image.naturalHeight ||
          image.naturalWidth > 16000 || image.naturalHeight > 16000) {
        throw new RangeError("Dimensions de la photo non prises en charge.");
      }
      notify("Calcul de l'empreinte locale de la photographie...");
      const hash = await sha256(file);
      if (token !== imageLoadToken) return;
      const factor = Math.min(1, 1600 / Math.max(image.naturalWidth, image.naturalHeight));
      const imageMeta = {
        name: file.name, size: file.size,
        width: image.naturalWidth, height: image.naturalHeight, sha256: hash
      };
      const fresh = createScene(imageMeta);
      photograph = image;
      scene = fresh;
      canvas.width = Math.max(1, Math.round(image.naturalWidth * factor));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * factor));
      selectedId = null;
      pending = [];
      drag = null;
      warning = "";
      syncFacadeList();
      redraw();
    } catch (error) {
      if (token === imageLoadToken) notify(error.message);
    }
  };
  image.src = url;
});

function positionFromPointer(event, clamp = false) {
  const rect = canvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return null;
  let x = (event.clientX - rect.left) / rect.width;
  let y = (event.clientY - rect.top) / rect.height;
  if (clamp) {
    x = Math.min(1, Math.max(0, x));
    y = Math.min(1, Math.max(0, y));
  }
  if (x < 0 || x > 1 || y < 0 || y > 1) return null;
  return { x, y, width: rect.width, height: rect.height };
}

function beginFacade() {
  if (!scene || scene.facades.length >= MAX_FACADES) return;
  pending = [];
  selectedId = null;
  warning = "";
  syncFacadeList();
  redraw();
}

canvas.addEventListener("pointerdown", (event) => {
  if (!scene || event.button !== 0) return;
  const pointer = positionFromPointer(event);
  if (!pointer) return;
  const point = { x: pointer.x, y: pointer.y };
  warning = "";
  if (pending !== null) {
    const candidate = [...pending, point];
    if (candidate.length === 4) {
      try {
        const result = addFacade(scene, candidate, styleInput.value, Number(opacityInput.value) / 100);
        scene = result.scene;
        selectedId = result.id;
        pending = null;
        syncFacadeList();
        syncStyle();
      } catch (error) {
        warning = error.message + " Corrige le dernier point.";
      }
    } else {
      pending = candidate;
    }
    redraw();
    return;
  }

  const handle = nearestCorner(scene, point, pointer.width, pointer.height, selectedId);
  if (handle) {
    selectedId = handle.facadeId;
    syncFacadeList();
    syncStyle();
    drag = { pointerId: event.pointerId, cornerIndex: handle.index };
    canvas.setPointerCapture(event.pointerId);
    redraw();
    return;
  }
  const hit = facadeAtPoint(scene, point);
  if (hit !== null) {
    selectedId = hit;
    syncFacadeList();
    syncStyle();
    redraw();
    return;
  }
  if (scene.facades.length < MAX_FACADES) {
    pending = [point];
    selectedId = null;
    syncFacadeList();
    redraw();
  }
});

canvas.addEventListener("pointermove", (event) => {
  if (!drag || drag.pointerId !== event.pointerId || !scene) return;
  const pos = positionFromPointer(event, true);
  if (!pos) return;
  try {
    scene = moveCorner(scene, selectedId, drag.cornerIndex, { x: pos.x, y: pos.y });
    warning = "";
  } catch (error) {
    warning = "Coin non déplacé : " + error.message;
  }
  redraw();
});

function stopDrag(event) {
  if (drag && drag.pointerId === event.pointerId) {
    if (canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
    drag = null;
    warning = "";
    redraw();
  }
}
canvas.addEventListener("pointerup", stopDrag);
canvas.addEventListener("pointercancel", stopDrag);

addButton.addEventListener("click", beginFacade);
undoButton.addEventListener("click", () => {
  if (pending && pending.length) {
    pending.pop();
    warning = "";
    redraw();
  }
});
cancelButton.addEventListener("click", () => { pending = null; warning = ""; redraw(); });
removeButton.addEventListener("click", () => {
  if (!scene || selectedId === null) return;
  scene = removeFacade(scene, selectedId);
  selectedId = scene.facades.at(-1)?.id ?? null;
  pending = null;
  warning = "";
  syncFacadeList();
  syncStyle();
  redraw();
});
resetButton.addEventListener("click", () => {
  if (!scene) return;
  scene = createScene(scene.image);
  selectedId = null;
  pending = [];
  warning = "";
  syncFacadeList();
  redraw();
});
facadeInput.addEventListener("change", () => {
  selectedId = facadeInput.value ? Number(facadeInput.value) : null;
  pending = null;
  warning = "";
  syncStyle();
  redraw();
});
function updateChosenFacade() {
  warning = "";
  if (chosen() && pending === null) {
    try {
      scene = updateFacade(scene, selectedId, {
        style: styleInput.value, opacity: Number(opacityInput.value) / 100
      });
      syncFacadeList();
    } catch (error) {
      warning = error.message;
    }
  }
  redraw();
}
styleInput.addEventListener("change", updateChosenFacade);
opacityInput.addEventListener("input", updateChosenFacade);
document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLElement &&
      ["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(event.target.tagName)) return;
  if (event.key === "Escape" && pending !== null) {
    pending = null;
    warning = "";
    redraw();
  } else if ((event.key === "Delete" || event.key === "Backspace") && chosen() && pending === null) {
    removeButton.click();
  }
});

function downloadBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 15_000);
}

function downloadPng(transparent) {
  if (!scene || !scene.facades.length || !photograph) return;
  const output = document.createElement("canvas");
  output.width = canvas.width;
  output.height = canvas.height;
  const target = output.getContext("2d");
  drawComposite(target, transparent);
  output.toBlob((blob) => {
    if (blob) downloadBlob(blob, transparent ?
      "japan-architecture-overlay.png" : "japan-architecture-composite.png");
    else notify("Impossible de générer le PNG.");
  }, "image/png");
}
exportButton.addEventListener("click", () => downloadPng(false));
overlayButton.addEventListener("click", () => downloadPng(true));
saveButton.addEventListener("click", () => {
  if (!scene || !scene.facades.length) return;
  try {
    downloadBlob(new Blob([serializeScene(scene)], { type: "application/json" }),
      "japan-architecture-scene.json");
  } catch (error) { notify(error.message); }
});
sceneInput.addEventListener("change", async () => {
  const file = sceneInput.files?.[0];
  sceneInput.value = "";
  if (!file || !scene) return;
  if (file.size > MAX_SCENE_BYTES) return notify("Fichier JSON trop volumineux.");
  try {
    const restored = deserializeScene(await file.text(), scene.image);
    scene = restored;
    selectedId = scene.facades.at(-1)?.id ?? null;
    pending = null;
    drag = null;
    warning = "";
    syncFacadeList();
    syncStyle();
    redraw();
  } catch (error) {
    notify("Projet non importé : " + error.message);
  }
});
redraw();
