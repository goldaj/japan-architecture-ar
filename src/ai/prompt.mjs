export const PRESETS = Object.freeze({
  residential: {
    title: "Quartier japonais au crépuscule",
    brief: "Transform the exterior environment into a believable, photorealistic Japanese residential neighborhood at blue hour: authentic Japanese tiled roofs and wooden architectural details, warm shoji-lit windows, blooming sakura trees in place of ordinary roadside trees, subtle lanterns, gentle sunset sky, believable street surfaces and greenery."
  },
  kyoto: {
    title: "Kyoto traditionnel de jour",
    brief: "Make the outdoor environment look like a believable photorealistic Kyoto neighborhood in daylight: machiya houses with weathered wood facades, ceramic roofs, restrained noren curtains, trees and paved lanes appropriate to a traditional Japanese residential street. Natural daylight and convincing materials."
  },
  tokyo: {
    title: "Tokyo contemporain nocturne",
    brief: "Transform the exterior built environment into a realistic Tokyo residential district after sunset: contemporary Japanese architecture, subtle storefront signage, street markings, warm apartment lights, carefully balanced neon and reflected light on the road. Keep it like a real photograph, not anime or cyberpunk."
  }
});

export function buildEditPrompt({ preset = "residential", extra = "", preserveForeground = true } = {}) {
  if (!Object.hasOwn(PRESETS, preset)) throw new RangeError("Préréglage inconnu.");
  if (typeof extra !== "string" || extra.length > 1500) throw new RangeError("Consigne trop longue.");
  return [
    "Edit the INPUT PHOTOGRAPH, do not invent a new camera shot. Output a convincing single photorealistic image.",
    "Preserve camera angle, perspective, composition, vanishing points, relative positions of all buildings, streets, trees and large objects. Do not add or remove floors, move buildings or invent large new structures. Retain recognizable scene geometry.",
    preserveForeground
      ? "Preserve all existing near-camera interior objects, glass doors and window frames, handles, balcony railings, furniture and foreground silhouettes precisely. Transform primarily the landscape and architecture visible beyond them."
      : "You may restyle foreground scene materials when visually appropriate, but preserve object positions, shapes and camera viewpoint.",
    PRESETS[preset].brief,
    "Harmonize architecture, foliage, roads, sky, window light and shadows together, rather than overlaying flat rectangles or decorative stickers. Respect occlusion, realistic textures and photographic detail. No logos, captions or watermarks.",
    extra.trim() ? "User-specific additional requirement: " + extra.trim() : ""
  ].filter(Boolean).join("\n\n");
}

export function parseOptions(fields) {
  const model = String(fields.model ?? "gpt-image-2.5-flare");
  const quality = String(fields.quality ?? "medium");
  const preset = String(fields.preset ?? "residential");
  const extra = String(fields.extra ?? "");
  const preserveForeground = fields.preserveForeground !== "false";
  if (!["gpt-image-2.5-flare", "gpt-image-2.5-sunburst"].includes(model)) {
    throw new RangeError("Modèle inconnu.");
  }
  if (!["low", "medium", "high"].includes(quality)) {
    throw new RangeError("Qualité inconnue.");
  }
  return {
    model, quality,
    prompt: buildEditPrompt({preset, extra, preserveForeground})
  };
}
