# ADR-0001 : IA générative d'abord, procédural en second

- **Décision :** 2026-10-26
- **Statut :** Acceptée pour exploration du POC, à valider empiriquement sur images réelles
- **Motif :** le propriétaire montre un rendu procédural à rectangles et une transformation faite par ChatGPT qui transforme naturellement toute une scène : architecture, routes, végétation, climat lumineux et objets. L'écart correspond à un problème de méthode, pas à quelques détails graphiques.
- **Intention produit :** transformation crédible de **tout le paysage**, vue stable et composition conservée. Composante anime/cartoon **non** désirée par défaut.

## Options
1. Dessiner/rhabiller à la main les façades 2D : déterministe, rapide, mais irréaliste visuellement et limité à l'étiquetage/repérage. [PR #1](https://github.com/goldaj/japan-architecture-ar/pull/1) archivage non destructif.
2. Édition de photographie via modèles d'image existants : grande portée de transformation, prototypage rapide, coûts d'API, latence et conservation imparfaite.
3. Segmentation + reconstruction 3D + matériaux + suivi temps réel : potentiellement utile pour Lens en direct, mais cher à développer, ne garantit pas l'apparence générative de la cible.

## Décision technique
POC n°2 via **OpenAI Images Edits** : `gpt-image-2.5-flare` comme première baseline de vitesse, `gpt-image-2.5-sunburst` pour comparaison qualité/fidélité. Deux photos ne prouvent pas la généralisation : tester plusieurs points de vue, arbres, routes, occultations et éclairage.
- Entrée : photo JPEG/PNG/WebP et consignes de style géographique; prompt structurel exige respect du point de vue.
- Sortie : image PNG et comparaison manuelle côte à côte.
- Serveur de développement local Node avec clé API exclusivement serveur. Aucun déploiement public ni API automatique à l'ouverture.
- Les exemples utilisateur ne sont jamais commités, même sous un nom anonymisé.

## Ce qu'une API d'image ne résout pas
- Fidélité exacte pixel par pixel et préservation d'objets : possibles hallucinations.
- Cohérence temporelle : générer 30 images/s indépendamment produira mouvements artificiels et scintillement.
- Temps réel téléphone : les API de génération d'images ne sont pas des filtres 30 FPS. Tant que benchmarks absents, **ne pas** décrire la solution comme une Lens AR.
- Contrôle caméra et occlusion : Lens Studio pourrait servir de couche de rendu ultérieure, après validation d'un rendu cohérent.

## Conditions pour aller vers vidéo
1. Photo-to-photo : tester fidélité, style et coûts, y compris un contre-exemple difficile.
2. **Vidéo hors ligne** : comparer modèles video-to-video en utilisant une référence de style issue de la photo retravaillée. S'assurer que la trajectoire caméra et le décor restent relativement stables.
3. **Vidéo quasi temps réel / caméra** : mesurer délais et budget, envisager modèles locaux + structure spatiale, cache/suivi, shaders et dégradations, et distinguer recherche de produit Snapchat.

## Sources consultées
- OpenAI Image API et images edits : https://developers.openai.com/api/docs/guides/image-generation
- GPT Image 2.5 prompting : https://developers.openai.com/api/docs/guides/image-prompting
- OpenAI édition existante : https://developers.openai.com/api/reference/resources/images/methods/edit
- Tarification : https://developers.openai.com/api/docs/pricing
- Video-to-video commercial Runway : https://docs.dev.runwayml.com/api/
- Sora vidéo édition : https://developers.openai.com/api/docs/changelog

## Prochain ADR
Après 5-10 images et 1 courte vidéo test : arbitrer entre API vidéo, modèle local de stylisation temporelle et rendu AR approximatif. Le choix ne peut pas être fait uniquement sur promesse commerciale.
