# Audit de branches et passation — 2026-10-30

**Vérifié :** branches et PR ouvertes sur GitHub. **À compléter :** revue exhaustive des diffs et tests. Ne pas supprimer une branche à partir de son nom.

- Dépôt : `goldaj/japan-architecture-ar` ; branche par défaut : `main`.
- PR ouvertes : aucune.

## Branches (6)
- `develop`
- `feat/ai-photo-transform`
- `feat/camera-tracking-baseline-20261029`
- `feat/chatgpt-photo-mvp`
- `feat/live-webrtc-foundation`
- `main` (défaut)

## Contre-audit et reprise
- Les anciennes PR photo-only #1 et #5 sont divergentes et volontairement garées au profit du live WebRTC ; ne pas les réintroduire dans la production par une fusion automatique.
- Vérifier suivi caméra, cohérence temporelle, permissions et performance sur appareil.
- Comparer individuellement SHA, ascendance et fichiers de chaque branche à sa cible réelle ; relire les PR clôturées.
- Protéger les branches de déploiement, les assets et les données privées. Exécuter CI et tests avant toute intégration.

**Statut :** inventaire et risques documentés ; validation fonctionnelle restant à effectuer.
