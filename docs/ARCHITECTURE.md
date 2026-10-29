# Architecture de la SEULE cible live

```text
Caméra (PC pour POC ; smartphone ensuite)
           │ vidéo réelle WebRTC
           ▼
Scope déjà installé / pipeline GPU V2V  <── prompt constant « Japon »
           │ vidéo générée avec mémoire temporelle
           ▼
Sélecteur du flux affiché (Japon / réalité) ── réaction immédiate
           │
           ▼
Canvas plein écran dans navigateur → capture OBS → OBS Virtual Camera
           │
           ▼
Google Meet / Discord / autre visio acceptant webcam standard
```

## Ce qui est réellement implémenté
- `live/server.mjs` : serveur Node local loopback + proxy HTTP **exclusivement** pour endpoints de signalisation Scope sur `127.0.0.1:8000`. Aucune image caméra ou sortie enregistrée par Node.
- `live/scope-bridge.mjs` : adaptateur WebRTC selon API Scope publique; envoi de la piste caméra, réception du MediaStream généré, négociation ICE.
- `live/stage-state.mjs` : état indépendant de l'IA et règle de fallback brut quand la dernière frame décodée IA est périmée.
- `live/app.mjs` : capture caméra Web, bascule J/R, lecture sortie, canvas plein écran, compteur de frames. Le flux IA n'est affiché que lorsqu'il est réellement reçu. Aucune transformation visuelle locale simulée.
- `live/tests/` : vérifications Node simulées **sans serveur Scope et sans caméra**. Test UI/OBS/GPU restant.

## Composants futurs sur **chemin critique**
- Backend GPU exécutant une diffusion vidéo **temporellement contrainte**, preuve sur caméra mobile et scènes à rotation complète.
- Mémoire persistante de la scène/objets pour **loop closure** si la banque temporelle ne suffit pas.
- Transport caméra téléphone et retour à l'appel avec latence maîtrisée, pas obligatoirement une intégration Instagram/Snapchat.
- Observabilité : FPS générées, âge dernière frame, p95 latence bout-en-bout, continuité des objets réapparus, coûts.

## Inconnues bloquantes
- Scope en local demande >=24 Go VRAM selon documentation officielle; machine 12 Go insuffisante pour la baseline Scope actuelle.
- L'API WebRTC peut évoluer; notre adaptateur doit être testé contre une version précise de Scope.
- Le canvas en plein écran capturé par OBS nécessite réglage local et peut dépendre de l'accélération matérielle Windows.
- Une caméra virtuelle desktop ne résout pas encore un **appel depuis le téléphone pendant une promenade**.

## Critère de vérité
Pas de vidéo IA générée validée = pas de filtre Japon démontré. Camera brute affichée en fallback n'est pas « succès ». Aucun changement de la vidéo ne doit nécessiter de nouveau projet photo.
