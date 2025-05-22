# RecruitEase API: Candidature Module

## Introduction

Le module Candidature permet de gérer les candidatures des utilisateurs aux offres d'emploi. Une candidature représente la demande d'un candidat pour un poste spécifique et peut avoir un des trois statuts : acceptée, rejetée, ou en attente. Toute nouvelle candidature est automatiquement créée avec le statut "en attente", qui peut être modifié ultérieurement.

## Table des Matières

- [Endpoints](#endpoints)
- [Structure de Données](#structure-de-données)
- [Créer une Candidature](#créer-une-candidature)
- [Lister les Candidatures](#lister-les-candidatures)
- [Obtenir une Candidature par ID](#obtenir-une-candidature-par-id)
- [Mettre à Jour une Candidature](#mettre-à-jour-une-candidature)
- [Mettre à Jour le Statut d'une Candidature](#mettre-à-jour-le-statut-dune-candidature)
- [Statistiques](#statistiques)

## Endpoints

| Méthode | URL | Description |
|---------|-----|-------------|
| POST | `/Candidature` | Créer une nouvelle candidature |
| GET | `/Candidature` | Lister toutes les candidatures |
| GET | `/Candidature/:id` | Obtenir une candidature par son ID |
| PUT | `/Candidature/:id` | Mettre à jour une candidature |
| PATCH | `/Candidature/:id/statut` | Mettre à jour uniquement le statut d'une candidature |
| GET | `/Candidature/stat/total` | Obtenir le nombre total de candidatures |
| GET | `/Candidature/stat/statut` | Obtenir les statistiques des candidatures par statut et recruteur |
| GET | `/Candidature/stat/par-statut` | Obtenir les statistiques globales des candidatures par statut |
| GET | `/Candidature/stat/par-adresse` | Obtenir la répartition des candidats par adresse |

## Structure de Données

### Candidature

```json
{
  "_id": "objectId",
  "Cv": "nom_du_fichier.pdf",
  "statut": "en attente",
  "Offre": ["objectId"],
  "Candidat": ["objectId"]
}
```

- **Cv**: Nom du fichier CV téléchargé
- **statut**: État de la candidature (acceptée, rejetée, ou en attente)
- **Offre**: Référence à l'offre d'emploi
- **Candidat**: Référence au candidat

## Créer une Candidature

**Endpoint:** `POST /Candidature`

Cette requête doit être envoyée avec `multipart/form-data` pour permettre le téléchargement du fichier CV.

### Champs Requis

- **file**: Fichier CV du candidat (PDF, DOCX, etc.)
- **Offre**: ID de l'offre d'emploi
- **Candidat**: ID du candidat
- **statut**: Le statut est automatiquement défini à "en attente" lors de la création, même si une autre valeur est fournie

### Important

Toute nouvelle candidature est créée avec le statut "en attente". Ce champ ne peut être modifié qu'après la création de la candidature, via les endpoints dédiés à la mise à jour.

### Exemple de Requête

```
POST /Candidature
Content-Type: multipart/form-data

file: [Fichier CV]
Offre: 6507c5de8f89bd346487ef3a
Candidat: 6507c5de8f89bd346487ef3b
```

### Exemple de Réponse

```json
{
  "message": "Candidature a été ecrite avec succée!",
  "newCandidature": {
    "_id": "6507c5de8f89bd346487ef3c",
    "Cv": "1695300894567.pdf",
    "statut": "en attente",
    "Offre": ["6507c5de8f89bd346487ef3a"],
    "Candidat": ["6507c5de8f89bd346487ef3b"]
  }
}
```

## Lister les Candidatures

**Endpoint:** `GET /Candidature`

### Exemple de Réponse

```json
{
  "message": "Liste de Candidatures!",
  "list": [
    {
      "_id": "6507c5de8f89bd346487ef3c",
      "Cv": "1695300894567.pdf",
      "statut": "en attente",
      "Offre": ["6507c5de8f89bd346487ef3a"],
      "Candidat": ["6507c5de8f89bd346487ef3b"]
    },
    // autres candidatures...
  ]
}
```

## Obtenir une Candidature par ID

**Endpoint:** `GET /Candidature/:id`

### Exemple de Réponse

```json
{
  "message": "candidature avec '6507c5de8f89bd346487ef3c'a été trouvée!",
  "getCandidature": {
    "_id": "6507c5de8f89bd346487ef3c",
    "Cv": "1695300894567.pdf",
    "statut": "en attente",
    "Offre": ["6507c5de8f89bd346487ef3a"],
    "Candidat": ["6507c5de8f89bd346487ef3b"]
  }
}
```

## Mettre à Jour une Candidature

**Endpoint:** `PUT /Candidature/:id`

### Corps de Requête

```json
{
  "statut": "acceptée"
}
```

### Exemple de Réponse

```json
{
  "message": "candidature a été mise à jour!",
  "CandidatureUpdate": {
    "_id": "6507c5de8f89bd346487ef3c",
    "Cv": "1695300894567.pdf",
    "statut": "acceptée",
    "Offre": ["6507c5de8f89bd346487ef3a"],
    "Candidat": ["6507c5de8f89bd346487ef3b"]
  }
}
```

## Mettre à Jour le Statut d'une Candidature

**Endpoint:** `PATCH /Candidature/:id/statut`

### Corps de Requête

```json
{
  "statut": "acceptée"
}
```

Le statut peut être:
- "acceptée"
- "rejetée"
- "en attente"

### Exemple de Réponse

```json
{
  "message": "Statut de la candidature mis à jour avec succès!",
  "candidatureUpdate": {
    "_id": "6507c5de8f89bd346487ef3c",
    "Cv": "1695300894567.pdf",
    "statut": "acceptée",
    "Offre": ["6507c5de8f89bd346487ef3a"],
    "Candidat": ["6507c5de8f89bd346487ef3b"]
  }
}
```

## Statistiques

### Nombre Total de Candidatures

**Endpoint:** `GET /Candidature/stat/total`

#### Exemple de Réponse

```json
{
  "total": 42
}
```

### Statistiques par Statut et Recruteur

**Endpoint:** `GET /Candidature/stat/statut`

#### Exemple de Réponse

```json
{
  "message": "Statistiques des candidatures par statut",
  "results": [
    {
      "recruteur": {
        "Nom": "John Doe"
      },
      "acceptees": 5,
      "rejetees": 3,
      "enAttente": 10
    },
    // autres recruteurs...
  ]
}
```

### Statistiques Globales par Statut

**Endpoint:** `GET /Candidature/stat/par-statut`

#### Exemple de Réponse

```json
{
  "message": "Répartition des candidatures par statut",
  "stats": {
    "acceptée": 15,
    "rejetée": 8,
    "en attente": 19
  }
}
```

### Répartition des Candidats par Adresse

**Endpoint:** `GET /Candidature/stat/par-adresse`

#### Exemple de Réponse

```json
{
  "Paris": 12,
  "Lyon": 5,
  "Marseille": 8,
  "Lille": 3
}
```

## Notes

- Le téléchargement du CV est obligatoire lors de la création d'une candidature.
- Les fichiers CV sont stockés dans le dossier `/cv` du serveur.
- **Important**: Les nouvelles candidatures sont obligatoirement créées avec le statut "en attente". Ce statut ne peut être modifié qu'après la création initiale.
- Seules les valeurs "acceptée", "rejetée" et "en attente" sont acceptées pour le champ statut.
- Lors de la création d'une candidature, les relations avec l'offre et le candidat sont automatiquement établies. 