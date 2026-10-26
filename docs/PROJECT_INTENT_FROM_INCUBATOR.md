> Cadrage transféré depuis l'incubateur le 2026-10-26. Le projet a déjà un dépôt dédié ; il ne relève donc plus de l'index des idées à lancer.
>
> Source historique : https://github.com/goldaj/projects-incubator/blob/main/ia-et-multimedia/assistant-ar-japan-snapchat.md (voir l'historique Git après retrait de l'index).

# Filtre Japon en réalité augmentée — transformer un décor réel en direct

**Statut :** projet transféré vers un dépôt autonome ; les fonctions et protocoles ci-dessous restent des hypothèses à challenger.

## Le véritable usage visé
L'idée n'est **pas simplement de poser un filtre anime sur un selfie**. Il s'agit de filmer **en direct** un lieu ordinaire et de lui donner une apparence crédible de **rue, quartier ou paysage japonais** : architecture, façades, enseignes, végétation et ambiance. L'utilisateur peut **se déplacer et tourner sur lui-même**, et l'environnement transformé doit rester cohérent d'une image à l'autre.

Un scénario humoristique a été explicitement mentionné : faire une **visio en direct** dans laquelle on donne l'impression de se trouver au Japon, puis **révéler instantanément** le flux de la caméra réelle. Cette révélation sans couture fait partie de l'objectif, pas un effet secondaire. Le nom historique « Snapchat » n'impose **ni cette plateforme ni Lens Studio** comme choix final.

## Séquence de démonstration cible
1. Ouvrir la caméra et démarrer une visio ou un flux continu compatible.
2. Activer la transformation du **décor**, en préservant la continuité géométrique et l'identité des personnes.
3. Marcher, tourner, recadrer : les éléments déjà vus restent reconnaissables au lieu de changer aléatoirement à chaque frame.
4. Désactiver immédiatement l'effet et afficher l'image réelle, sans révélation progressive imposée.
5. Désigner clairement le flux comme transformé lorsqu'il est utilisé publiquement hors d'un contexte ludique consenti.

## Le problème scientifique/technique
La génération image par image produit souvent du scintillement, des enseignes qui changent, des façades instables et une latence inutilisable pour le direct. L'enjeu prioritaire est donc **la stabilité spatio-temporelle sous mouvement** et la faible latence, pas une image fixe particulièrement belle.

Pistes de comparaison **à étudier, aucune retenue** :
- Effets 2D/segmentation + assets 3D persistants sur surfaces suivies ; plus rapides, mais transformation architecturale limitée.
- Reconstruction simplifiée de scène (profondeur, SLAM/VIO), calque 3D cohérent et remplacement contrôlé de textures/objets.
- Génération vidéo conditionnée par la scène, la caméra et l'historique temporel ; coûts, latence et dérive probablement plus difficiles à maîtriser.
- Mélange hybride : fond géométrique stable + stylisation IA d'éléments choisis.

## Validation avant programmation
Construire un protocole avec un clip réel libre de droits : plan fixe, marche latérale, rotation à 360°, occlusions, mauvaises conditions lumineuses et bascule retour réel. Mesurer end-to-end FPS et latence, instabilité temporelle, alignement géométrique, identité visuelle et qualité de la révélation. Décider du **matériel de calcul** (téléphone, PC distant ou service) uniquement après estimations/benchmarks.

## Bornes et risques
Ce projet ne nécessite **ni graffiti géolocalisé, ni partage mondial, ni persistance multi-utilisateur** : c'est distinct de la Toile AR planétaire. Prévoir transparence sur la vidéo transformée, consentement des personnes et respect de la vie privée ; éviter que la démo ne serve à fabriquer une fausse preuve.

**Décisions non prises :** plateforme de capture/diffusion, style japonais exact, niveau de photoréalisme, dispositif de calcul, modèle IA, débit minimal acceptable et budget.
