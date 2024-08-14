# Survey App

## Description

Survey App est une application JavaScript simple permettant de gérer les fiches d'enquête de satisfaction des clients. L'application utilise une base de données MongoDB pour stocker les données et permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur ces fiches.

## Modules

### `fichierModule`

#### `insertFile(fileData)`
Insère un nouveau fichier dans la collection `fichiers`.

- **Paramètre :** `fileData` - Données du fichier à insérer.

#### `getAllFiles()`
Récupère tous les fichiers de la collection `fichiers`.

- **Retourne :** Liste de tous les fichiers.

#### `updateFile(fileId, updateData)`
Met à jour un fichier existant dans la collection `fichiers`.

- **Paramètres :**
  - `fileId` - Identifiant du fichier à mettre à jour.
  - `updateData` - Données à mettre à jour.

#### `deleteFile(fileId)`
Supprime un fichier de la collection `fichiers`.

- **Paramètre :** `fileId` - Identifiant du fichier à supprimer.

### `questionModule`

#### `insertQuestion(fileName, questionData)`
Insère une nouvelle question dans la collection `questions`.

- **Paramètres :**
  - `fileName` - Nom du fichier associé.
  - `questionData` - Données de la question à insérer (inclut `questionId`).

#### `getAllQuestions()`
Récupère toutes les questions de la collection `questions`.

- **Retourne :** Liste de toutes les questions.

#### `updateQuestion(questionId, newQuestionData)`
Met à jour une question existante dans la collection `questions`.

- **Paramètres :**
  - `questionId` - Identifiant de la question à mettre à jour.
  - `newQuestionData` - Données mises à jour de la question.

#### `deleteQuestion(questionId)`
Supprime une question de la collection `questions`.

- **Paramètre :** `questionId` - Identifiant de la question à supprimer.

### `reponseModule`

#### `insertReponse(questionId, reponseData)`
Insère une nouvelle réponse pour une question dans la collection `reponses`.

- **Paramètres :**
  - `questionId` - Identifiant de la question associée.
  - `reponseData` - Données de la réponse à insérer (inclut `reponseId`).

#### `getReponsesByQuestionId(questionId)`
Récupère toutes les réponses pour une question spécifique.

- **Paramètre :** `questionId` - Identifiant de la question.
- **Retourne :** Liste des réponses pour la question spécifiée.

#### `updateReponse(reponseId, newReponseData)`
Met à jour une réponse existante dans la collection `reponses`.

- **Paramètres :**
  - `reponseId` - Identifiant de la réponse à mettre à jour.
  - `newReponseData` - Données mises à jour de la réponse.

#### `deleteReponse(reponseId)`
Supprime une réponse de la collection `reponses`.

- **Paramètre :** `reponseId` - Identifiant de la réponse à supprimer.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 12 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (version 4.0 ou supérieure)

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. **Clonez le repository :**

    ```bash
    git clone <URL_DU_REPOSITORY>
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