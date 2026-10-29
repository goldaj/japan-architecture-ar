# Recherche technique ciblée — 2026-10-26

## Daydream Scope (première intégration à vérifier)
GitHub : https://github.com/daydreamlive/scope
Documentation officielle WebRTC entrée/sortie : https://github.com/daydreamlive/scope/blob/main/docs/api/sendreceive.md
- Système open source/bêta pour pipelines vidéo génératifs interactifs.
- Webcam envoyée par WebRTC, flux transformé reçu par WebRTC; exemples API : `/api/v1/webrtc/ice-servers`, `/api/v1/webrtc/offer` POST, `/api/v1/webrtc/offer/{sessionId}` PATCH pour ICE.
- Pipelines vidéo/contrôle : StreamDiffusionV2, LongLive, MemFlow, RewardForcing, VACE.
- Systèmes locaux annoncés : NVIDIA **>=24 Go VRAM**, Windows/Linux; base recommandée 3090/4090/5090; GPU distant (Runpod etc.) proposé.
- Il faut lancer Scope et charger un modèle, ce repo Git **n'installe aucun de ces poids**.
- **Il faut valider** CORS/WebRTC/compatibilité API, redimensionnement, cas réel sur notre machine.
- Le premier proxy de signalisation de ce dépôt vise seulement le Scope sur localhost:8000; WebRTC transporte lui-même la vidéo.

## StreamV2V (référence principale de cohérence)
Code https://github.com/Jeff-LiangF/streamv2v
Papier ICLR 2025 : https://proceedings.iclr.cc/paper_files/paper/2025/hash/7280f65ed571b7b28321f2c7cf4c60c8-Abstract-Conference.html
- Feature-bank/attention rétrospective pour cohérence temporelle.
- Article : environ **20 FPS sur A100**, démonstration **RTX 4090**. Les résultats ne permettent pas d'inférer FPS sur 3060 12 Go.
- Mémoire courte ne garantit **pas** qu'une façade cachée pendant plusieurs secondes reste identique au retour après rotation.

## StreamDiffusion (baseline plus légère, sans conclusion GPU)
Code : https://github.com/daydreamlive/StreamDiffusion
Paper ICCV 2025 : https://openaccess.thecvf.com/content/ICCV2025/html/Kodaira_StreamDiffusion_A_Pipeline-level_Solution_for_Real-Time_Interactive_Generation_ICCV_2025_paper.html
- Pipeline de diffusion optimisé interactif avec modules StreamV2V/TemporalNet selon versions; configuration légère **à benchmarker**, pas de promesse de VRAM ou résultat japonais crédible.
- Un traitement par frame non contraint ou trop stylisé ne suffit pas pour la persistance.

## OBS Virtual Camera (livraison aux outils de visio PC)
Guide officiel : https://obsproject.com/kb/virtual-camera-guide
- Capture scène/sortie vidéo dans OBS, puis « Start Virtual Camera »; les applications de visio pouvant sélectionner une webcam utilisent OBS Virtual Camera.
- Le POC live propose un Canvas fullscreen capturable par OBS. Ce chemin n'a pas été essayé ici.
- Pour le cas mobile, il faudra vérifier l'acheminement caméra smartphone -> GPU -> application visio et sa latence; aucune compatibilité native Instagram revendiquée.

## Plateforme sociale
Annonce fermeture Meta Spark tiers au 14 janvier 2025 : https://www.reuters.com/technology/meta-shut-augmented-reality-studio-used-by-third-party-creators-2024-08-27/
Instagram n'est donc pas une dépendance; une caméra virtuelle indépendante évite d'enfermer le système dans un service fermé.

## Questions de recherche immédiates
- Quelle VRAM/latence/taux de frames produit réellement Scope sur 3090/4090 (ou cloud) avec entrée caméra mobile?
- Le contrôle vidéo VACE conserve-t-il mieux toitures/arbres que StreamV2V feature-bank à mouvement rapide?
- En retour d'une rotation, la mémoire courte reconstruit-elle la même scène? Si non, quelle mémoire spatiale ajoute la plus petite amélioration mesurable?
- Une RTX 3060 12 Go peut-elle faire tourner un pipeline StreamDiffusion allégé, et avec quels compromis? **Test requis.**
- Comment connecter et maintenir une caméra smartphone mobile vers un appel visio existant sans vidéo préenregistrée?
