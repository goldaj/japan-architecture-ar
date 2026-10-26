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

## 2026-10-26, pivot de stratégie confirmé par l'utilisateur (heure non attestée)

**Utilisateur (extrait verbatim pertinent, reproduction partielle sur dépôt public) :**
> oui le moteur marche. Mais là on est vraiment à l'étape 0.1, c'est bien au-dessous de ce que je te demandais et de ce que j'espérais.
> D'ailleurs il n'y a que les façade alors qu'à terme on veut les bâtiment, les routes, les arbres, etc, etc...
> Je PENSE qu'il faut tout de suite partir sur des API d'IA et quelque chose qui transforme au moins une photo naturellement grâce à des models existants, pour ensuite le faire basculer sur de la vidéo.

**Contexte (résumé vérifié)** : l'utilisateur a joint trois images (photo originale, rendu géométrique, cible photoréaliste issue de ChatGPT). Leur contenu **n'est pas publié sur GitHub** et n'est pas attaché au dépôt.

**Assistant (résumé reconstruit, non verbatim)** : reconnaît que le POC géométrique ne satisfait pas la cible, décide de prioriser un nouveau POC IA photo-to-photo, puis d'étudier la vidéo existante. Conserve l'ancien code sur sa PR #1 draft, crée une nouvelle branche `feat/ai-photo-transform` séparée. Implémente un serveur Node local avec OpenAI Images Edit, options modèle/qualité, interface avant/après et tests gratuits à service simulé. Le serveur envoie la photo au fournisseur uniquement après action/consentement de l'utilisateur.

**Limite de preuve** : CI vérifie le code sans API; aucune véritable image IA générée par cette branche et aucun test vidéo ou mobile effectués. Les limites commerciales et techniques devront être revalidées lors du test sur l'environnement utilisateur.
