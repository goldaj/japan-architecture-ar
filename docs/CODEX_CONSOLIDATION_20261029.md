# Consolidation WebRTC et tracking caméra — 29 octobre 2026

**PR unique d'intégration :** [#8](https://github.com/goldaj/japan-architecture-ar/pull/8), base `main`.

La version `main` contient déjà la [PR #12](https://github.com/goldaj/japan-architecture-ar/pull/12) : flux caméra réel, démonstration de suivi local et tests synthétiques. Cette branche intègre désormais, par fusion Git à deux parents, les composants WebRTC originaux de la PR #8 : serveur, état de scène, pont de cadrage, interface et tests. Les deux historiques de travail sont conservés.

Les trois documents simultanément rédigés dans les branches, `README.md`, `AGENTS.md` et `docs/CHATGPT_PROJECT_HISTORY.md`, sont conservés avec les versions anciennes sous `docs/merge-archive/LIVE-*` ; le dernier README/base reste la référence active, et le présent fichier donne les étapes de reprise.

## Règles et limites de validation
- Ne pas prétendre qu'une transformation générative stable à 360°, la cohérence spatiale réelle ou la substitution de décor complet existent. Le rendu caméra et le WebRTC ne sont que des jalons.
- Tester les deux workflows GitHub Actions sur le **dernier** SHA fusionné, puis tester manuellement le navigateur (caméra autorisée localement, consentement, conditions réseau).
- Vérifier tout changement de permissions de média/stream, et ne jamais publier les flux capturés. Aucune donnée de caméra ne doit quitter le poste implicitement.
- Les anciennes PR photographiques #1/#5, explicitement écartées du produit live, restent archivées, pas intégrées au runtime.
- Codex peut poursuivre à partir de la PR #8 avec ces tests et les fichiers dans `live/`, sans réouvrir les branches 2D/photo rejetées.

**État :** consolidation technique ; les tests CI de la nouvelle tête et la vérification caméra réelle restent requis avant une décision de fusion finale.
