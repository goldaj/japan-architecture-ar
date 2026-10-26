# Coordination ChatGPT et Codex

**Lecture prioritaire par Codex.**

- Date : 2026-10-26.
- Dépôt : `goldaj/japan-architecture-ar`, public, initialement `main` README + MIT.
- Branche `develop` : base de travail et coordination. Branche de réalisation ChatGPT prévue : `feat/chatgpt-photo-mvp`. PR vers develop en brouillon.
- Ne pas fusionner ou réécrire les branches de l'autre agent sans revue. Ne pas supprimer le dépôt source.
- Suivre `docs/CHATGPT_PROJECT_HISTORY.md` pour les propos de l'utilisateur et `docs/HANDOFF.md` pour les états techniques.

## Interfaces entre travaux
- P1 navigateur : autonome et sans SDK. Codex peut améliorer les tests/accessibilité.
- P2 Lens Studio : projet dans l'éditeur encore absent; script gabarit à vérifier; Codex devrait travailler sur une **autre branche** après constat de la version éditeur.
- P3 perception/IA : travail de recherche jusqu'à validation des contraintes platform/device; éviter intégration prématurée.
- Si Codex souhaite une architecture différente, proposer ADR et un benchmark petit et falsifiable, ne pas « nettoyer » en perdant les expériences.

## Règles d'historique
Ne jamais prétendre posséder les conversations complètes. L'archive actuelle reprend uniquement le texte accessible et les reconstructions signalées. Sur dépôt public, pas de contexte privé ou personnel.

## Point d'arrêt
Consulter `docs/HANDOFF.md` à la reprise et vérifier les PR et tests CI les plus récents.