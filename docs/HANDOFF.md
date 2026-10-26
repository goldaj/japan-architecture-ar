# Passation technique Codex : arrêt du 2026-10-26

## État prouvé
- `develop` initialisée avec docs et consignes (commit `89d0135`).
- Branche `feat/chatgpt-photo-mvp` : laboratoire photo navigateur sans dépendances, géométrie convexe normalisée, façades 2 palettes, Canvas, export PNG; tests Node et CI définis; squelette Lens Studio.
- **Aucune garantie de validation en navigateur ou Lens Studio** tant qu'une session manuelle n'a pas été inscrite.
- CI GitHub vérifiée : https://github.com/goldaj/japan-architecture-ar/actions/runs/40347699893 : `npm run check` et `npm test` **success** sur commit initial de PR #1. Des modifications de documentation/export ont suivi et nécessitent leur propre contrôle CI.

## Ordre de reprise
1. Lire `AGENTS.md`, `docs/CHATGPT_PROJECT_HISTORY.md`, `docs/COORDINATION_CODEX.md`.
2. Examiner la PR draft vers develop et la CI sur son SHA.
3. `npm run check && npm test`.
4. `python -m http.server 8000` puis `http://localhost:8000/web/`; contrôler plusieurs images et l'export.
5. Corriger/annoter les cas où le quadrilatère ne correspond pas à une façade réelle (perspective approximée).
6. Créer un vrai projet Lens Studio pour tester `lens/SceneToggle.js`; les fichiers .lsproj et assets de démonstration ne sont pas fournis.
7. Documenter appareil, version Lens, FPS et crash, puis passer aux plans 3D et au suivi.

## Blocages et dette
- Le laboratoire peut exporter `japan-architecture-overlay.png` transparent ou une photo compositée. Le calque n'est aligné qu'au point de vue photographié.
- Importation d'asset Screen Image manuelle. Pas d'outil de packaging Lens Studio, ni caméra intégrée en navigateur.
- Code de calcul 2D illustration, non IA.
- Segmentation façade indisponible; tracking/occlusion non implémentés.
- La mémoire des échanges anciens est partielle; ne jamais combler la transcription par invention.

## Pourquoi cette tranche?
Elle teste l'hypothèse la plus simple : une représentation de façade par quatre coins suffit-elle à dessiner un effet visuellement identifiable? Le résultat guidera la complexité de l'étape suivante, au lieu de lancer d'emblée un modèle génératif mobile non maîtrisé.