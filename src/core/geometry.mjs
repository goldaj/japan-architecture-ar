/**
 * Geometry expressed as normalized [0,1] image coordinates, clockwise
 * from top-left. Deliberately rejects tiny, concave or crossed facades.
 */
export const MIN_QUAD_AREA = 0.005;

export function signedArea(quad) {
  if (!Array.isArray(quad) || quad.length !== 4) {
    throw new TypeError("Une façade doit comporter exactement quatre points.");
  }
  let sum = 0;
  for (let i = 0; i < 4; i++) {
    const a = quad[i];
    const b = quad[(i + 1) % 4];
    sum += a.x * b.y - b.x * a.y;
  }
  return sum / 2;
}

export function validateQuad(quad) {
  if (!Array.isArray(quad) || quad.length !== 4) {
    throw new TypeError("Sélectionne quatre coins de façade.");
  }
  if (!quad.every((p) =>
    p !== null && typeof p === "object" &&
    Number.isFinite(p.x) && Number.isFinite(p.y) &&
    p.x >= 0 && p.x <= 1 && p.y >= 0 && p.y <= 1
  )) {
    throw new RangeError("Les points doivent rester dans l'image.");
  }

  const area = signedArea(quad);
  if (area < MIN_QUAD_AREA) {
    throw new RangeError("Façade trop petite ou coins dans le mauvais ordre.");
  }
  for (let i = 0; i < 4; i++) {
    const a = quad[i], b = quad[(i + 1) % 4], c = quad[(i + 2) % 4];
    const cross = (b.x - a.x) * (c.y - b.y) - (b.y - a.y) * (c.x - b.x);
    if (cross <= 1e-8) {
      throw new RangeError("Les quatre coins doivent dessiner un quadrilatère convexe.");
    }
  }
  return quad;
}

export function bilinear(quad, u, v) {
  const [tl, tr, br, bl] = quad;
  return {
    x: (1 - u) * (1 - v) * tl.x + u * (1 - v) * tr.x + u * v * br.x + (1 - u) * v * bl.x,
    y: (1 - u) * (1 - v) * tl.y + u * (1 - v) * tr.y + u * v * br.y + (1 - u) * v * bl.y
  };
}

export function toPixelQuad(quad, width, height) {
  validateQuad(quad);
  if (!(width > 0 && height > 0)) throw new RangeError("Taille d'image invalide.");
  return quad.map(({ x, y }) => ({ x: x * width, y: y * height }));
}
