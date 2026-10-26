import { createServer } from "node:http";
import { Readable } from "node:stream";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { editImage, ImageServiceError } from "../src/ai/image-client.mjs";
import { parseOptions } from "../src/ai/prompt.mjs";

export const MAX_UPLOAD = 12 * 1024 * 1024; // overall multipart payload
const ROOT = resolve(fileURLToPath(new URL("../ai/", import.meta.url)));
const FILES = Object.freeze({
  "/": ["index.html", "text/html; charset=utf-8"],
  "/app.mjs": ["app.mjs", "text/javascript; charset=utf-8"],
  "/style.css": ["style.css", "text/css; charset=utf-8"]
});
const MIME = new Set(["image/jpeg", "image/png", "image/webp"]);

function reply(res, status, message) {
  const data = Buffer.from(JSON.stringify({error:message}));
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Content-Length": data.length,
    "X-Content-Type-Options": "nosniff"
  });
  res.end(data);
}

async function readMultipart(req) {
  const ct = req.headers["content-type"] ?? "";
  if (typeof ct !== "string" || !ct.startsWith("multipart/form-data;")) {
    throw new ImageServiceError("Formulaire multipart attendu.",415);
  }
  const contentLength = Number(req.headers["content-length"]);
  if (Number.isFinite(contentLength) && contentLength > MAX_UPLOAD) {
    throw new ImageServiceError("Photo trop volumineuse (12 Mo maximum, formulaire compris).",413);
  }

  const parts = [];
  let received = 0;
  for await (const chunk of req) {
    received += chunk.length;
    if (received > MAX_UPLOAD) {
      throw new ImageServiceError("Photo trop volumineuse (12 Mo maximum).",413);
    }
    parts.push(chunk);
  }
  const request = new Request("http://127.0.0.1/transform", {
    method: "POST",
    headers: {"Content-Type": ct},
    body: Buffer.concat(parts)
  });
  try {return await request.formData();}
  catch {throw new ImageServiceError("Fichier multipart illisible.",400);}
}

export function createAiServer({imageClient=editImage}={}) {
  return createServer(async (req, res) => {
    try {
      // Local-only server; check Origin too to limit cross-site drive-by requests.
      const host = req.headers.host ?? "";
      if (!/^((127\.0\.0\.1)|(localhost))(:\d+)?$/.test(host)) {
        reply(res,403,"Accès local uniquement."); return;
      }
      if (req.headers.origin && req.headers.origin !== "http://" + host) {
        reply(res,403,"Origine non autorisée."); return;
      }
      const url = new URL(req.url ?? "/", "http://" + host);
      if (req.method === "GET" && Object.hasOwn(FILES,url.pathname)) {
        const [name,type] = FILES[url.pathname];
        const data = await readFile(resolve(ROOT,name));
        res.writeHead(200, {"Content-Type":type,"Content-Length":data.length,
          "Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
        res.end(data);
        return;
      }
      if (req.method === "GET" && url.pathname === "/health") {
        reply(res,200,"Local AI photo server ready"); return;
      }
      if (req.method !== "POST" || url.pathname !== "/api/edit") {
        reply(res,404,"Route inconnue."); return;
      }
      // Extra explicit signal in addition to the actual user button.
      if (req.headers["x-user-consent"] !== "send-to-openai") {
        reply(res,403,"Confirmation explicite de l'envoi requise."); return;
      }
      if (!process.env.OPENAI_API_KEY && imageClient === editImage) {
        reply(res,503,"Clé OPENAI_API_KEY absente. Voir README."); return;
      }
      const form = await readMultipart(req);
      const file = form.get("image");
      if (!file || typeof file.arrayBuffer !== "function" ||
          !MIME.has(file.type) || file.size <= 0 ||
          file.size > MAX_UPLOAD - 1024) {
        reply(res,400,"Utilise un JPEG, PNG ou WebP valide (12 Mo maximum)."); return;
      }
      const params = parseOptions({
        model:form.get("model"),
        quality:form.get("quality"),
        preset:form.get("preset"),
        extra:form.get("extra"),
        preserveForeground:form.get("preserveForeground")
      });
      const data = await imageClient({
        imageBytes:Buffer.from(await file.arrayBuffer()),
        filename: file.name || "source.png",mime:file.type,...params
      });
      res.writeHead(200,{"Content-Type":"image/png","Content-Length":data.length,
        "Cache-Control":"no-store","X-Content-Type-Options":"nosniff"});
      res.end(data);
    } catch (error) {
      reply(res, error instanceof ImageServiceError ? error.status
        : error instanceof RangeError ? 400 : 500,
        error instanceof ImageServiceError || error instanceof RangeError
          ? error.message : "Erreur interne du serveur.");
    }
  });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const server = createAiServer();
  server.listen(8765,"127.0.0.1",() => {
    console.log("AI Photo Japan: http://127.0.0.1:8765/");
    console.log(process.env.OPENAI_API_KEY
      ? "Clé API détectée : chaque clic Générer consommera du crédit API."
      : "Aucune clé API : renseigner OPENAI_API_KEY puis relancer le serveur.");
  });
}
