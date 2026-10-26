# Consignes ChatGPT / Codex

## Mission
Transformer **l'ensemble de scènes réelles** (bâtiments, toitures, routes, arbres, ciel et éclairage) vers une esthétique japonaise photoréaliste tout en préservant la géométrie et les éléments du premier plan. Périmètre **environnement**, pas retouche des personnes. **Nouvelle priorité validée par le propriétaire le 26/10/2026** : API d'édition d'images existantes, puis video-to-video et, seulement ensuite, piste AR Snapchat. Ancienne PR #1 de calques géométriques conservée comme expérience non prioritaire. Lire docs/ADR_0001_AI_FIRST.md.

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
- **La nouvelle branche IA est différente du vieux prototype local** : avec consentement explicite au clic, la photographie est transmise à l'API OpenAI et la requête est facturable. Ne jamais annoncer que toute l'expérience est hors ligne. Protéger strictement OPENAI_API_KEY (variable d'environnement serveur, jamais browser/GitHub/log). Ne pas publier de photos réelles personnelles, lieux privés, sorties utilisateurs, jetons ou exports dans Git. L'ancienne branche procédurale reste, elle, entièrement locale.
- Si une API Lens Studio n'est pas validée dans la version installée, la noter comme restant à valider.
- À chaque intervention mettre à jour `docs/TASKS.md`, `docs/HANDOFF.md` et le journal de contexte, avec horodatage seulement quand attesté; distinguer verbatim et résumé reconstitué.
- CI de code pur : `npm test` (Node 20+); visualisation navigateur en local. Tests manuels Lens Studio séparés.
- Document source de la convention : https://github.com/goldaj/projects-incubator/blob/main/docs/GITHUB_CODEX_CONTEXT_POLICY.md

## Décision de priorité
Apprendre avec une petite tranche vérifiable, puis améliorer. La détection des façades, la cohérence temporelle et la génération d'architectures crédibles sont des défis ouverts, non des fonctionnalités déjà disponibles.
## Coordination du pivot IA
- [Décision architecturale](docs/ADR_0001_AI_FIRST.md) et [plan vidéo](docs/VIDEO_ROADMAP.md) sont désormais la référence de direction.
- Branche ChatGPT `feat/ai-photo-transform`, PR draft vers `develop`. PR procédurale #1 préservée; ne pas merger l'une ou l'autre automatiquement.
- Tests CI via service simulé seulement; **aucun** appel payant ni évaluation photoréaliste réelle dans les tests automatisés. Enregistrer tout test réel avec modèle, qualité, timing, coût si disponible et comparaison à la photo cible sans publier les images personnelles.
