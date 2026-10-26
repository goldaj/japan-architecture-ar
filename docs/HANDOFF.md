# Passation Codex : pivot IA (2026-10-26)

## Décision
Le propriétaire a validé qu'un moteur géométrique de façades fonctionne, mais son rendu est **très inférieur à l'objectif**. Il souhaite transformer toute la scène (bâtiments, routes, arbres, atmosphère) comme un résultat obtenu directement avec ChatGPT. Priorité : **modèles d'édition d'image existants**, puis vidéo.

## Nouvelle réalisation
- Branche `feat/ai-photo-transform` (PR **brouillon** dédiée vers `develop`).
- `tools/ai-photo-server.mjs` : serveur HTTP Node 22 natif localhost-only, multipart, clé `OPENAI_API_KEY` côté serveur, consentement utilisateur par action explicite, limite fichier, erreur API traitée.
- `src/ai/image-client.mjs` : appel OpenAI `/v1/images/edits`, modèle Flare / Sunburst, retour PNG.
- `src/ai/prompt.mjs` : 3 styles, instructions structurées, conservation premier plan optionnelle.
- `ai/` : UI locale avant/après, upload, génération et download. Les photos personnelles de l'utilisateur ne sont **pas** uploadées dans GitHub.
- `docs/ADR_0001_AI_FIRST.md` et `docs/VIDEO_ROADMAP.md` expliquent les arbitrages.

## Vérifications, précision importante
- Les tests CI/mock sont destinés à valider la plomberie et les contraintes sans facturation.
- **Aucun appel API payant**, aucune transformation réellement générée par la branche, **aucune démonstration UI dans un navigateur** à cette date. Les screenshots fournis en chat démontrent seulement les possibilités de ChatGPT, pas cette application.
- Clé API et facturation utilisateur requises; un abonnement ChatGPT n'inclut pas automatiquement le quota API.

## Reprise
1. Lire `AGENTS.md`, `docs/ADR_0001_AI_FIRST.md`, `docs/TASKS.md`, `docs/CHATGPT_PROJECT_HISTORY.md`, et la PR.
2. `npm test`, `npm run check`. Server : `npm start`, UI : http://127.0.0.1:8765/.
3. Avec autorisation du propriétaire et clé fournie **dans son environnement local uniquement**, essayer photo réelle; noter seconds/coût/qualité sans publier la photo dans Git.
4. Corriger API / rendu si le compte du propriétaire a d'autres permissions ou paramètres.
5. Tester image-to-image robuste et comparer modèles, ensuite video-to-video.
6. Ne pas effacer la PR #1 : conservée comme prototype manuel, non chemin critique.

## Confidentialité
La **branche IA envoie volontairement** l'image vers OpenAI après confirmation au clic. Le prototype procédural ancien était hors ligne. Toute description du système doit expliciter cette différence. N'expose jamais cette app locale sur Internet.
