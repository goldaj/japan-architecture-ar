# Tâches et état (2026-10-26)

| ID | Travail | Sous-étapes | État / preuve |
|---|---|---|---|
| T0 | Fondation | T0.1 dépôt; T0.2 AGENTS; T0.3 docs; T0.4 develop; T0.5 journal | Terminé sur `develop` (commit `89d0135`); lecture de base effectuée |
| T1 | Atelier photo | T1.1 géométrie; T1.2 rendu deux palettes; T1.3 UI/photo/export composite+alpha; T1.4 tests; T1.5 CI | Code livré en PR draft #1; **syntaxe et tests Node verts** via Actions run 40347699893 ; contrôle navigateur encore requis |
| T2 | Premier test Lens | T2.1 script toggle, T2.2 procédure, T2.3 preview, T2.4 téléphone | T2.1 / T2.2 : gabarit codé, **non testé Lens Studio**; T2.3/2.4 à faire |
| T3 | Suivi spatial | T3.1 SDK, T3.2 ancrage, T3.3 quantification | Pas démarré |
| T4 | Segmentation et IA | T4.1 corpus autorisé, T4.2 baseline, T4.3 métriques | Pas démarré |
| T5 | Qualité esthétique | T5.1 matériaux, T5.2 variantes, T5.3 occlusion | Pas démarré |
| T6 | Évaluation mobile | T6.1 FPS, T6.2 mémoire, T6.3 robustesse | Pas démarré |
| T7 | Publication | T7.1 conformité, T7.2 UX, T7.3 diffusion | Pas démarré |

## Mise en garde
Les tests Node contrôlent seulement la logique géométrique/les appels Canvas, sans vrais pixels ni Snapchat. La validation de rendu visuel demande un navigateur et une photo autorisée. Une CI verte ne suffit pas à clôturer T1/T2.

## Prochaines petites tâches
1. Vérifier CI de la PR et corriger si nécessaire.
2. Essai manuel navigateur : import, quad valide/invalide, deux palettes, export PNG, changement de photo.
3. Capturer résultat/limitations, puis verrouiller P1.
4. Dans Lens Studio : créer projet natif, connecter le script, documenter errors et FPS.
5. Décider ensuite si priorité est le suivi 3D ou une segmentation façade offline avant AR.