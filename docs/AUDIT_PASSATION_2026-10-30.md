# Audit contradictoire et passation — Japan Architecture AR (2026-10-30)

Vérification de 6 branches et 4 PR. Pas d'essai caméra/mobile, de service WebRTC ni de génération IA exécutés pendant la revue.

## Branches contre main
- `main` : `906ee1596d3e433da3efef7f8dbe529eda9c46fa` (référence).
- `develop` (`3b8cf1a81385ea13b0b5e05ea7fae34b229bf4dc`) — **behind**, avance 0, retard 12. Historique absorbé.
- `feat/ai-photo-transform` (`0dd851c0bcba5567e1f9c4350631a058666a8475`) — **diverged**, avance 2, retard 16. Commits exclusifs, mais vérifier si le prototype est encore dans le périmètre produit. Fichiers du différentiel (extrait) : .github/workflows/ci.yml, .gitignore, AGENTS.md, README.md, ai/app.mjs, ai/index.html, ai/style.css, docs/ADR_0001_AI_FIRST.md, docs/ARCHITECTURE.md, docs/CHATGPT_PROJECT_HISTORY.md.
- `feat/camera-tracking-baseline-20261029` (`a775dfd5314b50e1f229c7ac032f72393ea38913`) — **behind**, avance 0, retard 15. Historique absorbé.
- `feat/chatgpt-photo-mvp` (`a1cef27023c07bda1593631e1e02f5dc6a23f28d`) — **diverged**, avance 5, retard 19. Commits exclusifs, mais vérifier si le prototype est encore dans le périmètre produit. Fichiers du différentiel (extrait) : .github/workflows/ci.yml, README.md, docs/ARCHITECTURE.md, docs/CHATGPT_PROJECT_HISTORY.md, docs/HANDOFF.md, docs/PRODUCT.md, docs/ROADMAP.md, docs/SCENE_FORMAT.md, docs/TASKS.md, lens/README.md.
- `feat/live-webrtc-foundation` (`da20dd0d61aec2962c933b0737b9fac0ca5a308a`) — **behind**, avance 0, retard 1. Historique absorbé.

## PR historiques
- [#12](https://github.com/goldaj/japan-architecture-ar/pull/12) — closed, fusionnée : feat: live camera motion-tracking research baseline with instant reveal
- [#8](https://github.com/goldaj/japan-architecture-ar/pull/8) — closed, fusionnée : [WIP] Live-first: Scope WebRTC camera stream, instant reveal and temporal consistency criteria
- [#5](https://github.com/goldaj/japan-architecture-ar/pull/5) — closed, non fusionnée : [PARKED · photo-only] Archive POC image IA, superseded by Live WebRTC PR #8
- [#1](https://github.com/goldaj/japan-architecture-ar/pull/1) — closed, non fusionnée : [PARKED · procédural] Ancien prototype 2D, hors objectif visio live

## Structure
`.github`, `.gitignore`, `AGENTS.md`, `LICENSE`, `README.md`, `docs`, `live`, `tests`, `web`.

## Challenge de produit et sécurité
1. Le produit prioritaire a évolué vers **caméra live / révélation instantanée** ; les anciennes PR photo-only/procédural #5 et #1 ont été explicitement *parked*, même si des commits exclusifs subsistent. Ne pas les fusionner pour « faire disparaître » une divergence.
2. Mesurer le délai perçu (captation → résultat), stabilité temporelle du rendu vidéo, oscillation des transformations et débit sur appareil Android réel.
3. Auditer les permissions caméra, conservation des photos, journalisation, appels tiers, coût d'inférence, latence, consentement et expérience sans réseau.
4. Exécuter les tests de géométrie/streaming, API et pipeline WebRTC sur plateforme cible ; vérifier que les fonctionnalités en PR fusionnées #8 et #12 sont opérationnelles, pas seulement présentes dans le code.
5. Conserver `develop` tant que son rôle de coordination ou la documentation Git le demandent ; le fait d'être behind de `main` ne suffit pas à supprimer une branche structurante.

Aucune intégration ou sortie en production lors de cette passe. Tout réemploi d'un ancien POC doit être une décision de produit motivée et testée.
