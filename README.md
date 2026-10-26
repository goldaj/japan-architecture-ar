# Japan Architecture AR

**Statut : prototypage, non publié sur Snapchat.**

Transformations visuelles d'architecture contemporaine vers une ambiance japonaise, en conservant le cadrage de la scène. Le projet vient de l'idée `assistant-ar-japan-snapchat` de l'incubateur de projets.

## Premier jalon
Un petit atelier **local, sans API** : charger une photographie de rue, cliquer quatre coins d'une façade (haut-gauche, haut-droite, bas-droite, bas-gauche), appliquer une surcouche stylisée et exporter un PNG. Il ne reconnaît **pas** automatiquement les bâtiments : sélection humaine et rendu illustratif.

Le code expérimenté dans le navigateur et le script pour Lens Studio sont deux pistes complémentaires. Aucun projet `.lsproj` ni contenu propriétaire n'est encore généré.

## Test du prototype
À l'arrivée de la PR `feat/chatgpt-photo-mvp` sur `develop` :
1. Installer Node.js 20+ (pour les tests) et avoir Python 3 (pour le serveur web local).
2. `npm test`.
3. `python -m http.server 8000` à la racine ; ouvrir `http://localhost:8000/web/`.
4. Choisir une image possédée ou libre d'utilisation; cliquer les 4 coins dans l'ordre indiqué.
5. Changer le style et l'opacité, puis exporter une image sur son ordinateur.

Aucune image n'est téléchargée vers un serveur par l'application. Aucun rendu AR live ni détection IA pour le moment.

## Documents de travail
- [Vision et critères d'acceptation](docs/PRODUCT.md)
- [Architecture et jalons](docs/ARCHITECTURE.md)
- [Plan, avancement et sous-étapes](docs/TASKS.md)
- [Feuille de route](docs/ROADMAP.md)
- [Veille technique et sources](docs/RESEARCH.md)
- [Coordination pour Codex](docs/COORDINATION_CODEX.md)
- [Passation](docs/HANDOFF.md)
- [Historique des échanges](docs/CHATGPT_PROJECT_HISTORY.md)

**Branches :** `main` (initiale), `develop` (coordination), branches `feat/...` (PR draft, revue avant fusion). Licence MIT.