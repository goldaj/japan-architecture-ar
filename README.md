# japan-architecture-ar
AI-powered augmented reality for Japanese-inspired architectural transformation

## Documentation de cadrage et reprise

- [Intention produit et hypothèses transférées](docs/PROJECT_INTENT_FROM_INCUBATOR.md)
- [Consignes pour Codex et les contributeurs](AGENTS.md)
- [Journal du contexte ChatGPT, partiel et sourcé](docs/CHATGPT_PROJECT_HISTORY.md)

Ce dépôt est autonome : ne plus documenter son développement dans l'index des idées `projects-incubator`. Les pistes de la fiche de cadrage ne sont pas des fonctionnalités déjà livrées.

## Banc expérimental caméra (2026-10-29)

Une première **application web de recherche** existe : caméra locale en direct, surcouche architecturale 2D fixe ou suivie par corrélation locale, bascule instantanée au flux réel et mesures FPS/temps de rendu exportables. Tester : `python -m http.server 8000` puis `http://localhost:8000/web/`. Aucun modèle IA, aucune reconstruction 3D et aucune prétention de photoréalisme. Voir [docs/CAMERA_BASELINE.md](docs/CAMERA_BASELINE.md).
