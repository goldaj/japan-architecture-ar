# Backlog exclusif vidéo en direct — 2026-10-26

| ID | Sous-étape utile au cas d'usage | État |
|---|---|---|
| L0.1 | Verrouiller scénario de visio, mouvement, 360°, reveal | **Décidé par utilisateur**; ADR-0002 |
| L0.2 | Comparer Scope, StreamV2V, StreamDiffusion, contraintes GPU | Documenté (pas benchmark) |
| L1.1 | Caméra navigateur + connexion WebRTC Scope bidirectionnelle | Codé dans live/, non testé contre vrai Scope |
| L1.2 | Bascule immédiate vers caméra brute sans connexion modèle | Codé et testé via Node/mock; non testé OBS |
| L1.3 | Proxy signalisation Scope local et test routes | Codé + CI simulée |
| L2.1 | Installer Scope compatible sur GPU >=24Go ou location distante | À faire |
| L2.2 | Voir **une vraie vidéo générée en flux**, mesurer FPS/latence | À faire |
| L3.1 | Scénario 360° avec objets identifiables, annoter continuité | À faire |
| L3.2 | Comparer feature-bank/VACE, et si échec mémoire spatiale | Recherche conditionnelle |
| L4.1 | Brancher sortie dans OBS Virtual Camera puis vraie visio | À faire |
| L5.1 | Acheminer caméra smartphone pendant marche et bascule | À faire |
| L6.1 | Benchmark alternative 12Go RTX 3060 vs GPU distant | Après sortie live fonctionnelle |

## Gardes-fous
- Ne plus ajouter de modèle **photo-only** (PR #5 en veille).
- Ne pas fermer un jalon vidéo parce que la CI est verte.
- Distinguer FPS de sortie, délai de bout en bout et retour au même décor.
- Documenter chaque appareil/modèle/nombre de frames, problèmes et résultat honnêtement dans EXPeriments/HANDOFF.
- Pas de merge des PR #1, #5 ni de la présente branche avant revue.
