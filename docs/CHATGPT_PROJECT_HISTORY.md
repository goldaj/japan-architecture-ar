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
## 2026-10-26 — Exigence finale de vidéo en direct

**Utilisateur (verbatim, extrait fidèle ; heure précise non attestée) :**
> Attention, si c'est utile pour la suite on le fait, mais la cible est vraiment la vidéo. Impossible de se contenter de la photo pour ce projet, il faut absoluement que ça soit en vidéo en direct sinon le projet ne fait plus de sens.
> Si on n'est pas sur de la fidélité de l'environnement d'origine, c'est peu grave, c'est qui compte par contre ça va être la cohérence de la persistance dans le temps
> Le cas d'usage c'est quoi ? Appeler quelqu'un en visio, faire une petite blague en disant qu'on est au japon (du coup pas trop grave si c'est pas fidèle à 100% sur les éléments, la blague passe), tourner sur soi-même ou se déplacer en marchant, puis couper le filtre pour montrer que c'était un blague et que le logiciel est bluffant !
> Donc soit c'est un filtre insta, soit c'est autre chose, mais dans tous les cas il va falloir à terme répondre à ce cas d'usage, et celui-ci uniquement.

**Assistant (résumé reconstruit, non verbatim) :**
Accepte la vidéo temps réel comme **seule réussite produit**; change la priorité : mémoire et cohérence temporelle au détriment de la fidélité pixel-à-pixel. Recherche StreamV2V, StreamDiffusion, Daydream Scope et OBS Virtual Camera. Identifie que Meta Spark, ancien outil de filtres Instagram tiers, a fermé début 2025. Construit un socle `live/` caméra WebRTC bidirectionnel vers Scope avec sortie basculable instantanément, sans vidéo IA testée sur matériel réel. Le client nécessite un serveur Scope existant et un modèle préchargé, non inclus. Pas de code ou de résultat non démontré présenté comme fonctionnel.

**Note confidentialité :** Aucune des images sources, cibles et vidéos personnelles fournies en conversation n'a été ajoutée au dépôt public. Historique antérieur non intégralement accessible; aucune transcription supplémentaire inventée.
