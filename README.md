# Survey App

## Description

Survey App est une application JavaScript simple permettant de gérer les fiches d'enquête de satisfaction des clients. L'application utilise une base de données MongoDB pour stocker les données et permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur ces fiches.

## Documentation des Fonctions


### `fichierModule`

#### `insertFile(fileData)`
- **Description :** Insère un nouveau fichier dans la collection `fichiers`.
- **Paramètre :** 
  - `fileData` (Object) - Les données du fichier à insérer.
    ```json
    {
      "fichiers": [
        {
          "name": "string",
          "description": "string",
          "createdAt": "ISODate",
          "createdBy": {
            "employeeName": "string",
            "employeeRole": "string"
          }
        }
      ]
    }
    ```

#### `getAllFiles()`
- **Description :** Récupère tous les fichiers de la collection `fichiers`.
- **Retourne :** 
  - `Array` - Liste de tous les fichiers.
    ```json
    [
      {
        "name": "string",
        "description": "string",
        "createdAt": "ISODate",
        "createdBy": {
          "employeeName": "string",
          "employeeRole": "string"
        }
      }
    ]
    ```

#### `updateFile(fileId, updateData)`
- **Description :** Met à jour un fichier existant dans la collection `fichiers`.
- **Paramètres :** 
  - `fileId` (String) - Identifiant du fichier à mettre à jour.
  - `updateData` (Object) - Données à mettre à jour.

#### `deleteFile(fileId)`
- **Description :** Supprime un fichier de la collection `fichiers`.
- **Paramètre :** 
  - `fileId` (String) - Identifiant du fichier à supprimer.

### `questionModule`

#### `insertQuestion(fileName, questionData)`
- **Description :** Insère une nouvelle question dans la collection `questions`.
- **Paramètres :** 
  - `fileName` (String) - Nom du fichier associé.
  - `questionData` (Object) - Données de la question à insérer, y compris `questionId`.
    ```json
    {
      "questionId": "number",
      "title": "string",
      "type": "string",
      "options": {
        "minValue": "number",
        "maxValue": "number",
        "step": "number"
      }
    }
    ```

#### `getAllQuestions()`
- **Description :** Récupère toutes les questions de la collection `questions`.
- **Retourne :** 
  - `Array` - Liste de toutes les questions.
    ```json
    [
      {
        "questionId": "number",
        "title": "string",
        "type": "string",
        "options": {
          "minValue": "number",
          "maxValue": "number",
          "step": "number"
        }
      }
    ]
    ```

#### `updateQuestion(questionId, newQuestionData)`
- **Description :** Met à jour une question existante dans la collection `questions`.
- **Paramètres :** 
  - `questionId` (Number) - Identifiant de la question à mettre à jour.
  - `newQuestionData` (Object) - Données mises à jour de la question.

#### `deleteQuestion(questionId)`
- **Description :** Supprime une question de la collection `questions`.
- **Paramètre :** 
  - `questionId` (Number) - Identifiant de la question à supprimer.

### `reponseModule`

#### `insertReponse(questionId, reponseData)`
- **Description :** Insère une nouvelle réponse pour une question dans la collection `reponses`.
- **Paramètres :** 
  - `questionId` (Number) - Identifiant de la question associée.
  - `reponseData` (Object) - Données de la réponse à insérer, y compris `reponseId`.
    ```json
    {
      "reponseId": "number",
      "title": "string"
    }
    ```

#### `getReponsesByQuestionId(questionId)`
- **Description :** Récupère toutes les réponses pour une question spécifique.
- **Paramètre :** 
  - `questionId` (Number) - Identifiant de la question.
- **Retourne :** 
  - `Array` - Liste des réponses pour la question spécifiée.

#### `updateReponse(reponseId, newReponseData)`
- **Description :** Met à jour une réponse existante dans la collection `reponses`.
- **Paramètres :** 
  - `reponseId` (Number) - Identifiant de la réponse à mettre à jour.
  - `newReponseData` (Object) - Données mises à jour de la réponse.

#### `deleteReponse(reponseId)`
- **Description :** Supprime une réponse de la collection `reponses`.
- **Paramètre :** 
  - `reponseId` (Number) - Identifiant de la réponse à supprimer.

### `index`
- **Description :**est l'entrée principale de l'application. Il contient une fonction principale main qui englobe l'appel de toutes les fonctions des différents modules

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 4.0 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

    ```bash
    git clone https://github.com/Zoubeir7/abc-survey-app.git
    ```

2. **Accédez au dossier du projet :**

    ```bash
    cd survey-app
    ```

3. **Installez les dépendances :**

    ```bash
    npm install
    ```

4. **Configurez la base de données :**

    - Assurez-vous que MongoDB est en cours d'exécution sur votre machine locale.
    - Mettez les paramètres de connexion dans `config/database.js`.

## Utilisation

Pour démarrer l'application, exécutez la commande suivante :

```bash
npm start
```

## Authors

Zoubeir Ba
