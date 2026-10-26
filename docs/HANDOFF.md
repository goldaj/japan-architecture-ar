# Passation / point de reprise

## État de référence
2026-10-26 — initialisation en cours. La branche `develop` contient le cadrage et les règles; la réalisation P1 est portée séparément sur une PR brouillon depuis `feat/chatgpt-photo-mvp`.

## Avant reprise Codex
1. Ouvrir AGENTS et historique, vérifier develop et PR.
2. Identifier la dernière tâche `docs/TASKS.md` réellement clôturée.
3. Tester `npm test` puis serveur local `python -m http.server 8000`.
4. Vérifier manuellement l'UI photo/export avant d'affirmer produit utilisable.
5. Vérifier `lens/SceneToggle.js` dans Lens Studio sur sa version installée; aucune validation Snap faite par ChatGPT.

## Risques à ne pas perdre
Pas de pose 3D, pas de segmentation IA, pas de confidentialité cloud à gérer à ce stade, aucune promesse de compatibilité mobile. Ne pas confondre une surcouche sur quad 2D et un bâtiment transformé en AR.

## Suite prioritaire
Une fois P1 testée dans l'éditeur navigateur, câbler P2 sur un projet Lens Studio valide. Documenter étape par étape et constater dérive réelle sur téléphone. Ensuite seulement choisir P3.