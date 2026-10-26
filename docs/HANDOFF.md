# Passation technique Codex : arrêt du 2026-10-26

## État prouvé
- `develop` initialisée avec docs et consignes (commit `89d0135`).
- Branche `feat/chatgpt-photo-mvp` : laboratoire photo navigateur sans dépendances, géométrie convexe normalisée, 2 palettes, Canvas, exports photo/overlay; **jusqu'à 24 façades** modifiables par poignées, scène JSON versionnée liée à la photo par SHA-256 local, tests Node et CI définis; squelette Lens Studio.
- **Aucune garantie de validation en navigateur ou Lens Studio** tant qu'une session manuelle n'a pas été inscrite.
- CI GitHub vérifiée à la suite du commit fonctionnel `0bf7bdd2ee69222aa08a4a013d72c74b50446925` : https://github.com/goldaj/japan-architecture-ar/actions/runs/40350461490 et https://github.com/goldaj/japan-architecture-ar/actions/runs/40350454652 : `npm run check` et `npm test` **success**. Ces tests ne prouvent pas l'ergonomie ou le rendu visuel navigateur.

## Ordre de reprise
1. Lire `AGENTS.md`, `docs/CHATGPT_PROJECT_HISTORY.md`, `docs/COORDINATION_CODEX.md`.
2. Examiner la PR draft vers develop et la CI sur son SHA.
3. `npm run check && npm test`.
4. `python -m http.server 8000` puis `http://localhost:8000/web/`; contrôler sélection + déplacement coins, deux façades en parallèle, édition styles, export PNG composite et alpha.
5. Tester JSON sur même photo puis sur une photo différente : refus attendu en cas de signature différente. Vérifier aucun pixel/photo dans JSON et absence d'upload.
6. Capturer résultats reproductibles, consigner matériel et navigateur, corriger les défauts avant fusion.
7. Corriger/annoter les cas où le quadrilatère ne correspond pas à une façade réelle (perspective approximée).
8. Créer un vrai projet Lens Studio pour tester `lens/SceneToggle.js`; aucun fichier .lsproj ou asset de démonstration n'est fourni.
9. Documenter appareil, version Lens, FPS et crash, puis décider des prochains plans 3D et du suivi.

## Blocages et dette
- Le laboratoire peut exporter `japan-architecture-overlay.png` transparent ou une photo compositée. Le calque n'est aligné qu'au point de vue photographié.
- Le JSON ne stocke pas la photo mais conserve son nom et hash; **ne pas publier de vraies scènes personnelles** dans ce repo public.
- Importation d'asset Screen Image manuelle. Pas d'outil de packaging Lens Studio, ni caméra intégrée en navigateur.
- Code de calcul 2D illustration, non IA.
- Segmentation façade indisponible; tracking/occlusion non implémentés.
- La mémoire des échanges anciens est partielle; ne jamais combler la transcription par invention.

## Pourquoi cette tranche?
Elle teste l'hypothèse la plus simple : une représentation de façade par quatre coins suffit-elle à dessiner un effet visuellement identifiable? Le résultat guidera la complexité de l'étape suivante, au lieu de lancer d'emblée un modèle génératif mobile non maîtrisé.