# Passation Codex : uniquement cas d'usage visio Japon live

**Date 2026-10-26.** Nouvelle demande explicite : la photo retouchée n'a aucune valeur comme livraison autonome. L'utilisateur veut une **visio réelle**, caméra mobile/qui tourne, environnement japonais crédible qui reste cohérent au retour, et bouton de révélation immédiat. Exactitude des bâtiments réels facultative; **consistance du monde généré obligatoire**.

## Lire en premier
1. `AGENTS.md`, `docs/ADR_0002_LIVE_ONLY.md` et `docs/EXPERIMENTS.md`.
2. `docs/RESEARCH_LIVE.md` et `docs/ARCHITECTURE.md`.
3. `docs/TASKS.md` et `docs/CHATGPT_PROJECT_HISTORY.md`.
4. [Branche de travail](https://github.com/goldaj/japan-architecture-ar/tree/feat/live-webrtc-foundation), [PR #1 (géométrie)](https://github.com/goldaj/japan-architecture-ar/pull/1) et [PR #5 (photo IA)](https://github.com/goldaj/japan-architecture-ar/pull/5) : ces deux dernières **parked**, ne pas merger.

## Avancement technique
- `live/` : serveur local Node 22, connexion Scope WebRTC et canvas, caméra navigateur, bascule J/R, fallback brut si frames IA périmées, tests simulés. Exigence Scope actuel >=24 Go VRAM.
- **CI = syntaxe, proxy, WebRTC offer construction et état de bascule seulement.**
- Aucun test de sortie vidéo japonaise, aucun benchmark 360°, aucun test OBS/visio, aucun téléphone.
- Scope est une dépendance externe installable séparément, pas un modèle livré avec notre code.

## Prochaine action utile
Faire fonctionner réellement Scope sur un GPU adapté (local/cloud), charger un pipeline V2V, tester la réception des frames et corriger seulement les défauts constatés du client. Ensuite tester 360° et loop closure avant d'investir dans effets visuels.

## Attention recherche
StreamV2V n'implique pas automatiquement mémoire persistante après disparition d'un objet hors champ. Expérimenter feature bank puis, **si échec**, formulation H2 cache d'images-clés associé à la pose/lieu. Pas de reconstruction 3D en aveugle.

## Honnêteté sur confidentialité et performances
Le flux webcam est transmis au moteur Scope WebRTC une fois que l'utilisateur déclenche la connexion. Si Scope est sur GPU distant, lire conditions fournisseur et sécuriser authentification/chiffrement; ce spike ne supporte que `127.0.0.1:8000`. Aucun temps réel certifié et aucun coût déclaré mesuré.
