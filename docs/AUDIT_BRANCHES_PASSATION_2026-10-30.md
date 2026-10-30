# Audit de reprise et de branches — 30 octobre 2026

## Finalité du projet
Transformation **en direct** d'une scène de caméra en architecture d'inspiration japonaise, avec priorité au suivi spatio-temporel et retour immédiat à la réalité. Le projet ne doit pas être reclassé comme simple idée de l'incubateur. Les anciens POC d'image fixe ne sont pas le cœur du produit.

## Branches GitHub : base `main`
- `main` : `558a6a3068a434889869ff5383d908c77a9a5abe` (référence).
- `develop` (`3b8cf1a81385ea13b0b5e05ea7fae34b229bf4dc`) : `behind`, ahead 0, behind 15. Ancêtre du main, candidate à nettoyage après contrôle des références.
- `feat/ai-photo-transform` (`0dd851c0bcba5567e1f9c4350631a058666a8475`) : `diverged`, ahead 2, behind 19. Travail divergent à garder séparé jusqu'à décision fonctionnelle.
- `feat/camera-tracking-baseline-20261029` (`a775dfd5314b50e1f229c7ac032f72393ea38913`) : `behind`, ahead 0, behind 18. Ancêtre du main, candidate à nettoyage après contrôle des références.
- `feat/chatgpt-photo-mvp` (`a1cef27023c07bda1593631e1e02f5dc6a23f28d`) : `diverged`, ahead 5, behind 22. Travail divergent à garder séparé jusqu'à décision fonctionnelle.
- `feat/live-webrtc-foundation` (`da20dd0d61aec2962c933b0737b9fac0ca5a308a`) : `behind`, ahead 0, behind 4. Ancêtre du main, candidate à nettoyage après contrôle des références.

## PR
- [#12](https://github.com/goldaj/japan-architecture-ar/pull/12) : fusionnée ; `feat/camera-tracking-baseline-20261029` → `main`.
- [#8](https://github.com/goldaj/japan-architecture-ar/pull/8) : fusionnée ; `feat/live-webrtc-foundation` → `main`.
- [#5](https://github.com/goldaj/japan-architecture-ar/pull/5) : fermée sans fusion ; `feat/ai-photo-transform` → `develop`.
- [#1](https://github.com/goldaj/japan-architecture-ar/pull/1) : fermée sans fusion ; `feat/chatgpt-photo-mvp` → `develop`.

## Challenge technique / décisions
- **Live-first :** vérifier réellement la caméra sécurisée, suivi de points, fidélité de l'overlay, pertes de suivi, changements de lumière, latence p50/p95, FPS et rafraîchissement lors d'un déplacement. Le baseline ne fournit pas à lui seul un filtre IA photo-réaliste ni du SLAM.
- **POC archivés :** `feat/ai-photo-transform` et `feat/chatgpt-photo-mvp` sont différents de live ; les anciennes PR ont été classées PARKED. Ne pas les fusionner sur main simplement parce qu'elles contiennent des commits propres : leur objectif ne correspond pas au MVP live.
- **Confidentialité :** aucun enregistrement/transmission vidéo sans consentement. Vérifier permissions caméra et comportements de refus.
- **Validation :** lire `docs/CAMERA_BASELINE.md` et `docs/PROJECT_INTENT_FROM_INCUBATOR.md` ; exécuter tests Node puis une séance mobile réelle et mesurer, pas seulement visualiser un dessin sur PC.

## Reprise
Lire README (« # japan-architecture-ar »), AGENTS.md, docs/CHATGPT_PROJECT_HISTORY.md et les guides expérimentaux. Figer le contrat métrique et données avant d'améliorer l'effet. Ne pas inventer d'essai appareil ou performances ; cette passe n'a exécuté aucun test. Aucune PR fusionnée ou branche supprimée par ce document.
