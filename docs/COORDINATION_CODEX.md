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

## Avancement vérifié le 2026-10-26
- Base de documentation sur develop : commit 89d01352574c5a731162a1e890c290bdc4b4d219.
- Premier prototype sur branche feat/chatgpt-photo-mvp : https://github.com/goldaj/japan-architecture-ar/pull/1 (brouillon, non fusionnée).
- Exécution GitHub Actions PR #1 : https://github.com/goldaj/japan-architecture-ar/actions/runs/40347699893 : success pour npm run check et npm test. Les essais navigateur et Lens Studio restent à réaliser.
- Incubateur : https://github.com/goldaj/projects-incubator/pull/2 prépare le retrait de la fiche d'idée, non fusionné.

## Point d'arrêt
Consulter `docs/HANDOFF.md` à la reprise et vérifier les PR et tests CI les plus récents.
## Suivi final de la première session, 2026-10-26
- [PR de réalisation #1](https://github.com/goldaj/japan-architecture-ar/pull/1), SHA validé : `15dadffec151e007cd10aa4a16934f6f4f8b06ff`.
- CI de la PR : https://github.com/goldaj/japan-architecture-ar/actions/runs/40348205111 (**success** sur Node; aucun test d'interface réel).
- [#2 validation visuelle](https://github.com/goldaj/japan-architecture-ar/issues/2), [#3 Lens Studio](https://github.com/goldaj/japan-architecture-ar/issues/3), [#4 tracking et segmentation](https://github.com/goldaj/japan-architecture-ar/issues/4).
- L'export transparent du calque facilite un P2 manuel, mais l'alignement reste limité à une photo.
- [PR nettoyage incubateur #2](https://github.com/goldaj/projects-incubator/pull/2), **brouillon non fusionné**.
