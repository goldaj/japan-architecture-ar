# Architecture : deux prototypes séparés

## POC IA prioritaire (PR distincte)
```text
PC utilisateur : navigateur (photo + paramètres + consentement)
    │ POST multipart sur 127.0.0.1 uniquement
    ▼
Node.js serveur local (clé API depuis OPENAI_API_KEY)
    │ POST /v1/images/edits, modèle Flare ou Sunburst
    ▼
OpenAI API (photo envoyée explicitement)
    │ PNG généré
    ▼
Navigateur : avant / après / télécharger
```

Dossiers `ai/`, `src/ai/`, `tools/ai-photo-server.mjs`, `tests/ai-*.test.mjs`.

- Aucun stockage serveur intentionnel; photo présente en mémoire pendant la requête; aucune base de données.
- Pas de client OpenAI exécuté côté navigateur; clé absente du payload navigateur et de Git.
- Endpoint local unique `/api/edit`; serveur écoute `127.0.0.1:8765`; Origins tiers refusées; upload limité à 12 Mo; confirmation à la fois en UI et en header.
- Qualité basse/moyenne/haute; PNG en sortie; clés de modèles sur allowlist pour éviter l'injection de modèles inattendus.

## Ancien POC procédural (PR #1, non fusionnée)
`web/` + `src/core/` : façade quadrilatérale et motifs Canvas. Le modèle de scène JSON peut servir ultérieurement pour guider des zones/masques, mais ne doit plus être considéré comme fondement visuel principal.

## Conception vidéo et temps réel
Voir `VIDEO_ROADMAP.md`. Première piste = modèle video-to-video cohérent sur clip, **pas** boucle où l'on applique l'API photo indépendamment à 30 images/s.

## Risques
Confidentialité des photos envoyées, crédits API, règles d'usage fournisseur, latence, fidèle préservation du bâti, erreurs 401/403/429, absence de tests réels, modèle cloud évolutif.
