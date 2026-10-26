# Japan Architecture AR : architecture IA d'abord

**Statut au 26/10/2026 : POC photo-to-photo avec modèle IA existant; code et tests unitaires écrits, mais **aucune génération facturée ni essai navigateur réel** effectués par ChatGPT. Ce n'est pas une application Snapchat, une APK, ni de la vidéo live.

## Vision
Transformer de manière **photographique et cohérente** une rue réelle vers une ambiance japonaise : bâtiments, façades, toitures, végétation, routes, éclairage, ciel et détails. Préserver le point de vue, les perspectives et, si demandé, les objets du premier plan. La transformation peut modifier certains détails malgré le prompt : aucun modèle ne garantit une fidélité géométrique parfaite.

### Pourquoi le pivot ?
Le premier [laboratoire manuel de façades (PR #1, WIP)](https://github.com/goldaj/japan-architecture-ar/pull/1) produit une superposition en aplats sur quadrilatères, pas une transformation naturelle de toute la scène. Un essai utilisateur sur photo réelle l'a confirmé. **La nouvelle priorité est l'édition générative globale**, avant la vidéo. L'ancien travail est préservé, pas fusionné ni supprimé.

## Démarrage Windows (POC IA)
Pré-requis : **Node.js 22 ou supérieur**, connexion Internet et **clé API OpenAI personnelle avec facturation configurée** (distincte de l'abonnement ChatGPT).

1. Télécharger cette branche `feat/ai-photo-transform` en ZIP, ou faire `git clone` et `git checkout feat/ai-photo-transform`.
2. Ouvrir PowerShell **à la racine** (Explorateur Windows → `Alt + D` → `powershell`).
3. Dans PowerShell, saisir la clé sans l'écrire dans le dépôt ou une commande conservée dans l'historique :

   ```powershell
   $secret = Read-Host "Cle API OpenAI" -AsSecureString
   $env:OPENAI_API_KEY = [System.Net.NetworkCredential]::new("", $secret).Password
   Remove-Variable secret
   node --version
   npm test
   npm start
   ```

4. Ouvrir **http://127.0.0.1:8765/** dans le navigateur. Le serveur écoute uniquement sur le PC local.
5. Charger un JPEG, PNG ou WebP (maximum 12 Mo au total), choisir l'ambiance (résidentiel japonais, Kyoto, Tokyo), le modèle (Flare rapide ou Sunburst plus précis) et la qualité. Adapter les consignes si besoin.
6. Cocher la confirmation explicite d'envoi de la photo à OpenAI et cliquer **Générer**. Chaque clic lance un appel potentiellement facturé. Attendre le résultat et enregistrer le PNG.

La génération depuis les **photos de cette conversation n'a pas été lancée via l'API**. Elles ne sont pas ajoutées au GitHub public. Les images restent en mémoire du processus pendant la requête et ne sont pas écrites sur disque par le serveur.

## Fonctionnement technique
- `ai/index.html`, `ai/app.mjs`, `ai/style.css` : interface photo, presets, modèle, préservation du premier plan, avant/après et téléchargement.
- `src/ai/prompt.mjs` : construction des prompts structurés avec conservation de la scène.
- `src/ai/image-client.mjs` : appel `POST /v1/images/edits` de l'API OpenAI; sortie PNG.
- `tools/ai-photo-server.mjs` : serveur Node natif local, clé conservée côté serveur, pas de CORS, limites d'upload, confirmation.
- `tests/ai-*.test.mjs` et GitHub Actions : validations et faux service pour **ne pas payer d'appels dans la CI**.

### Limites
- **L'image doit être envoyée à OpenAI** à la demande; ne pas transmettre de photo confidentielle.
- Pas de traitement live, pas de stabilisation 3D ni de garantie de conserver chaque pixel ou objet exactement.
- Pas d'estimation ferme de prix par photo : dépend du modèle, de la qualité, de la résolution et des tokens. Vérifier la [page des tarifs](https://developers.openai.com/api/docs/pricing).
- Des autorisations/API billing ou une vérification d'organisation peuvent être nécessaires.
- POC de recherche, **ne pas exposer le serveur sur Internet**.

## Suite
1. Tester la photo d'origine avec Flare (medium), puis Sunburst (high); comparer à l'exemple cible de l'utilisateur **sans publier ses photos dans Git**.
2. Tester cohérence géométrique de bâtiments, route, arbre, objets de premier plan.
3. Tester de la vidéo préenregistrée via API **video-to-video**; évaluer temporalité et mouvement avant d'envisager AR Snapchat en direct.
4. Lens Studio ne sera branché qu'après choix vérifié du pipeline capable d'assurer latence et cohérence vidéo.

Voir [décision IA d'abord](docs/ADR_0001_AI_FIRST.md), [plan vidéo](docs/VIDEO_ROADMAP.md), [plan opérationnel](docs/TASKS.md), [passation Codex](docs/HANDOFF.md) et [historique](docs/CHATGPT_PROJECT_HISTORY.md). Licence MIT.
