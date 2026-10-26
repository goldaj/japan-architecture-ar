import { bilinear, toPixelQuad } from "./geometry.mjs";

export const STYLES = Object.freeze({
  machiya: Object.freeze({
    label: "Machiya (bois et indigo)",
    wall: "#5c3925",
    wood: "#dfb981",
    dark: "#2b221c",
    banner: "#355264",
    border: "#eed4a4"
  }),
  matsuri: Object.freeze({
    label: "Matsuri (vermillon et lanternes)",
    wall: "#4c3035",
    wood: "#e6c99b",
    dark: "#321e25",
    banner: "#b93432",
    border: "#f6dfbd"
  })
});

/**
 * Stylized, reproducible 2D facade overlay. No tracking, depth, AI or
 * semantic claim about the photographed building. Points are normalized.
 */
export function renderOverlay(ctx, quad, { style = "machiya", opacity = 0.7 } = {}) {
  if (!ctx || !ctx.canvas || typeof ctx.save !== "function") {
    throw new TypeError("Un contexte Canvas 2D est requis.");
  }
  if (!Object.hasOwn(STYLES, style)) throw new RangeError("Style inconnu.");
  if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1) {
    throw new RangeError("Opacité attendue entre 0 et 1.");
  }
  const p = toPixelQuad(quad, ctx.canvas.width, ctx.canvas.height);
  const palette = STYLES[style];
  const at = (u, v) => bilinear(p, u, v);
  const path = (corners) => {
    ctx.beginPath();
    corners.forEach(([u, v], index) => {
      const pos = at(u, v);
      if (index === 0) ctx.moveTo(pos.x, pos.y);
      else ctx.lineTo(pos.x, pos.y);
    });
    ctx.closePath();
  };
  const fillPanel = (coords, color) => {
    path(coords);
    ctx.fillStyle = color;
    ctx.fill();
  };
  const strokeSegment = (u1, v1, u2, v2, color, px) => {
    const a = at(u1, v1), b = at(u2, v2);
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineWidth = px;
    ctx.strokeStyle = color;
    ctx.stroke();
  };

  const thickness = Math.max(2, Math.min(ctx.canvas.width, ctx.canvas.height) / 180);
  ctx.save();
  try {
    ctx.globalAlpha = opacity;
    path([[0, 0], [1, 0], [1, 1], [0, 1]]);
    ctx.clip();

    fillPanel([[0, 0], [1, 0], [1, 1], [0, 1]], palette.wall);
    // Floor/wall dividing beam and staggered wooden lattice, all perspective-aware.
    fillPanel([[0, 0], [1, 0], [1, 0.12], [0, 0.12]], palette.dark);
    fillPanel([[0, 0.72], [1, 0.72], [1, 0.76], [0, 0.76]], palette.dark);
    fillPanel([[0, 0.96], [1, 0.96], [1, 1], [0, 1]], palette.dark);
    for (let column = 0; column <= 12; column++) {
      const u = column / 12;
      strokeSegment(u, 0.12, u, 0.96, palette.wood, thickness);
    }
    for (let row = 1; row <= 5; row++) {
      const v = 0.14 + row * 0.115;
      strokeSegment(0, v, 1, v, palette.wood, thickness * 0.65);
    }
    // Norén-inspired panel, confined to the selected building facade.
    fillPanel([[0.27, 0.36], [0.73, 0.36], [0.73, 0.59], [0.27, 0.59]], palette.banner);
    for (let i = 1; i <= 3; i++) {
      const u = 0.27 + i * (0.46 / 4);
      strokeSegment(u, 0.44, u, 0.59, palette.border, thickness / 2);
    }
    strokeSegment(0.25, 0.35, 0.75, 0.35, palette.border, thickness * 2);
    // Eave accent under the top edge, no false 3D roof claim.
    strokeSegment(0, 0.12, 1, 0.12, palette.border, thickness * 2.3);
  } finally {
    ctx.restore();
  }
  return { style, opacity, vertices: p.length };
}
