# Protocole d'essais orienté uniquement vers la visio « faux Japon »

## Les trois expériences discriminantes

### E1 — Direct, stabilité et bascule (nécessite GPU vidéo)
Source de caméra live et Scope chargé. Tourner lentement la tête/caméra. Mesurer d'abord l'existence d'une vraie sortie générée et la synchronisation des mouvements, pas uniquement « qualité photo ».
- Nombre images décodées du flux IA / secondes utiles; p95 des intervalles entre frames.
- Latence mesurée avec une horloge ou signal lumineux filmé **dans les deux vues**, puis observé sur l'écran/caméra virtuelle; ne pas déduire latence de FPS.
- Activer/désactiver le filtre 20 fois pendant le flux. Mesurer la durée jusqu'au premier frame brut et noter tout gel ou renégociation.
- Cas panne GPU : image brute et signal « Flux IA périmé », aucun gel persistant.

### E2 — « Je tourne sur moi-même »
Filmer une façade distinctive, un arbre, une route; tourner de 90°, 180°, puis 360° et revenir. Garder caméra à la même hauteur si possible.
- Marquer 3–5 objets **générés** au début (toit japonais, couleur d'une façade, arbre, enseigne).
- À la réapparition : ces éléments correspondent-ils aux précédents? Mesurer taux de réidentification/continuité par annotateurs; signaler changements.
- Noter changements soudains entre frames adjacentes (flicker), sauts de perspective, nouvelles constructions.
- Deux conditions : StreamV2V/Scope baseline et, seulement si nécessaire, mémoire explicite/hypothèse H2.

### E3 — « Je marche en visio puis je révèle »
Appel réel via OBS Virtual Camera, éventuellement source caméra smartphone sur LAN.
- Marcher en changeant le cadrage au moins 15 secondes, parler normalement, voir si la vidéo suit le mouvement sans gel ni décalage excessif.
- Le même interlocuteur doit voir un environnement japonais puis la caméra originale **dans le même appel**.
- Mesurer si la bascule est visible en moins de 100ms dans la **sortie locale**, et l'impact de l'encodage/réseau à distance à part.
- Déroulement reproductible, problèmes de connectivité, budget et VRAM notés.

## Fiche de relevé
```text
Date / version commit / machine GPU VRAM / modèle pipeline / résolution / FPS cible :
Vidéo réelle produite : oui/non; contexte de permission caméra :
Durée du flux; images générées/s; p95 intervalle; latence caméra→sortie p95 :
Rotation 360° : objets identifiables et stables N/N; artefacts/flicker :
Retours sur objets déjà vus : réussite N/N :
Déplacement à pied : descriptif, gels, dérive :
Révélation : N=20 bascules, p95 ms (sortie locale + distant si mesuré) :
OBS Virtual Camera / logiciel visio / réception par interlocuteur :
Coût API/cloud ou coût local; limitations, erreurs :
Verdict : stop/go/risque ouvert, preuves liées sans publier personnes/lieux privés.
```

## Définitions
- **Persistance court terme** : objets stables entre frames consécutives ou à travers brève occultation.
- **Persistance après tour complet (loop closure)** : objet sorti du champ et revenu identique et placé de manière plausible.
- **Fidélité** : objets générés identiques à ceux du monde réel. Optionnel pour la réussite, sauf que la caméra doit rester réactive.
- **Cohérence non démontrée** : un modèle produit 15 fps mais remplace les bâtiments chaque seconde, c'est un **échec**, même si chaque frame est jolie.

Aucun benchmark réel n'a été exécuté par ChatGPT sur le pipeline Scope : tests automatisés uniquement.
