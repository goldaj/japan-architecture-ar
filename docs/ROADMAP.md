# Roadmap uniquement « faux Japon en visioconférence live »

| Phase | Livrable vérifiable | État |
|---|---|---|
| L0 | Architecture événement live, choix de moteurs et critères de persistance | Spécification en cours |
| L1 | Capture caméra en streaming WebRTC, Scope reçu, bascule réalité sans rechargement | **Code frontend/backend présent; IA sur matériel réel non testée** |
| L2 | Moteur vidéo génératif effectivement produit en continu; prompt japonais | À valider sur GPU >=24 Go ou alternative |
| L3 | Maintien identité générée en tournant 90/180/360°; comparer modèles/mémoire | Pas démarré |
| L4 | Afficher flux dans OBS Virtual Camera et appeler une personne sans couper la visio | Pas démarré |
| L5 | Caméra smartphone mobile, transport réseau, marche; latence et dégradation | Pas démarré |
| L6 | Optimiser le pipeline matériel/qualité/coûts; choisir distribution finale | Pas démarré |

**Aucun jalon photo standalone ni vidéo pré-enregistrée à livrer.** Des clips peuvent servir comme signaux reproductibles de benchmark pour tester la persistance, seulement si cela sert directement la cible live.

## Priorités
1. Fonctionnement V2V **live réel**, même peu joli, sur GPU disponible.
2. Cohérence dans le temps à rotation + loop closure.
3. Bascule « révèle la blague » instantanée.
4. Intégration visio et marche avec caméra mobile.
5. Qualité visuelle; pas de fidélité exacte exigée.

Voir docs/ADR_0002_LIVE_ONLY.md.
