import { validateQuad } from "./geometry.mjs";
import { STYLES } from "./render.mjs";

export const SCENE_TYPE = "japan-architecture-ar/scene";
export const SCENE_VERSION = 1;
export const MAX_FACADES = 24;
export const MAX_SCENE_BYTES = 100_000;

function assertImage(image) {
  if (!image || typeof image !== "object" ||
      typeof image.name !== "string" || image.name.length > 255 ||
      !Number.isSafeInteger(image.size) || image.size <= 0 ||
      !Number.isSafeInteger(image.width) || image.width <= 0 || image.width > 16000 ||
      !Number.isSafeInteger(image.height) || image.height <= 0 || image.height > 16000 ||
      typeof image.sha256 !== "string" || !/^[a-f0-9]{64}$/.test(image.sha256)) {
    throw new RangeError("Métadonnées ou empreinte SHA-256 de photographie invalides.");
  }
  return {
    name: image.name, size: image.size, width: image.width,
    height: image.height, sha256: image.sha256
  };
}

function normalizeFacade(facade) {
  if (!facade || !Number.isSafeInteger(facade.id) || facade.id < 1 ||
      !Object.hasOwn(STYLES, facade.style) ||
      typeof facade.opacity !== "number" ||
      !Number.isFinite(facade.opacity) ||
      facade.opacity < 0 || facade.opacity > 1) {
    throw new RangeError("Identifiant, style ou opacité de façade invalide.");
  }
  validateQuad(facade.quad);
  return {
    id: facade.id,
    quad: facade.quad.map((p) => ({ x: p.x, y: p.y })),
    style: facade.style, opacity: facade.opacity
  };
}

export function validateScene(scene, expectedImage = null) {
  if (!scene || typeof scene !== "object" ||
      scene.type !== SCENE_TYPE || scene.version !== SCENE_VERSION ||
      !Array.isArray(scene.facades) || scene.facades.length > MAX_FACADES) {
    throw new RangeError("Format de scène inconnu ou nombre de façades excessif.");
  }
  const image = assertImage(scene.image);
  if (expectedImage) {
    const current = assertImage(expectedImage);
    if (image.sha256 !== current.sha256 ||
        image.width !== current.width || image.height !== current.height ||
        image.size !== current.size) {
      throw new RangeError("La scène ne correspond pas à la photo chargée.");
    }
  }
  const facades = scene.facades.map(normalizeFacade);
  if (new Set(facades.map((f) => f.id)).size !== facades.length) {
    throw new RangeError("Identifiants de façades dupliqués.");
  }
  return { type: SCENE_TYPE, version: SCENE_VERSION, image, facades };
}

export function createScene(image) {
  return validateScene({
    type: SCENE_TYPE, version: SCENE_VERSION,
    image: assertImage(image), facades: []
  });
}

export function addFacade(scene, quad, style = "machiya", opacity = 0.7) {
  const clean = validateScene(scene);
  if (clean.facades.length >= MAX_FACADES) {
    throw new RangeError("Maximum de " + MAX_FACADES + " façades.");
  }
  const id = clean.facades.reduce((acc, facade) => Math.max(acc, facade.id), 0) + 1;
  const facade = normalizeFacade({ id, quad, style, opacity });
  return {
    scene: { ...clean, facades: [...clean.facades, facade] },
    id
  };
}

export function moveCorner(scene, facadeId, cornerIndex, position) {
  const clean = validateScene(scene);
  if (!Number.isInteger(cornerIndex) || cornerIndex < 0 || cornerIndex > 3) {
    throw new RangeError("Coin de façade inconnu.");
  }
  let found = false;
  const facades = clean.facades.map((f) => {
    if (f.id !== facadeId) return f;
    found = true;
    const quad = f.quad.map((p, index) =>
      index === cornerIndex ? { x: position.x, y: position.y } : p);
    return normalizeFacade({ ...f, quad });
  });
  if (!found) throw new RangeError("Façade inconnue.");
  return { ...clean, facades };
}

export function updateFacade(scene, facadeId, options) {
  const clean = validateScene(scene);
  let found = false;
  const facades = clean.facades.map((f) => {
    if (f.id !== facadeId) return f;
    found = true;
    return normalizeFacade({ ...f, ...options, id: f.id, quad: f.quad });
  });
  if (!found) throw new RangeError("Façade inconnue.");
  return { ...clean, facades };
}

export function removeFacade(scene, facadeId) {
  const clean = validateScene(scene);
  return { ...clean, facades: clean.facades.filter((f) => f.id !== facadeId) };
}

export function serializeScene(scene) {
  const json = JSON.stringify(validateScene(scene), null, 2);
  if (json.length > MAX_SCENE_BYTES) throw new RangeError("Scène trop volumineuse.");
  return json;
}

export function deserializeScene(text, expectedImage) {
  if (typeof text !== "string" || text.length > MAX_SCENE_BYTES) {
    throw new RangeError("Fichier de scène invalide ou trop volumineux.");
  }
  return validateScene(JSON.parse(text), expectedImage);
}

export function nearestCorner(scene, point, width, height, preferredId = null, radius = 17) {
  if (!(width > 0 && height > 0 && radius > 0)) return null;
  const facades = scene.facades;
  const order = [
    ...facades.filter((f) => f.id === preferredId),
    ...facades.slice().reverse().filter((f) => f.id !== preferredId)
  ];
  for (const f of order) {
    let best = null;
    for (let i = 0; i < f.quad.length; i++) {
      const dx = (point.x - f.quad[i].x) * width;
      const dy = (point.y - f.quad[i].y) * height;
      const distance = Math.hypot(dx, dy);
      if (distance <= radius && (!best || distance < best.distance)) {
        best = { facadeId: f.id, index: i, distance };
      }
    }
    if (best) return { facadeId: best.facadeId, index: best.index };
  }
  return null;
}

export function facadeAtPoint(scene, point) {
  for (const facade of scene.facades.slice().reverse()) {
    let inside = true;
    for (let i = 0; i < 4; i++) {
      const a = facade.quad[i], b = facade.quad[(i + 1) % 4];
      const cross = (b.x - a.x) * (point.y - a.y) -
        (b.y - a.y) * (point.x - a.x);
      if (cross < -1e-10) { inside = false; break; }
    }
    if (inside) return facade.id;
  }
  return null;
}
