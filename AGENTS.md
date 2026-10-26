# Consignes ChatGPT / Codex

## Mission
Transformer visuellement des façades et paysages bâtis vers une esthétique d'architecture japonaise. Périmètre environnement et bâtiments, **pas** retouche du visage ou des personnes. Première cible : prototype navigateur autonome, puis Lens Studio / Snapchat.

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
- Les photos restent dans le navigateur et ne sont pas envoyées. Aucun secret, visage d'autrui, lieu personnel, accès privé ou fichier Lens fermé/licencié dans Git.
- Si une API Lens Studio n'est pas validée dans la version installée, la noter comme restant à valider.
- À chaque intervention mettre à jour `docs/TASKS.md`, `docs/HANDOFF.md` et le journal de contexte, avec horodatage seulement quand attesté; distinguer verbatim et résumé reconstitué.
- CI de code pur : `npm test` (Node 20+); visualisation navigateur en local. Tests manuels Lens Studio séparés.
- Document source de la convention : https://github.com/goldaj/projects-incubator/blob/main/docs/GITHUB_CODEX_CONTEXT_POLICY.md

## Décision de priorité
Apprendre avec une petite tranche vérifiable, puis améliorer. La détection des façades, la cohérence temporelle et la génération d'architectures crédibles sont des défis ouverts, non des fonctionnalités déjà disponibles.