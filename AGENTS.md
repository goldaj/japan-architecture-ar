# Consignes ChatGPT / Codex

## Mission
**Contrat produit impératif depuis le 2026-10-26** : faire croire à un environnement japonais pendant une **visioconférence en direct** où l'utilisateur tourne sur lui-même, marche et révèle instantanément la réalité en coupant le filtre. Transformer tout l'environnement (bâtiments, routes, arbres, ciel), pas seulement les façades. Identité exacte des éléments réels **non prioritaire**; persistance temporelle/structurelle générée et latence interactive **prioritaires**. Aucun artefact photo-only ou vidéo hors ligne ne peut constituer une livraison finale. Lire `docs/ADR_0002_LIVE_ONLY.md` avant toute tâche.

## Où lire en premier
1. `README.md` et `docs/PRODUCT.md`
2. `docs/ROADMAP.md` et `docs/TASKS.md`
3. `docs/ARCHITECTURE.md` et `docs/RESEARCH.md`
4. `docs/COORDINATION_CODEX.md` et `docs/HANDOFF.md`
5. `docs/CHATGPT_PROJECT_HISTORY.md` (historique incomplet explicitement)

## Règles absolues
- Lire l'existant et vérifier la branche/les PR avant tout travail. Pas de merge, de déploiement, de publication Lens ni d'accès à la caméra sans validation utilisateur.
- Branches de fonctionnalités vers `develop`; travail ChatGPT sur branche dédiée et PR **draft**. Ne jamais écraser le travail Codex; intervenir sur de petits lots indépendants.
- Distinguer prototypes sur photo, Lens Studio, véritable AR avec suivi, et IA : aucun de ces stades n'implique le suivant.
- Documenter hypothèses et limites, conditions d'acceptation, résultats de tests réellement lancés. Ne pas déclarer "fonctionnel Snapchat" sans test Lens Studio + téléphone.
- **Flux caméra :** pas de transmission au GPU avant action explicite de l'utilisateur. La branche Live traite la caméra par WebRTC avec un serveur Scope externe, local ou distant selon configuration future. Le serveur de signalisation local ne doit pas stocker les frames, mais la plateforme du moteur peut traiter les flux. Ne pas prétendre que la vidéo est « exclusivement locale » si GPU déporté. Ne pas publier caméra/enregistrements/lieux privés, secrets ou données personnelles dans Git.
- Si une API Lens Studio n'est pas validée dans la version installée, la noter comme restant à valider.
- À chaque intervention mettre à jour `docs/TASKS.md`, `docs/HANDOFF.md` et le journal de contexte, avec horodatage seulement quand attesté; distinguer verbatim et résumé reconstitué.
- CI de code pur : `npm test` (Node 20+); visualisation navigateur en local. Tests manuels Lens Studio séparés.
- Document source de la convention : https://github.com/goldaj/projects-incubator/blob/main/docs/GITHUB_CODEX_CONTEXT_POLICY.md

## Décision de priorité
Apprendre avec une petite tranche vérifiable, puis améliorer. La détection des façades, la cohérence temporelle et la génération d'architectures crédibles sont des défis ouverts, non des fonctionnalités déjà disponibles.
## Priorité produit (supplante les anciennes recommandations historiques)
- P0 : vidéo **live** caméra → Scope WebRTC → flux généré; bascule immédiate vers flux original; voir `live/`.
- P1 : démontrer persistance à l'occlusion, rotation sur soi-même et **retour sur un lieu déjà vu** (« loop closure »), avec métriques; voir `docs/EXPERIMENTS.md`.
- P2 : envoyer la scène transformée dans **OBS Virtual Camera** et appeler réellement quelqu'un en visio; idéalement source smartphone mobile.
- P3 : diminuer latence et consommation, tester GPU local modeste / distant et distribution téléphone; aucun moteur photo-only à ajouter.
- `feat/live-webrtc-foundation` est la branche active. Les PR #1 (façades) et #5 (API photo) restent conservées mais **hors chemin critique**; ne pas les merger avant arbitrage.
- Toute interface « Japon ON » qui affiche le brut faute de frames IA doit le signaler : ne jamais confondre « caméra fonctionne » et « IA vidéo fonctionne ».
- À la fin de chaque changement, mise à jour de `docs/HANDOFF.md`, `docs/TASKS.md`, `docs/CHATGPT_PROJECT_HISTORY.md`.
