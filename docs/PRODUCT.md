# Vision produit après pivot, 2026-10-26

## Cible finale
Utiliser une caméra ou vidéo réelle pour voir **l'environnement entier** transformé avec un style d'architecture japonaise crédible, sans effacer arbitrairement la structure de la scène. Bâtiments, routes, végétation, ciel, éclairage, matériaux et enseignes. Les détails du premier plan (fenêtres, balcons, meubles, personnes éventuelles) doivent rester cohérents.

## Critère visuel apporté par l'utilisateur
Le propriétaire a comparé trois images privées dans la conversation : original, premier filtre géométrique 2D et édition ChatGPT. Le rendu de l'éditeur 2D est jugé largement insuffisant; l'édition générative de toute la scène constitue **le niveau attendu d'exploration**. Aucune de ces photos ne doit être incluse dans le dépôt public.

## Produit progressif
- POC IA photo : une photo transformée naturellement, comparaison avant/après. Validation manuelle avec photos utilisateur en local et consentement d'appel API.
- POC vidéo : transformer une vidéo déjà enregistrée avec style stable à travers le temps, sans changer caméra ou silhouettes importantes.
- Recherche AR : seulement ensuite, parvenir à un retour avec délai faible, suivi spatial et appareil Snapchat compatible.

## Hors scope immédiat
Créer un moteur complet de modélisation 3D, dessiner manuellement tous les objets, publication Snapchat, traitement vidéo temps réel garanti et APK Android.

## Hypothèses à tester
- Le modèle de photo peut être suffisamment fidèle au point de vue réel.
- Un modèle de vidéo existant peut offrir une meilleure cohérence temporelle que des images indépendantes.
- Le traitement cloud peut être acceptable pour prototypage, pas nécessairement pour un filtre AR instantané.

## Qualité / sécurité
Évaluer fidélité géométrique, réalisme, diversité des objets transformés, absence de modifications indésirables, latence/coût, vie privée. Le POC nécessite l'envoi de la photo au fournisseur IA seulement après consentement explicite.
