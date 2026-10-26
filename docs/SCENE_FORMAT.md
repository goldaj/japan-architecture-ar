# Contrat de sauvegarde des scènes (v1)

## Pourquoi ce format
Une scène représente des annotations de façades et les réglages de leur habillage **sur une photographie**. Elle n'inclut pas les octets de la photographie. Les coordonnées sont relatives (0 à 1); le format peut donc être réutilisé à des résolutions d'affichage différentes.

## Exemple schématique (hash fictif, pas un fichier personnel)
```json
{
  "type": "japan-architecture-ar/scene",
  "version": 1,
  "image": {
    "name": "example.jpg",
    "size": 10000,
    "width": 1920,
    "height": 1080,
    "sha256": "abababababababababababababababababababababababababababababababab"
  },
  "facades": [
    {
      "id": 1,
      "quad": [
        {"x": 0.1, "y": 0.2},
        {"x": 0.8, "y": 0.2},
        {"x": 0.8, "y": 0.85},
        {"x": 0.1, "y": 0.85}
      ],
      "style": "machiya",
      "opacity": 0.7
    }
  ]
}
```

## Sémantique
- `type` et `version` identifient le format, avec rejet de versions futures incompatibles.
- `image` : nom local de photo, taille en octets, dimensions originales, SHA-256 hexadécimal de ses **octets originaux**, calculé avec Web Crypto sur `localhost` / HTTPS.
- `facades` : zéro à 24 polygones convexes, quatre coins ordonnés haut-gauche, haut-droit, bas-droit, bas-gauche **dans la scène**, identifiants uniques, style parmi les clés autorisées et opacité dans [0,1].
- L'ordre des façades détermine l'ordre de dessin : la dernière est au-dessus de la précédente en zone de chevauchement.
- Un projet importé ne remplace la scène ouverte que si son format, chaque géométrie, son empreinte et ses dimensions/tailles de photo sont valides.
- Import JSON limité à 100 000 caractères pour éviter la lecture incontrôlée de fichiers énormes.

## Politique de compatibilité / confidentialité
- Pas de migration automatique V1 -> future V2 : ajouter une migration versionnée avec tests quand le schéma évoluera.
- Le fichier JSON peut révéler un nom de fichier et l'empreinte d'une photo. **Ne pas committer une vraie scène personnelle dans ce dépôt public.**
- Le hash prouve seulement qu'on retrouve les mêmes octets, pas un droit de reproduction ou une légitimité de partage.
- Ce format ne contient **ni** matrice caméra, **ni** profondeur, **ni** ancrage AR. L'export du calque PNG ne résout pas le suivi spatial.

## Tests restants hors CI
- Modifier une façade, sauvegarder, réimporter après rechargement de la même photo.
- Réimporter sur une photo différente : refus attendu.
- Ouvrir un JSON invalide, trop gros, sans signature ou avec façades croisées : refus sans corruption.
- Vérifier sur téléphone et navigateur le geste de déplacement des coins et l'export alpha.
