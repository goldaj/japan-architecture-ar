# Pistes techniques et vérifications (2026-10-26)

## Éléments vérifiés dans la documentation consultée
- Snap Lens Studio offre création d'expériences de réalité augmentée, suivi et différents types de segmentation (documentation éditeur) : https://support.lensstudio.snapchat.com/hc/en-us/articles/360051085391-Lens-Studio-Quick-Start
- Les Screen Image, les textures et les render targets sont des fonctions documentées : https://support.lensstudio.snapchat.com/hc/en-us/articles/360049232291-Using-and-Freezing-Multiple-Cameras
- La documentation SDK possède des restrictions de confidentialité spécifiques aux APIs caméra et réseau; **ne pas** supposer libre circulation des frames vers un serveur : https://developers.snap.com/lens-studio/api/lens-scripting/documents/Privacy_Restrictions.html
- Pour l'état logiciel consulté : au moins une version 5.22.0 publiée en juin 2026; **ne pas figer cette version comme « latest »** : https://ar.snap.com/download/v5-22-0
- Exemple historique de `TapEvent` et d'inputs dans les scripts Lens Studio : https://support.lensstudio.snapchat.com/hc/ar/community/posts/360069051811-Accessing-Segmentation-Texture-Properties-through-script

## Décisions temporaires
- Commencer par géométrie humaine contrôlée, sans déléguer toute la scène à une génération d'images : isoler le problème spatial.
- Commencer par rendu calculable et reproductible avant style de haute fidélité.
- Lens Studio est l'intégration cible. Le laboratoire navigateur n'est **pas** un substitut final.

## À examiner avant de coder les phases P2/P3
1. Compatibilité exacte du script et des composants avec la version Lens Studio installée.
2. Capacités fiables de segmentation des façades (une segmentation de ciel ou de portrait n'est **pas** une segmentation de bâtiments).
3. Scene Tracking / World Tracking et surface plane, profondeur, coordonnées image versus monde.
4. Contraintes SnapML et Lens Studio concernant taille modèle, chargement, FPS et permissions.
5. Autorisations de photo, lieux et marques affichés; politique de publication Lens.
6. Mesurer sur un appareil cible réel, puis documenter limites chiffrées.

## Statut des preuves
Recherche documentaire seulement; **aucun** essai Lens Studio, benchmark smartphone, ni évaluation IA réalisé à cette date.

## Pivot 2026-10-26 : éditeurs d'image et vidéo existants
Le précédent choix « procédure de traçage de façades » est rétrogradé en spike/historique. API OpenAI Images Edits disponible pour GPT Image 2.5 Flare (rapidité) et Sunburst (précision), avec support JPEG/PNG/WebP et retour image. Voir https://developers.openai.com/api/docs/guides/image-generation et https://developers.openai.com/api/docs/guides/image-prompting.
- La capture de scène/structure et la gestion des lumières d'une image source font partie de la tâche d'édition générative, sans devoir coder chaque toiture/route/arbre.
- Une API vidéo existante pourrait être adaptée pour une vidéo courte **hors ligne** : https://docs.dev.runwayml.com/api/ (video-to-video) ou https://developers.openai.com/api/docs/changelog (Sora edits). Compatibilité réelle/accès et coût doivent être mesurés.
- Aucune de ces références ne constitue une preuve de filtre AR live sur smartphone.
