# Roadmap de recherche et développement

Chaque étape porte un critère d'arrêt « démonstration observable », et non une simple liste d'outils.

| Phase | But | Livrable de contrôle | Porte de sortie |
|---|---|---|---|
| P0 | Référentiel et protocole | docs, AGENTS, CI | contexte et tests compréhensibles |
| P1 | Laboratoire photo manuel | appli web + export | 4 coins, 2 styles, PNG, tests |
| P2 | Lens Studio first contact | script d'affichage + projet manuel | export et bascule fonctionnent dans Lens Studio sur téléphone |
| P3 | Surfaces + suivi | scène AR ancrée | alignement mesuré pendant 5 mouvements |
| P4 | Détection | évaluation sur petit corpus autorisé | qualité de masque/pose quantifiée |
| P5 | Japonisation structurée | 2-3 motifs combinables + occlusion | cohérence sur au moins 10 scènes |
| P6 | Mobile + expérience | Lens utilisable | latence/FPS, batterie, crash et UX mesurés |
| P7 | Distribution | publication contrôlée | validation produit et conformité |

## Questions de recherche
- Q1 : combien de temps tient une texture écran sans tracking avant dérive inacceptable?
- Q2 : segmentation 2D suffit-elle, ou doit-on reconstruire au moins des plans 3D?
- Q3 : composition de motifs procéduraux contre génération d'images distante : compromis qualité / temps / coûts / cohérence temporelle?
- Q4 : la performance sur une scène de jour généralise-t-elle à nuit, pluie et occlusions?
- Q5 : faut-il un traitement image local, un modèle embarqué, ou un pipeline hors-ligne ?

## Métriques envisagées
- Erreur moyenne d'alignement de coins (pixels normalisés ou degrés), constatée par annotation manuelle.
- Stabilité temporelle : jitter, dérive sur une séquence, occultations.
- FPS médian + p95 temps image + RAM + énergie; résultats par appareil.
- Taux de réussite : bâtiment détecté / plan exploitable / effet jugé convaincant (annotateurs, protocoles précisés).
- Attribution du coût : offline et online séparés.

## Anti-auto-illusion
Un screenshot flatteur sur une seule photo n'est pas une Lens utilisable. Pour chaque expérimentation, noter nombre d'images, provenance, protocole reproductible, échecs et limites.