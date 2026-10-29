# Première tranche technique : caméra / suivi / bascule (2026-10-29)

Le repo contenait uniquement la documentation de vision produit. Cette branche introduit un **premier prototype expérimental exécutable** dans le navigateur, sans serveur distant ni poids d'IA.

## Lancer
À la racine, `python -m http.server 8000`, puis `http://localhost:8000/web/`. La caméra nécessite HTTPS ou localhost, un navigateur compatible, et l'autorisation explicite de l'utilisateur. Les vidéos sont conservées **uniquement dans la mémoire du navigateur**.

Modes : `Décor réel` (aucun effet), `Overlay fixe` (décor 2D inspiré d'une architecture japonaise mais ancré à l'écran), `Overlay suivi` (bloc texturé proche du centre suivi entre les frames, l'overlay est déplacé selon le vecteur local). La bascule n'utilise aucune transition et s'applique à l'image suivante. `Arrêter caméra` libère ses pistes.

Le script affiche FPS observés, temps de rendu/traitement JS p95, et taux de suivi accepté. Export JSON contenant uniquement des métriques. **Aucune vidéo ni visage n'est enregistré**.

## Limites scientifiques, absolument essentielles
- **Ce n'est PAS une transformation générative IA**, pas une reconstruction 3D, pas du SLAM, pas de vrai remplacement de façades, pas de segmentation des personnes.
- Le suivi est un prototype de corrélation de petite région texturée dans une image sous-échantillonnée ; il peut échouer lors d'une rotation, d'un changement de focale/lumière ou d'une occlusion.
- Le temps de traitement JavaScript et le FPS sont observables localement. L'interface ne mesure pas la vraie latence caméra-capteur jusqu'à l'affichage ni la stabilité sur une trajectoire 3D.
- La surcouche ne suit pas un mur réel ou un plan géométrique reconnu : la cible du tracker est un patch initial au centre.
- L'activation caméra est strictement locale, sans envoi réseau par l'app (mais le navigateur sert ses propres ressources selon l'hébergement).

## Mesures à conduire avec consentement
Tester sur plan fixe, marche latérale, rotation et occultations ; comparer mode fixe et suivi. Enregistrer un protocole avec téléphone, FPS, durée, échecs de suivi et notes qualitatives. Ne pas utiliser des vidéos de personnes sans consentement.

## Passation Codex
1. Lire `AGENTS.md`, `docs/PROJECT_INTENT_FROM_INCUBATOR.md` et ce document, puis lancer les tests `node --test tests/*.test.cjs` (Node 18+). CI exécute aussi l'analyse de syntaxe.
2. Valider le prototype sur téléphone avec caméra réelle ; obtenir une baseline de FPS/rendu, puis améliorer la robustesse en mesurant toujours les régressions.
3. Comparer ensuite la piste 2D (segmentation, suivi optique stable) à l'approche reconstruction 3D/SLAM et à la génération vidéo. Ne choisir aucun fournisseur IA sans benchmark de latence et faisabilité.
4. Avant toute visio, assurer l'étiquetage de la transformation et le consentement des personnes filmées.
5. Ne jamais transformer ce prototype en prétendue démo photoréaliste : les objectifs produit sont beaucoup plus larges que le résultat actuel.
