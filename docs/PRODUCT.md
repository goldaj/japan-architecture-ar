# Produit : Japan Architecture AR

## Intention
Regarder des rues réelles à travers un filtre transformant les façades dans une esthétique japonaise : bois, cloisons, enseignes, toitures, lanternes, cohérence d'ensemble. Les styles doivent être nommés (p. ex. machiya/ville historique ou enseignes nocturnes) et être documentés sans caricature.

## Bénéfice / public
Expérimentation AR créative, tourisme, vidéo courte. Le vrai critère est l'impression de transformation du **bâti existant**, sans remplacer intégralement une scène par une image sans rapport.

## MVP 0 : laboratoire photo
Entrée : une photo locale. Interaction : délimitation manuelle de **plusieurs** façades quadrilatérales convexes (24 maximum), sélection et glisser-déposer de leurs coins, style et opacité propres à chaque façade. Résultat : pose déterministe de couleur/poutres/lattes avec deux palettes et deux exports PNG (composite/transparent). Critères :
- Pas d'API distante ni de transfert de photographie; le serveur local ne fournit que le code.
- Validation des quatre coins, de l'aire et de la convexité, coordonnées normalisées, sélection/modification immuables.
- Scène JSON sauvegardable/importable, format versionné; photo associée par SHA-256 calculé localement, photo **non embarquée**.
- Échecs de validation des fichiers importés et géométries gérés sans corrompre la scène courante.
- Deux styles sur plusieurs façades, rendu illustratif sans segmentation et sans suivi spatial.
- Tests automatiques géométrie, scène et rendu; vérification visuelle navigateur obligatoire avant de déclarer le MVP validé.

## MVP 1 : prototype Lens Studio
Transférer une texture d'habillage transparente pré-générée dans un objet Screen Image, activer/désactiver sur un tap; **alignement seulement pour un point de vue**, dérive quand caméra bouge. Le contenu Lens Studio doit être assemblé dans l'éditeur puis validé sur smartphone.

## MVP 2 : suivi AR
Ancrer façade/objets 3D à la scène et maintenir une pose stable sur mouvements caméra; tester dérive, occultation et luminosité. Choisir Scene Tracking/World Tracking ou approche géométrique après test de faisabilité. Pas de promesse sans données.

## MVP 3 : automatique + IA
Détecter façades/surfaces, estimer leur géométrie et générer/placer éléments architecturaux; comparer segmentation locale, SnapML / autres solutions compatibles Snap, et éventuellement pré-calcul hors-ligne. Vérifier politiques de données et budgets de latence.

## Hors périmètre immédiat
Remplacement parfait des bâtiments en vidéo temps réel, reconnaissance de propriétaires, tracking de personnes, géolocalisation nécessaire, photogrammétrie complète de quartiers.

## Risques
Variété des bâtiments, pièges de perspective, occultation piétons/végétation, droits à l'image, consommation GPU/batterie, restrictions Snapchat, confusion illustration/transformation photoréaliste.
