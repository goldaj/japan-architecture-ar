# Historique des échanges concernant Japan Architecture AR

**Couverture : partielle**. Cette archive publique ne reconstitue pas les anciennes conversations invisibles. Les textes verbatim ci-dessous viennent des messages accessibles de la conversation courante; l'heure exacte de ces messages n'est pas fournie. Date de la conversation : 2026-10-26 (Europe/Paris). Le niveau de couverture et les ajouts futurs doivent être maintenus.

## Source initiale
[Idée préexistante](https://github.com/goldaj/projects-incubator/blob/main/ia-et-multimedia/assistant-ar-japan-snapchat.md) dans l'incubateur, description vérifiée : « Concept de filtre de réalité augmentée transformant l'ambiance architecturale en inspiration japonaise. » La fiche sera supprimée de l'index conformément à sa politique; l'historique Git reste disponible.

## Conversation « Avancement_projets_codex_6 »

**2026-10-26, heure non attestée | Utilisateur | verbatim :**
> Avancement_projets_codex_6 ;
> on va continuer le travail en amont de codex sur des projets de mon github personnel. Avec toutes les mêmes contraintes que dans les conversations précédentes, tu les connais déjà.
> Cette fois on va se concentrer sur le démarrage de ce projet ci :
> [https://github.com/goldaj/projects-incubator/blob/main/ia-et-multimedia/assistant-ar-japan-snapchat.md](https://github.com/goldaj/projects-incubator/blob/main/ia-et-multimedia/assistant-ar-japan-snapchat.md)
>
> Je pense que ce qu'il faut c'est d'abord créer un repo git. Dis moi ce que je dois faire et comment je le nomme (il sera public)

**2026-10-26, heure non attestée | Assistant | résumé reconstruit, non verbatim :**
Propose le dépôt public `goldaj/japan-architecture-ar`, licence MIT, README, puis structure de recherche, prototype, documentation AGENTS.md et coordination Codex.

**2026-10-26, heure non attestée | Utilisateur | verbatim :**
> OK c'est créé. Je te laisse réfléchir, faire un plan d'attaque, créer toute la structure souhaitée et documenter l'ensemble. Puis en fait tu peux même démarrer à coder dès que t'es prêt.

**2026-10-26, heure non attestée | Assistant | résumé reconstruit, non verbatim :**
Choisit prototype local sur photographie avec sélection manuelle de façade et compositing procédural; Lens Studio cible par paliers; pas de cloud, pas de déclaration prématurée de fonctionnement sur Snapchat. Travail indépendant sur branche et PR draft.

## Contraintes retrouvées de conversations précédentes (résumés reconstitués, non verbatim)
- 2026-10-24 : ajouter/maintenir un `AGENTS.md` et un document d'historique distinguant rôles, verbatim, résumés et dates authentifiées; ne jamais inventer de transcription.
- 2026-10-24 : avancer sur une branche indépendante, documentation passation / progression, pas de merge intempestif; coordination Codex sur `develop`.
- 2026-10-25 : détailler et avancer en baby steps; chaque sous-tâche doit laisser une preuve et un point de reprise.
- Source détaillée de ces règles : [Convention](https://github.com/goldaj/projects-incubator/blob/main/docs/GITHUB_CODEX_CONTEXT_POLICY.md)

## Limites
L'intégralité des discussions anciennes, réponses de l'assistant et heures précises n'est pas accessible via cette conversation; aucun message non vérifié n'est présenté comme verbatim. Pour complétude, intégrer seulement un export authentique après revue d'informations personnelles ou sensibles.
## Événements Git observés le 2026-10-26 (source : dépôts GitHub)
- `develop` initialisée, commit `89d01352574c5a731162a1e890c290bdc4b4d219`.
- Prototype photographique code+tests sur `feat/chatgpt-photo-mvp`, premier commit `5cbc295b9182df3e03e9beb5bd6c61a74ddbceb5` et [PR #1 brouillon](https://github.com/goldaj/japan-architecture-ar/pull/1).
- [Workflow GitHub Actions 40347699893](https://github.com/goldaj/japan-architecture-ar/actions/runs/40347699893) conclu `success` pour vérification de syntaxe et tests Node du commit initial. Ce résultat ne valide ni navigateur ni Lens Studio.
- Export PNG transparent de la seule surcouche ajouté après revue pour permettre l'import manuel dans Lens Studio; preuve visuelle mobile toujours absente.
- Nettoyage de l'incubateur proposé en [PR #2 brouillon](https://github.com/goldaj/projects-incubator/pull/2), sans fusion.

**Fidélité :** ces éléments sont des faits GitHub observés et décisions techniques de l'assistant, pas une transcription inventée des messages.


## 2026-10-26 — Deuxième tranche de développement (conversation courante)

**Utilisateur, verbatim (heure précise non attestée) :**
> tu peux déjà aller un peu plus loin dans le dev avant qu'on fasse des tests ?

**Assistant, résumé reconstruit et non verbatim :**
Propose d'étendre le laboratoire photo avant une séance manuelle avec multi-façades, déplacement des coins, sauvegarde JSON. Décide de conserver ce travail sur la PR #1 brouillon sans fusion et de garder la validation visuelle pour la suite.

**Travail Git vérifiable :**
- Commit `fa6c49c4e34373325f70573eb3bf69690aeac6ae` : modèle de scène immuable `src/core/scene.mjs`, contrôles purs et tests.
- Commit `0bf7bdd2ee69222aa08a4a013d72c74b50446925` : UI d'édition multi-façades, glisser-déposer des coins, sauvegarde/rechargement JSON lié au SHA-256 de la photo, export composite et alpha.
- GitHub Actions : [workflow de PR 40350461490](https://github.com/goldaj/japan-architecture-ar/actions/runs/40350461490) **success**, Node check/tests. Aucune validation navigateur/Lens Studio ni expérience sur smartphone.
- `docs/SCENE_FORMAT.md` spécifie le nouveau contrat de sauvegarde et ses limitations.
