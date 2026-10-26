# Architecture cible, architecture réellement implémentée

## Code P1 : atelier photo
- `web/index.html` : interface, choix de photo, contrôles, export.
- `web/app.mjs` : contrôleur navigateur et rendu Canvas.
- `src/core/geometry.mjs` : fonctions pures de quadrilatère, interpolation bilinéaire, validation.
- `src/core/render.mjs` : décor architectural procédé de tracés Canvas, palettes distinctes.
- `tests/*.test.mjs` : Node `--test` (sans dépendances tierces).
- `lens/SceneToggle.js` : simple gabarit de bascule pour Lens Studio, test éditeur requis.

Les images restent en RAM du navigateur; pas de serveur distant. Le serveur HTTP local sert uniquement les fichiers du dépôt. L'export est déclenché localement par lien `download`.

## Limites P1
- Perspective approximée par interpolation bilinéaire d'un quad, pas homographie 3D.
- Une façade à la fois; pas de masquage piétons / profondeur / vitrines.
- Styles dessinés en surcouche, pas de réinterprétation photo par modèle.
- L'image exportée est **composée** (photo + overlay), pas un asset automatiquement utilisable comme suivi AR.

## Lens Studio P2
Assembler manuellement un projet :
1. Camera / caméra arrière et écran de prévisualisation
2. Screen Image avec texture transparente créée pour la photo d'essai
3. Parent SceneObject lié au script `lens/SceneToggle.js`
4. Test « tap pour activer/désactiver » en preview et sur téléphone

Aucune conversion directe PNG -> coordonnées monde. Demander à Codex de valider la correspondance version/API; ne pas fusionner comme « Snapchat-ready » avant validation.

## P3+ envisagé (non implémenté)
`Camera -> détection façades -> estimation surfaces/pose -> plan stylisé -> rendu AR -> vérification de suivi`.

Découpler calcul intensif (reconnaissance/génération) du rendu haute fréquence. Mesurer d'abord les performances, puis seulement choisir un modèle et éventuellement une architecture cloud. Toute étape cloud requiert consentement et étude protection des données.