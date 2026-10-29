# Japan Live — visioconférence transformée en environnement japonais

**Contrat produit unique :** pendant un appel en visio, transformer la caméra **en direct** pour simuler un environnement japonais cohérent. L'utilisateur doit pouvoir bouger, tourner sur lui-même, marcher, puis couper l'effet **immédiatement** et révéler le décor réel. **La cohérence temporelle de la scène générée prime sur la fidélité exacte au lieu filmé.**

Ce dépôt se nomme encore `japan-architecture-ar`, mais une simple image retouchée n'est **pas** le produit. Les premières explorations photo et calques (PR #1 et #5) sont conservées comme archives expérimentales, non chemin principal.

## Première tranche de développement (non complète)

La branche `feat/live-webrtc-foundation` contient `live/` :
- prise de caméra locale depuis Chrome/Edge (avec permission);
- négociation WebRTC avec un serveur **Daydream Scope déjà installé** et ayant chargé un modèle vidéo compatible;
- images générées si elles sont effectivement reçues, avec protection contre le flux figé;
- bascule **J = Japon**, **R ou Espace = Révéler la réalité** sans attendre un appel modèle;
- fenêtre vidéo plein écran, récupérable dans OBS, puis `OBS Virtual Camera` pour une visio PC;
- tests automatisés de la bascule et du protocole local, sans GPU réel ni accès caméra dans la CI.

### Test technique (nécessite matériel adapté)
1. Installer Node.js 22+.
2. Lire la documentation et les prérequis de https://github.com/daydreamlive/scope : **GPU NVIDIA >=24 Go VRAM** pour sa configuration locale actuelle, recommandé 3090/4090/5090. Une RTX 3060 12 Go n'est pas supposée suffisante pour Scope.
3. Démarrer Scope sur **127.0.0.1:8000**, télécharger et charger **un pipeline prenant une vidéo entrante** (V2V). Par ex. via sa documentation `uv run daydream-scope`, puis UI de chargement du modèle. Aucun modèle n'est installé par ce repo.
4. Récupérer la branche `feat/live-webrtc-foundation` (ZIP), ouvrir PowerShell dans sa racine.
5. Lancer `npm --prefix live test`, puis `npm --prefix live start`.
6. Naviguer vers http://127.0.0.1:8766/. Cliquer « Ouvrir la caméra », puis « Connecter Scope », puis « Activer Japon » **après réception de frames IA**.
7. Se déplacer devant la caméra, passer « Réalité » pendant que le modèle reste actif. La bascule doit être instantanée. Si Scope n'a pas renvoyé de vidéo, le brut reste affiché et l'interface indique que l'IA n'est pas disponible.

**Ce que la CI vérifie :** logique de commutation/frames périmées, validation de signalisation, serveur local limité et routes HTTP. **Ce qu'elle ne vérifie PAS :** rendu Japon, persistance, latence de bout en bout, performances GPU, interopérabilité OBS, comportement sur téléphone et visio réelle.

### Vers l'appel vidéo
Pour un premier test de visioconférence sur PC, capturer **la zone de la vidéo en plein écran** comme source OBS, puis « Démarrer la caméra virtuelle »; dans Discord/Meet/Zoom, sélectionner « OBS Virtual Camera ». OBS n'est pas codé dans ce dépôt et ce flux de bout-en-bout reste à essayer en conditions réelles. Pour marcher/faire un tour avec un téléphone, il faudra connecter la caméra mobile au moteur et la visio, ou intégrer la transformation à l'application mobile. C'est une **contrainte produit**, pas un bonus.

### Documents de référence
- [ADR-0002, objectif live non négociable](docs/ADR_0002_LIVE_ONLY.md)
- [Architecture du pipeline](docs/ARCHITECTURE.md)
- [Méthodologie des essais et critères de persistance](docs/EXPERIMENTS.md)
- [Étude des moteurs existants](docs/RESEARCH_LIVE.md)
- [Backlog orienté démonstration](docs/TASKS.md)
- [Passation Codex](docs/HANDOFF.md)
- [Historique des échanges](docs/CHATGPT_PROJECT_HISTORY.md)

Projet expérimental, aucune Lens Snapchat ni APK disponible à ce stade.
