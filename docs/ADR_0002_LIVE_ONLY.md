# ADR-0002 — la visio en direct est le SEUL critère de livraison

Date : 2026-10-26 | Décision du propriétaire | **Statut : prioritaire et non négociable**

## Scénario exact
1. Lancer un **appel vidéo réel** avec un ami.
2. La caméra montre l'environnement transformé en paysage urbain japonais crédible (bâtiments, routes, végétation, ciel et éclairage).
3. En **marchant et en tournant sur soi-même**, les éléments générés gardent leur identité, emplacement relatif et apparence : pas de reconstruction arbitraire à chaque frame, notamment lorsqu'on revient voir un même bâtiment.
4. Activer « Révéler » pendant l'appel : la **caméra brute** remplace immédiatement le flux transformé, sans gel ni changement de visio. Repasser à « Japon » reste possible.

Aucune photo retouchée, vidéo hors ligne, démo prédéfinie ou simple shader ne remplace ce scénario.

## Ordre de priorité et arbitrages
1. **Persistance temporelle et spatiale** (fenêtres, toitures, immeubles, arbres générés restent les mêmes).
2. Fluidité/latence permettant la discussion, les mouvements et une vraie visio.
3. Révélation sans délai, sans coupure de flux.
4. Apparence photoréaliste et richesse du décor japonais.
5. Fidélité du monde réel : secondaire. Il est acceptable de changer la forme/couleur des objets, mais pas de changer arbitrairement leur identité pendant la même prise.

## Hypothèse du chercheur : maintenir un monde, pas seulement traduire des images
Un simple générateur image-par-image ne sait rien d'un arbre disparu hors champ. Même un petit historique de frames peut manquer la **boucle de retour** après rotation 360°.
Comparer, par étapes :
- H0 : StreamDiffusion sans mémoire temporelle; baseline volontairement faible pour scintillement.
- H1 : StreamV2V/feature bank ou VACE dans Scope : mémoire court terme / contrôle structurel.
- H2 : mémoire explicite de scène (image-clés ancrées, associations persistantes d'objets, caméra/pose, flow/SLAM léger) lorsque le retour arrière échoue.

H2 est une **hypothèse de recherche**, non une implémentation annoncée. Il faut mesurer H1 avant de coder SLAM/segmentation/reconstruction.

## Voie de distribution privilégiée
Première sortie **PC** : caméra (webcam/flux téléphone) → GPU moteur IA live → composition instantanée IA/brut → OBS Virtual Camera → appel Discord/Meet/Zoom. Puis résoudre mode **téléphone mobile** (source + calcul + destination de visio), avec un backend local ou distant selon latence/coût. Instagram n'est **pas imposé** : Meta Spark pour effets tiers a fermé en 2025.

## Portes « stop / go » proposées, PAS résultats mesurés
- Flux vidéo transformé qui bouge réellement, pas seulement une image figée.
- Séquence pilote 15–30s avec mouvement et retour au même point : reconstruction cohérente, flicker et dérive évalués.
- Cible d'étude initiale : >=15 images générées/s et latence caméra → caméra virtuelle p95 < 300ms, à réviser seulement sur données; **cibles non démontrées**, éventuellement difficiles.
- Révélation p95 < 100ms sur flux vidéo actif (une bascule visuelle, pas une seconde connexion).
- Si mémoire courte insuffisante après rotation complète, **ne pas** optimiser des détails graphiques : tester cache de scène spatial.

## Pistes invalidées comme chemins principaux
- Quadrilatères peints sur des façades : illusion non crédible, routes et arbres ignorés.
- OpenAI image-edit/photo-to-photo seule : ne rend pas un flux live.
- Génération d'une vidéo à partir d'une photographie : la trajectoire caméra n'est pas contrôlée.
- Traitement indépendant de chaque frame : scintillement attendu et forte consommation.
- Publier un filtre Instagram natif via Meta Spark : service fermé.

Voir `docs/RESEARCH_LIVE.md`, `docs/EXPERIMENTS.md` et `docs/TASKS.md`.
