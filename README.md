# Survey App

## Description

Survey App est une application JavaScript simple permettant de gérer les fiches d'enquête de satisfaction des clients. L'application utilise une base de données MongoDB pour stocker les données et permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur ces fiches.

## Documentation des Fonctions


### `fichierModule`

#### `insertFile({
          "name": "string",
          "description": "string",
          "createdAt": "ISODate",
          "createdBy": {
            "employeeName": "string",
            "employeeRole": "string"
          })`
- **Description :** Insère un nouveau fichier dans la collection `fichiers`.
- **Paramètre :** : la fonction prend en parametre un object
 

#### `getAllFiles()`
- **Description :** Récupère tous les fichiers de la collection `fichiers`.
- **Retourne :** 
  - `Array` - la fonction retourne un table de Liste de tous les fichiers.
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

#### `updateFile( fileName: "string",   
{
        "name": "string",
        "description": "string",
        "createdAt": "ISODate",
        "createdBy": {
          "employeeName": "string",
          "employeeRole": "string"
        }
      } )`
- **Description :** Met à jour un fichier existant dans la collection `fichiers`.
- **Paramètres :** 
  - `filename` : nom du fichier à mettre à jour.
  - `updateData`: Données à mettre à jour.

#### `deleteFile(filename:"string")`
- **Description :** Supprime un fichier de la collection `fichiers`.
- **Paramètre :** 
  - `filename` Identifiant du fichier à supprimer.

### `questionModule`

#### `insertQuestion("fileName":"String", {
      "questionId": "number",
      "title": "string",
      "type": "string",
      "options": {
        "minValue": "number",
        "maxValue": "number",
        "step": "number"
      })`
- **Description :** Insère une nouvelle question dans la collection `questions`.
- **Paramètres :** 
  - `fileName`  Nom du fichier associé.
  - `questionData` Données de la question à insérer, y compris `questionId` .
    

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
          "step": "number",
          "fileName":"String"
        }
      }
    ]
    ```

#### `updateQuestion (questionId:"string",  {
        "questionId": "number",
        "title": "string",
        "type": "string",
        "options": {
          "minValue": "number",
          "maxValue": "number",
          "step": "number",}})`

- **Description :** Met à jour une question existante dans la collection `questions`.
- **Paramètres :** 
  - `questionId` Identifiant de la question à mettre à jour.
  - `newQuestionData` Données mises à jour de la question qui sont des objets.

#### `deleteQuestion(questionId: Number)`
- **Description :** Supprime une question de la collection `questions`.
- **Paramètre :** 
  - `questionId` Identifiant de la question à supprimer.

### `reponseModule`

#### `insertReponse(questionId:number, {
      "reponseId": "number",
      "title": "string"
    })`
- **Description :** Insère une nouvelle réponse pour une question dans la collection `reponses`.
- **Paramètres :** 
  - `questionId`  Identifiant de la question associée.
  - `reponseData` Données de la réponse à insérer, y compris `reponseId` qui est un Objet.
   

#### `getReponsesByQuestionId(questionId:number)`
- **Description :** Récupère toutes les réponses pour une question spécifique.
- **Paramètre :** 
  - `questionId` Identifiant de la question.
- **Retourne :** 
  - `Array` - Liste des réponses pour la question spécifiée.
  {
    "reponseId":"number" ,
    title: "string",
    "questionId":"number"
}


#### `updateReponse(reponseId:number, {
            title: "Satisfait"
        };)`
- **Description :** Met à jour une réponse existante dans la collection `reponses`.
- **Paramètres :** 
  - `reponseId`  Identifiant de la réponse à mettre à jour.
  - `newReponseData` Données mises à jour de la réponse qui est un Objet.

#### `deleteReponse(reponseId:number)`
- **Description :** Supprime une réponse de la collection `reponses`.
- **Paramètre :** 
  - `reponseId`  Identifiant de la réponse à supprimer.

### `index`

- **Description :** - est l'entrée principale de l'application. Il contient une fonction principale main qui englobe l'appel de toutes les fonctions des différents modules


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
    cd abc-survey-app
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

## Auteur

[Zoubeir Ba](https://github.com/Zoubeir7)

