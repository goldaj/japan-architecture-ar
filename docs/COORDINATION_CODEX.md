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

## P1+ étendu par ChatGPT le 2026-10-26, avant tests manuels
L'utilisateur a demandé explicitement : « tu peux déjà aller un peu plus loin dans le dev avant qu'on fasse des tests ? »

- Travail restant sur la même [PR #1 brouillon](https://github.com/goldaj/japan-architecture-ar/pull/1), branche `feat/chatgpt-photo-mvp`, **sans fusion**.
- Extension : `src/core/scene.mjs` (scènes immuables versionnées), jusqu'à 24 façades par photo, sélection et déplacement des coins, style/opacité par façade, PNG composite + alpha, projet JSON lié au SHA-256 calculé localement.
- Nouveaux tests purs : `tests/scene.test.mjs`; CI verte du commit fonctionnel `0bf7bdd`, voir https://github.com/goldaj/japan-architecture-ar/actions/runs/40350461490.
- Documentation à lire **sur la branche de PR**, pas encore sur develop : `docs/SCENE_FORMAT.md`, `docs/PRODUCT.md`, `docs/TASKS.md`, `docs/HANDOFF.md` et `docs/CHATGPT_PROJECT_HISTORY.md` mis à jour.
- [Issue #2](https://github.com/goldaj/japan-architecture-ar/issues/2) étendue pour test sur photos, multi-façades, manipulation de points, export alpha, persistance/rejet JSON et vie privée.
- Prochain jalon : test de navigateur et revue de qualité, **pas** passage prématuré à segmentation/AR en prétendant la fonction prête. Voir aussi #3 et #4.
- Les fichiers JSON personnels peuvent révéler le nom/hash de photo; ne pas publier d'exemples personnels dans le repo.

## 2026-10-26 : pivot visuel validé par le propriétaire
**IMPORTANT : cette section remplace la priorité stratégique des paragraphes historiques, qui restent conservés pour traçabilité.**

Après un essai sur photo réelle, l'utilisateur indique que le rendu en rectangles sur façades est très en-dessous de l'ambition, et vise une transformation photoréaliste **de toute la scène** : bâtiments, routes, arbres, ciel, éclairage. La référence qualitative est une édition d'image faite directement avec ChatGPT, fournie en conversation mais **non** committée (photographie personnelle).

- **Nouveau travail prioritaire :** [PR #5 AI-first](https://github.com/goldaj/japan-architecture-ar/pull/5) sur `feat/ai-photo-transform`, toujours **brouillon**. Contient `docs/ADR_0001_AI_FIRST.md`, `docs/VIDEO_ROADMAP.md`, UI + serveur Node 22 local et API OpenAI Images Edit (Flare / Sunburst).
- CI automatisée uniquement avec faux appels API : aucune facture ni image utilisateur générée par nos tests. La validation de qualité reste [issue #6](https://github.com/goldaj/japan-architecture-ar/issues/6).
- **Étape suivante** après qualité photo : [issue #7](https://github.com/goldaj/japan-architecture-ar/issues/7) étude video-to-video sur clip court, ne pas implémenter frame par frame sans tests de scintillement.
- **Ancienne voie en sommeil** : [PR #1](https://github.com/goldaj/japan-architecture-ar/pull/1) et issues #2–#4, non supprimées et non fusionnées. Elles n'ont pas la priorité.
- L'ancienne règle « les photos restent dans le navigateur » ne s'applique **pas** au nouveau POC IA : les images sont envoyées à OpenAI après consentement au clic (informations dans le README de la branche AI). Ne jamais mettre la clé API dans Git ou le navigateur, ni les images utilisateur en Git public.
- Aucun produit Snapchat ni vidéo live ne découle automatiquement de l'API photo. Le modèle d'image est destiné d'abord à évaluer l'objectif esthétique.

Après toute reprise, lire d'abord les changements de la PR #5 et l'historique lié; ne pas supposer que `develop` contient déjà le code IA.
