# Survey App

## Description

Survey App est une application JavaScript simple permettant de gérer les fiches d'enquête de satisfaction des clients. L'application utilise une base de données MongoDB pour stocker les données et permet d'effectuer des opérations CRUD (Create, Read, Update, Delete) sur ces fichiers.



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

## Documentation des Fonctions

 
- **surveyModule.js :** Ce module permet de gérer les opérations **CRUD** de la collection **Surveys**. Il est composé des fonctions suivantes :

  1. `ajoutSurvey({ surveyId:int ,name: string, description: string, createdAt: date}, createdBy:{employeeName: string, employeeRole: string}})` : pour ajouter un document dans la collection de **surveys**.
  2. `listerSurvey()` : pour afficher tous les documents de la collection de **surveys**.
  3. `modifierSurvey(surveyId: int ,{name: string, description: string, createdAt: date}, createdBy:{employeeName: string, employeeRole: string}}) ` : pour modifier un document de la collection de **surveys**.
  4. `supprimerSurvey(surveyId: int )` : pour supprimer un document de la collection de **surveys**.


- **questionModule.js :** Ce module permet de gérer les opérations **CRUD** de la collection **questions**. Il est composé des fonctions suivantes :

  1. `ajouterQuestion({questionId: int, surveyId: int, title: string, type: string, options:{minValue:int, maxValue:int, step:int}})` : pour ajouter un document dans la collection de **questions**.
  2. `listerQuestions()` : pour afficher tous les documents dans la collection de **questions**.
  3. `modifierQuestion(questionId: int, {title: string, type: string, options:{minValue:int, maxValue:int, step:int}})` : pour modifier un document dans la collection de **questions**.
  4. `supprimerQuestion(questionId: int)` : pour supprimer un document dans la collection de **questions**.


- **ReponseModule.js :** Ce module permet de gérer les opérations **CRUD** de la collection **reponses**. Il est composé des fonctions suivantes :


  1. ` ajouterReponse({ questionId: int,reponseId: int, title: string})` : Pour ajouter un document dans la collection de **reponses**.
  2. `listerReponses()` : Pour afficher tous les documents dans la collection de **reponses**.
  3. `modifierReponse(reponseId: int, {title: string})` : Pour modifier un document dans la collection de **reponses**.
  4. `supprimerReponse(reponseId: int,)` : Pour supprimer un document dans la collection de **reponses**.

`  Il est important de noté que les fonctions ne peuvent prendre à l'entré qu'un seul document à la fois.`


- **index.js :** est l'entrée principale de l'application. Il contient une fonction principale **main** qui englobe l'appel de toutes les fonctions des différents modules.


## Auteur

[Zoubeir Ba](https://github.com/Zoubeir7)

