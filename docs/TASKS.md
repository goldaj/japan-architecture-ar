# Plan révisé 2026-10-26 : passage à l'édition IA d'abord

| ID | Objectif | État démontré | Sortie attendue |
|---|---|---|---|
| A0 | Cadrage & recherches API images | Fait : API OpenAI et options documentées | ADR-0001, promesses vs limites |
| A1 | POC photo-to-photo OpenAI | Code poussé PR IA séparée; CI de tests simulés verte sur commit initial | User charge une photo, clique Générer, compare et exporte PNG |
| A2 | Évaluation qualité des images | **Non testé avec une vraie clé et modèle**, aucune donnée facturée | 5-10 scènes, comparaisons Flare/Sunburst, preservation/artefacts/cost |
| A3 | Robustesse interface & sécurité | Validation de paramètres/clé serveur, endpoint loopback et consentement codés; tests mocked | test navigateur, erreurs 401/403/429, vrais PNG |
| V1 | Vidéo préenregistrée | Étude seulement | video-to-video cohérent sur clip court |
| V2 | Vidéo quasi réelle | Exploration non débutée | latence et FPS mesurés |
| V3 | Lens Studio en direct | Non débuté | prototype natif validé sur téléphone |

## Travail parallèle préservé
- [PR #1 procédurale](https://github.com/goldaj/japan-architecture-ar/pull/1) : outil pour dessiner/sélectionner des façades en 2D, visuellement très loin du produit cible, **ne plus prioriser comme chemin principal**.
- Ne pas effacer la PR et le code historique; une intégration éventuelle de masque/ROI ou annotations peut être utile.
- Branches séparées, PR draft vers develop, revue avant fusion.

## Prochaines sous-étapes
A2.1 : exécuter un test **volontaire** et payant de l'image originale avec le preset résidentiel, Flare/medium.
A2.2 : comparer au visuel attendu, noter dérive balcon/fenêtre/voiture/toitures/arbre/ciel.
A2.3 : Sunburst/high, prompts plus précis; mesurer budget et durée.
A2.4 : varier scènes (extérieur direct, route, végétation dense).
A3.1 : traiter bugs issus des essais, contrôler publication des exemples et clé locale.
V1.1 : tester API video-to-video sans prétendre que cela offre de l'AR temps réel.

## Conditions d'acceptation
- Résultat réellement édité à partir d'une photo, pas juste un quadrilatère.
- Aucune mention d'une validation photoréaliste sans essai API réel.
- Aucune photo personnelle dans le dépôt public ni clé côté navigateur.
- Tests CI sans coût, requêtes réelles uniquement après clic explicite.
