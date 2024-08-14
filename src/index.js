const { connectToDatabase, client } = require('./config/database');
const { insertFile, getAllFiles, updateFile, deleteFile } = require('./fichierModule');
const { insertQuestion, getAllQuestions, updateQuestion, deleteQuestion } = require('./questionModule');
const { insertReponse, getReponsesByQuestionId, updateReponse, deleteReponse } = require('./reponseModule');


async function main() {
    try {

        const db = await connectToDatabase();


        console.log('Opérations sur la base de données peuvent être effectuées ici.');


    } catch (error) {
        console.error('Erreur lors de l\'exécution du script principal', error);
    }
}


//Exemple de données pour le fichier
const fileData = {
    fichiers: [
        {
            name: "Enquête de Satisfaction 001",
            description: "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
            createdAt: "2024-07-25T08:00:00Z",
            createdBy: {
                employeeName: "Jane Smith",
                employeeRole: "Responsable du service client"
            }
        }
    ]
};

// Fonction pour tester les opérations CRUD pour le module fichiherOperations

async function testFileOperations() {
    try {
        // Insérer le fichier
        console.log("Insertion du fichier...");
        await insertFile(fileData);

        // Afficher tous les fichiers
        console.log("Affichage des fichiers...");
        const files = await getAllFiles();
        console.log(JSON.stringify(files, null, 2));


        //Mettre à jour le fichier
        console.log("Mise à jour du fichier...");
        const updatedData = {
            "fichiers.0.description": "Description mise à jour de l'enquête."
        };
        await updateFile("a", "ba");


        //Supprimer le fichier
        console.log("Suppression du fichier...");
        await deleteFile("");


    } catch (err) {
        console.error("Erreur lors de l'opération sur les fichiers:", err);
    }
}

testFileOperations();


// Exemple de données pour la question
const questionData = {
    questionId: 3,
    title: "Comment évalueriez-vous notre service ?",
    type: "rating",
    options: {
        minValue: 1,
        maxValue: 5,
        step: 1
    }
};

// Exemple de nom de fichier auquel la question est associée
const fichier = "Enquête de Satisfaction 001";

// Fonction pour tester les opérations CRUD sur les questions
async function testQuestionOperations() {
    try {
        // Insérer la question
        console.log("Insertion de la question...");
        await insertQuestion(fichier, questionData);

        // Afficher toutes les questions
        console.log("Affichage des questions...");
        const questions = await getAllQuestions();
        console.log(questions);

        // Mettre à jour la question
        const newQuestionData = {
            title: "Comment évalueriez-vous notre service client ?",
            type: "rating",
            options: {
                minValue: 1,
                maxValue: 10,
                step: 1
            }
        };
        console.log("Mise à jour de la question...");
        await updateQuestion(3, newQuestionData); // Remplacé 1 par 3 pour correspondre au questionId

        // Supprimer la question
        console.log("Suppression de la question...");
        await deleteQuestion(3); // Remplacé 1 par 3 pour correspondre au questionId

    } catch (err) {
        console.error("Erreur lors de l'opération sur les questions:", err);
    }
}


testQuestionOperations();





const reponseData = {
    reponseId: 1,
    title: "Très satisfait"
};

// Exemple d'ID de question auquel la réponse est associée
const questionId = 3;

// Fonction pour tester les opérations CRUD sur les réponses
async function testReponseOperations() {
    try {
        // Insérer la réponse
        console.log("Insertion de la réponse...");
        await insertReponse(questionId, reponseData);

        // Afficher toutes les réponses pour une question spécifique
        console.log("Affichage de toutes les réponses pour la question ID 3...");
        const reponses = await getReponsesByQuestionId(questionId);
        console.log(JSON.stringify(reponses, null, 2)); 

        // Mettre à jour la réponse
        const newReponseData = {
            title: "Satisfait"
        };
        console.log("Mise à jour de la réponse...");
        await updateReponse(1, newReponseData);



        // Supprimer la réponse
        console.log("Suppression de la réponse...");
        await deleteReponse(1);


    } catch (err) {
        console.error("Erreur lors de l'opération sur les réponses:", err);
    }
}


testReponseOperations();


main();
