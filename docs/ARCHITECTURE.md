# Architecture cible, architecture réellement implémentée

## Code P1 : atelier photo
- `web/index.html` : interface, choix de photo, contrôles, export.
- `web/app.mjs` : contrôleur navigateur et rendu Canvas.
- `src/core/geometry.mjs` : fonctions pures de quadrilatère, interpolation bilinéaire, validation.
- `src/core/render.mjs` : décor architectural procédé de tracés Canvas, palettes distinctes.
- `src/core/scene.mjs` : modèle de scène immuable et versionné (plusieurs façades), validation, hit-test, sérialisation JSON liée à l’image par SHA-256.
- `tests/*.test.mjs` : Node `--test` (sans dépendances tierces).
- `lens/SceneToggle.js` : simple gabarit de bascule pour Lens Studio, test éditeur requis.

Les images restent en RAM du navigateur; pas de serveur distant. Le serveur HTTP local sert uniquement les fichiers du dépôt. L'export est déclenché localement par lien `download`. La photo est traitée en local, son empreinte SHA-256 calculée via Web Crypto (donc `localhost` ou HTTPS requis). Le projet JSON contient des points et réglages, le nom/tailles et le hash de la photo, **pas les pixels de la photo**. Voir `docs/SCENE_FORMAT.md`.

## Limites P1
- Perspective approximée par interpolation bilinéaire d'un quad, pas homographie 3D.
- Plusieurs façades sur une même photo, mais **sans** masquage piétons / profondeur / vitrines et avec possibilité de chevauchements.
- 24 façades maximum et 25 Mo maximum par image ; limites de sécurité/ergonomie, pas un benchmark d'appareil.
- Styles dessinés en surcouche, pas de réinterprétation photo par modèle.
- Deux PNG exportables : photo composée et surcouche avec alpha. Les PNG sont liés au point de vue photographié, pas des assets automatiquement suivis en réalité augmentée.
- Le nom de fichier et l'empreinte SHA-256 dans les JSON peuvent constituer des métadonnées sensibles ; ne pas committer des scènes personnelles dans un dépôt public.

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