/**
 * Public endpoint: POST https://api.openai.com/v1/images/edits
 * No SDK required. Keep credentials exclusively on server, never commit keys.
 */
const EDIT_ENDPOINT = "https://api.openai.com/v1/images/edits";
const MAX_OUTPUT_BYTES = 30 * 1024 * 1024;

export class ImageServiceError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = "ImageServiceError";
    this.status = status;
  }
}

export async function editImage({imageBytes, mime, filename, prompt, model, quality}, {
  apiKey = process.env.OPENAI_API_KEY,
  fetchFn = fetch
} = {}) {
  if (!apiKey) throw new ImageServiceError("Clé OPENAI_API_KEY absente dans le terminal du serveur.", 503);
  if (!Buffer.isBuffer(imageBytes) || imageBytes.length === 0) {
    throw new ImageServiceError("Photo absente.", 400);
  }
  const form = new FormData();
  form.append("model", model);
  form.append("prompt", prompt);
  form.append("quality", quality);
  form.append("output_format", "png");
  form.append("n", "1");
  form.append("image", new Blob([imageBytes], {type:mime}), filename);

  let response;
  try {
    response = await fetchFn(EDIT_ENDPOINT, {
      method: "POST",
      headers: {Authorization: "Bearer " + apiKey},
      body: form,
      signal: AbortSignal.timeout(240_000)
    });
  } catch (error) {
    throw new ImageServiceError(
      error?.name === "TimeoutError" || error?.name === "AbortError"
        ? "Délai de génération dépassé. Réessaie."
        : "Connexion à l'API impossible. Vérifie la connexion Internet.",
      502
    );
  }

  if (!response.ok) {
    const message = response.status === 401
      ? "Clé API invalide ou désactivée (401)."
      : response.status === 403
      ? "Accès au modèle refusé. Vérifie les droits et la vérification de l'organisation (403)."
      : response.status === 429
      ? "Limite ou quota API atteint (429). Vérifie la facturation."
      : "Erreur du service de génération (" + response.status + ").";
    throw new ImageServiceError(message, response.status >= 500 ? 502 : response.status);
  }
  let body;
  try {body = await response.json();}
  catch {throw new ImageServiceError("Réponse non JSON de l'API.");}
  const encoded = body?.data?.[0]?.b64_json;
  if (typeof encoded !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded) ||
      encoded.length > MAX_OUTPUT_BYTES * 1.4) {
    throw new ImageServiceError("Image de sortie manquante ou invalide.");
  }
  const output = Buffer.from(encoded, "base64");
  if (!output.length || output.length > MAX_OUTPUT_BYTES ||
      output.subarray(0,8).toString("hex") !== "89504e470d0a1a0a") {
    throw new ImageServiceError("L'API n'a pas renvoyé un PNG valide.");
  }
  return output;
}
