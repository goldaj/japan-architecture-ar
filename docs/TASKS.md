# Tâches et état (2026-10-26)

| ID | Travail | Sous-étapes | État / preuve |
|---|---|---|---|
| T0 | Fondation | T0.1 dépôt; T0.2 AGENTS; T0.3 docs; T0.4 develop; T0.5 journal | Terminé sur `develop` (commit `89d0135`); lecture de base effectuée |
| T1 | Atelier photo | T1.1 géométrie; T1.2 rendu deux palettes; T1.3 UI/exports; T1.4 tests/CI; T1.6 scène multi-façades; T1.7 déplacement de coins; T1.8 JSON lié à SHA-256 | **Code poussé en PR draft #1** ; vérifications syntaxe + Node **vertes** sur commit `0bf7bdd` (runs 40350454652 et 40350461490). Aucun test visuel manuel ; validation P1 ouverte (#2). |
| T2 | Premier test Lens | T2.1 script toggle, T2.2 procédure, T2.3 preview, T2.4 téléphone | T2.1 / T2.2 : gabarit codé, **non testé Lens Studio**; T2.3/2.4 à faire |
| T3 | Suivi spatial | T3.1 SDK, T3.2 ancrage, T3.3 quantification | Pas démarré |
| T4 | Segmentation et IA | T4.1 corpus autorisé, T4.2 baseline, T4.3 métriques | Pas démarré |
| T5 | Qualité esthétique | T5.1 matériaux, T5.2 variantes, T5.3 occlusion | Pas démarré |
| T6 | Évaluation mobile | T6.1 FPS, T6.2 mémoire, T6.3 robustesse | Pas démarré |
| T7 | Publication | T7.1 conformité, T7.2 UX, T7.3 diffusion | Pas démarré |

## Mise en garde
Les tests Node contrôlent seulement la logique géométrique/les appels Canvas, sans vrais pixels ni Snapchat. La validation de rendu visuel demande un navigateur et une photo autorisée. Une CI verte ne suffit pas à clôturer T1/T2.

## Prochaines petites tâches
1. Relire la CI au SHA de la dernière modification documentaire.
2. QA navigateur (#2) : photo 25 Mo, quad normal/invalide, deux façades et palettes différentes, déplacement qui devient invalide, sélection/suppression.
3. QA persistance : exporter JSON, recharger même photo, importer JSON identique puis importer mauvais JSON/photo et vérifier rejet explicite.
4. QA exports : photo composite + PNG alpha, vérifier que les poignées/numéros **ne figurent pas** dans le PNG.
5. Faire captures autorisées, consigner erreurs et fermer P1 seulement après vérification visuelle.
6. Dans Lens Studio (#3), importer l'overlay, brancher SceneToggle, vérifier sur vrai téléphone.
7. Mesurer (#4) avant de choisir les approches tracking/segmentation/IA.