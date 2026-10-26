# Premier contact Lens Studio (P2, À TESTER)

Le script `SceneToggle.js` gère une **bascule visuelle uniquement**. Il n'effectue ni segmentation des bâtiments, ni suivi spatial, ni traitement de la caméra. La présence du script sur GitHub n'est pas la preuve qu'une Lens Snapchat fonctionne.

## Assemblage manuel dans Lens Studio
1. Installer une version compatible de Lens Studio depuis https://ar.snap.com/download.
2. Créer un projet Camera / Snapchat de base; vérifier la version et consigner les résultats dans `docs/HANDOFF.md`.
3. Importer une image transparente de surcouche graphique **préparée et autorisée**. Dans la scène, ajouter un Screen Image affichant cet asset. Garder sa taille adaptée au ratio.
4. Regrouper la surcouche sous un Scene Object dédié. Ajouter un Script Component utilisant `SceneToggle.js`.
5. Relier `styleObjects` au(x) Scene Object(s) de surcouche dans l'Inspector; optionnellement relier `statusText`.
6. Prévisualiser; toucher l'écran pour basculer affichage. Vérifier les erreurs/variations d'API dans la version installée.
7. Répéter sur un téléphone et mesurer dérive dès déplacement du point de vue. La texture est fixée à l'écran, non au mur; un panoramique montrera un défaut d'alignement.
8. Ne publier aucun effet sans validation produit et des règles de Snapchat.

## Critères de P2
- Script accepté et exécuté dans l'éditeur (capture/log horodatés).
- Bascules réussies dans Lens Studio et sur smartphone.
- Limitation screen-space démontrée et consignée.
- Pas de télémétrie, de photos envoyées, ni de réseau implicite.

## Compatibilité
L'exemple de script utilise la syntaxe classique `// @input` et les événements Lens Studio. L'API peut évoluer. Ne jamais interpréter un `node --check` comme une validation dans l'environnement Lens Studio.