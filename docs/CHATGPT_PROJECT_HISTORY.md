# Journal du contexte ChatGPT — goldaj/japan-architecture-ar

**Démarré le 2026-10-26 ; couverture partielle, résumés non verbatim.** La transcription intégrale des échanges passés n'a pas été retrouvée. Pas d'heure exacte attestée.

## 2026-10-26 — Origine et sortie de l'incubateur

**Assistant (résumé reconstruit, non verbatim) :** L'utilisateur a souhaité un filtre japanisant pour une scène réelle, avec maintien du décor pendant le déplacement et bascule immédiate entre caméra réelle et transformation. Un exemple de photo et des demandes de cible de production ont été discutés. Le dépôt autonome existait lors de la vérification du 26 octobre 2026 ; le cadrage de l'incubateur a été transféré ici. Aucun contenu visuel fourni par l'utilisateur n'est copié dans ce dépôt.

**Passation :** la fiche conceptuelle complète est `docs/PROJECT_INTENT_FROM_INCUBATOR.md`. L'ancien fichier de `goldaj/projects-incubator` a été retiré de l'index, mais demeure dans l'historique Git. Ne pas relancer un second projet concurrent dans l'incubateur.

**État du transfert :** documentation contextuelle uniquement. Aucun benchmark, preuve de faisabilité, conformité des SDK, fonctionnalité opérationnelle ou test ne découle automatiquement de cette passation. Consulter l'état du code actuel avant de déclarer un avancement.

## Historique ultérieur
Ajouter les nouvelles demandes et décisions avec leur rôle, une date sourcée quand elle est connue et le niveau de fidélité de chaque citation ; ne jamais fabriquer de messages manquants.

## Intervention 2026-10-29

Utilisateur (verbatim, heure non garantie) : « Je ne te demande pas de créer une tâche planifiée qui continue chaque jour. Je te demande de continuer maintenant en boucle et de ne pas t'arrêter sur juste 3 améliorations alors qu'il y a plus de 40 repo et plusieurs améliorations possibles par repo ».

Assistant (résumé non verbatim) : développement d'une première baseline vidéo interactive dans un navigateur (caméra locale, overlay 2D, suivi par corrélation, bascule vers image réelle, mesures FPS et traitement JS, rapport JSON). Il s'agit de recherche exploratoire et non d'un modèle IA générant une rue japonaise. Voir `docs/CAMERA_BASELINE.md` pour les limites, tests et travaux suivants.
