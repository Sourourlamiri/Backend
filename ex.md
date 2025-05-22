# RecruitEase API: Certification, Compétence, Formation, Expérience

## Table of Contents

- [Certification](#certification)
- [Compétence](#compétence)
- [Formation](#formation)
- [Expérience](#expérience)

---

## Certification

### Endpoints

- **Create Certification**
  - `POST /Certification`
- **Get All Certifications**
  - `GET /Certification`
- **Get Certification by ID**
  - `GET /Certification/:id`
- **Update Certification**
  - `PUT /Certification/:id`
- **Delete Certification**
  - `DELETE /Certification/:id`

### Request Body

#### Create/Update

```json
{
  "nomCertification": "AWS Certified Solutions Architect",
  "date_Dobtention": "2023-05-10T00:00:00.000Z",
  "Candidat": "candidateObjectId"
}
```

### Example Response

```json
{
  "message": "La certification a été créée avec succès!",
  "newCertification": {
    "_id": "certificationObjectId",
    "nomCertification": "AWS Certified Solutions Architect",
    "date_Dobtention": "2023-05-10T00:00:00.000Z",
    "Candidat": "candidateObjectId"
  }
}
```

---

## Compétence

### Endpoints

- **Create Compétence**
  - `POST /Competence`
- **Get All Compétences**
  - `GET /Competence`
- **Get Compétence by ID**
  - `GET /Competence/:id`
- **Update Compétence**
  - `PUT /Competence/:id`
- **Delete Compétence**
  - `DELETE /Competence/:id`

### Request Body

#### Create/Update

```json
{
  "nomCompétence": "JavaScript",
  "niveau": "Avancé",
  "Candidat": "candidateObjectId"
}
```

### Example Response

```json
{
  "message": "Compétence a été créée avec succès!",
  "newCompetence": {
    "_id": "competenceObjectId",
    "nomCompétence": "JavaScript",
    "niveau": "Avancé",
    "Candidat": "candidateObjectId"
  }
}
```

---

## Formation

### Endpoints

- **Create Formation**
  - `POST /Formation`
- **Get All Formations**
  - `GET /Formation`
- **Get Formation by ID**
  - `GET /Formation/:id`
- **Update Formation**
  - `PUT /Formation/:id`
- **Delete Formation**
  - `DELETE /Formation/:id`

### Request Body

#### Create/Update

```json
{
  "nomFormation": "Master in Computer Science",
  "date_obtention": "2022-07-01T00:00:00.000Z",
  "etablissement": "MIT",
  "description": "Specialized in Artificial Intelligence",
  "Candidat": "candidateObjectId"
}
```

### Example Response

```json
{
  "message": "Formation a été ecrit avec succée!",
  "newFormation": {
    "_id": "formationObjectId",
    "nomFormation": "Master in Computer Science",
    "date_obtention": "2022-07-01T00:00:00.000Z",
    "etablissement": "MIT",
    "description": "Specialized in Artificial Intelligence",
    "Candidat": "candidateObjectId"
  }
}
```

---

## Expérience

### Endpoints

- **Create Expérience**
  - `POST /Experience`
- **Get All Expériences**
  - `GET /Experience`
- **Get Expérience by ID**
  - `GET /Experience/:id`
- **Update Expérience**
  - `PUT /Experience/:id`
- **Delete Expérience**
  - `DELETE /Experience/:id`

### Request Body

#### Create/Update

```json
{
  "nomExpérience": "Software Engineer",
  "date_Debut": "2021-01-01T00:00:00.000Z",
  "date_Fin": "2023-01-01T00:00:00.000Z",
  "entreprise": "Google",
  "description": "Worked on scalable backend systems.",
  "Candidat": "candidateObjectId"
}
```

### Example Response

```json
{
  "message": "Expérience a été créée avec succès!",
  "newExpérience": {
    "_id": "experienceObjectId",
    "nomExpérience": "Software Engineer",
    "date_Debut": "2021-01-01T00:00:00.000Z",
    "date_Fin": "2023-01-01T00:00:00.000Z",
    "entreprise": "Google",
    "description": "Worked on scalable backend systems.",
    "Candidat": "candidateObjectId"
  }
}
```

---

## Notes

- All endpoints require valid ObjectId references for the `Candidat` field.
- Dates must be in ISO 8601 format.
- All fields marked as required must be present in the request body.
- Error responses will include a `message` and may include an `error` field with more details. 