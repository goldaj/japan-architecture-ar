# Transition photographie → vidéo → AR (hypothèses, pas implémentations)

## Phase V0 : photo unique (codée, sans appel réel)
- Entrée photo; consignes de transformation complète; choix modèle/qualité; aperçu avant/après; sortie PNG.
- Tester fidélité sur bâtiment, rue, arbres, ciel, mobilier et textures; relever modification non souhaitée du premier plan.
- Mesurer secondes par image et coût API réel, en conservant les logs **sans photos**.

## Phase V1 : vidéo préenregistrée (étude)
**Ne pas appliquer naïvement un éditeur d'image indépendamment à chaque frame.** Les toitures et branches pourraient changer à chaque image, donc scintiller.

Approches :
- **Video-to-video** (test prioritaire) avec clip court original + consigne + référence esthétique issue de V0. Exemples à évaluer : Runway video-to-video (Aleph 2) ou Sora editing d'un clip; vérifier accès/version, restrictions et coût sur le compte réel.
- Génération vidéo **à partir d'une image** : rend un mouvement plausible mais peut ne pas préserver la vraie trajectoire d'une caméra. À ne pas confondre avec édition d'une vidéo existante.
- Baseline académique optionnelle : propagation des transformations à travers suivi de plans/flot optique et rafraîchissement d'images-clés. Plus contrôlable, mais plus difficile.

Critères : même immeuble/route/arbres à travers le temps, architecture stable, objet occultant conservé, mouvements caméra crédibles, déformation, artefacts, temps de calcul et coût par 5 secondes. Comparer 3 clips de scènes réelles avec autorisations.

## Phase V2 : rendu sur caméra en différé / quasi réel (recherche)
Tenter un stream avec délai explicite, pas 30 FPS garantis. Mesurer latence bout-en-bout et stabilité. Générer quelques images-clés, les recaler sur surfaces reconnues si la segmentation/suivi devient nécessaire. Décider si le niveau de qualité reste assez bon.

## Phase V3 : filtre Snapchat / Lens Studio (incertain)
N'intégrer dans Lens Studio qu'après validation de la compatibilité plateforme, de la confidentialité, des performances et de l'architecture technique. Les API vidéo hors ligne et le streaming Snapchat sont deux produits très différents.

## Risques
- Pas de garantie qu'une vidéo modifiée conserve l'identité de chaque objet.
- API vidéo : temps d'exécution, facturation et disponibilité variables.
- Les photos/vidéos transmises à un provider cloud posent des questions de consentement, droits et conservation.
- Pas d'appel API vidéo ajouté au code de ce POC; c'est un plan de recherche pour Codex.

Sources : https://docs.dev.runwayml.com/api/ et https://developers.openai.com/api/docs/changelog et https://developers.openai.com/cookbook/examples/sora/sora2_prompting_guide
