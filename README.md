# Japan Architecture AR

**Statut : prototypage, non publié sur Snapchat.**

Transformations visuelles d'architecture contemporaine vers une ambiance japonaise, en conservant le cadrage de la scène. Le projet vient de l'idée `assistant-ar-japan-snapchat` de l'incubateur de projets.

## Premier jalon
Un atelier **local, sans API** : charger une photographie de rue, sélectionner plusieurs façades en quatre coins, modifier les coins par glisser-déposer, personnaliser chaque façade (2 palettes, opacité), exporter soit le PNG composite soit le calque transparent. Enregistrer un projet JSON versionné, puis le rouvrir sur la **même photographie**, identifiée par une empreinte SHA-256 calculée localement. La détection des bâtiments reste manuelle, le rendu reste illustratif.

Le code expérimenté dans le navigateur et le script pour Lens Studio sont deux pistes complémentaires. Aucun projet `.lsproj` ni contenu propriétaire n'est encore généré.

## Test du prototype
À l'arrivée de la PR `feat/chatgpt-photo-mvp` sur `develop` :
1. Installer Node.js 20+ (pour les tests) et avoir Python 3 (pour le serveur web local).
2. `npm test`.
3. `python -m http.server 8000` à la racine ; ouvrir `http://localhost:8000/web/`.
4. Choisir une image dont on possède les droits (25 Mo maximum) ; placer les quatre coins, dans l'ordre haut-gauche / haut-droit / bas-droit / bas-gauche.
5. Déplacer les poignées de coin pour améliorer l'alignement ; modifier le style et l'opacité de la façade active.
6. Cliquer « Ajouter une façade » pour en traiter plusieurs. Sélectionner ou supprimer une façade indépendamment des autres.
7. Exporter le PNG composite ou le calque transparent destiné à l'essai Lens Studio.
8. Enregistrer la scène JSON, puis recharger la même image avant de réimporter le JSON. Le JSON ne contient aucune donnée pixel de photo ; il comprend toutefois le nom de fichier et l'empreinte de l'image, à traiter comme informations potentiellement sensibles.

Aucune image n'est téléchargée vers un serveur par l'application. Aucun rendu AR live ni détection IA pour le moment.

## Documents de travail
- [Vision et critères d'acceptation](docs/PRODUCT.md)
- [Architecture et jalons](docs/ARCHITECTURE.md)
- [Format des projets JSON](docs/SCENE_FORMAT.md)
- [Plan, avancement et sous-étapes](docs/TASKS.md)
- [Feuille de route](docs/ROADMAP.md)
- [Veille technique et sources](docs/RESEARCH.md)
- [Coordination pour Codex](docs/COORDINATION_CODEX.md)
- [Passation](docs/HANDOFF.md)
- [Historique des échanges](docs/CHATGPT_PROJECT_HISTORY.md)

**Branches :** `main` (initiale), `develop` (coordination), branches `feat/...` (PR draft, revue avant fusion). Licence MIT.