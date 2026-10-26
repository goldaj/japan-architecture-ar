# Roadmap actualisée : image → vidéo → possible réalité augmentée

| Phase | Livrable | Porte de décision |
|---|---|---|
| R0 (fait) | Évaluation du rendu géométrique sur photo, refusé comme solution principale | Le pivot vers modèles génératifs est décidé |
| R1 (code écrit) | POC API d'édition photo et UI avant/après | Vérifier que l'appel réel rend une image |
| R2 | Comparatifs prompts/modèles/qualités/coûts sur corpus autorisé | Qualité scène entière validée sur plusieurs exemples |
| R3 | Démo vidéo préenregistrée video-to-video, style contrôlé par photo référence | Mouvement et détails stables dans le temps |
| R4 | Prototype de traitement vidéo avec délai mesuré | Latence et cohérence acceptables ou redéfinition de portée |
| R5 | Intégration Lens Studio, sous contraintes de l'écosystème | Compatibilité et performances réelles smartphone |
| R6 | Produit de distribution | Conformité, droits et consentements |

## Écueils
Aucune API de génération image ne promet automatiquement un flux 30 FPS. Une génération vidéo offline n'est pas une Lens de caméra en direct. Les métriques (coût, latence, stabilité) commandent les arbitrages, pas les noms de modèles.

## Documentation
ADR-0001 détaille l'abandon de la voie principale procédurale; VIDEO_ROADMAP cadre les variantes pour vidéo, tracking et AR.
