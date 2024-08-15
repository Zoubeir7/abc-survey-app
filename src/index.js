const { connectToDatabase, client } = require('./config/database');
const { insertFile, getAllFiles, updateFile, deleteFile } = require('./fichierModule');
const { insertQuestion, getAllQuestions, updateQuestion, deleteQuestion } = require('./questionModule');
const { insertReponse, getReponsesByQuestionId, updateReponse, deleteReponse } = require('./reponseModule');


async function main() {
    try {
        const db = await connectToDatabase();

    } catch (error) {
        console.error('Erreur lors de l\'exécution du script principal', error);
    }
}


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


async function testFileOperations() {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    try {

        console.log("Vérification de l'existence du fichier...");
        const existingFile = await collection.findOne({ 'fichiers.name': fileData.fichiers[0].name });
        if (existingFile) {
            console.log(`Le fichier '${fileData.fichiers[0].name}' existe déjà.`);
        }

        else {

            console.log("Insertion du fichier...");
            const insertResult = await insertFile(fileData);
            console.log(`Fichier inséré avec l'ID: ${insertResult.insertedId}`);
            await insertQuestion(fichier, questionData);
        }


        console.log("Affichage des fichiers...");
        const files = await getAllFiles();
        console.log(JSON.stringify(files, null, 2));



        console.log("Mise à jour du fichier...");
        const updatedData = {
            "fichiers.0.description": "Description mise à jour de l'enquête."
        };
        await updateFile("Enquête de Satisfaction 001", "Enquête de Satisfaction 002");


        console.log("Suppression du fichier...");
        await deleteFile("");

    }
    catch (err) {
        console.error("Erreur lors de l'opération sur les fichiers:", err);
    }
}

testFileOperations();



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


const fichier = "Enquête de Satisfaction 001";
async function testQuestionOperations() {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('questions');

        const existingQuestion = await collection.findOne({ questionId: questionData.questionId });

        if (existingQuestion) {
            console.log(`La question avec l'ID '${questionData.questionId}' existe déjà.`);
            return;
        } else {

            const questionWithFileName = {
                ...questionData,
                fileName: fichier
            };

            const result = await collection.insertOne(questionWithFileName);
            console.log(`Question insérée avec l'ID: ${result.insertedId}`);
        }

        const questions = await getAllQuestions();
        console.log(questions);


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
        await updateQuestion(3, newQuestionData);

        console.log("Suppression de la question...");
        await deleteQuestion();

    }
    catch (err) {
        console.error("Erreur lors de l'opération sur les questions:", err);
    }
}




testQuestionOperations();


const reponseData = {
    reponseId: 1,
    title: "Très satisfait"
};


const questionId = 3;


async function testReponseOperations() {
    try {

        console.log("Insertion de la réponse...");
        await insertReponse(questionId, reponseData);


        console.log("Affichage de toutes les réponses pour la question ID 3...");
        const reponses = await getReponsesByQuestionId(questionId);
        console.log(JSON.stringify(reponses, null, 2));


        const newReponseData = {
            title: "Satisfait"
        };
        console.log("Mise à jour de la réponse...");
        await updateReponse(1, newReponseData);



        console.log("Suppression de la réponse...");
        await deleteReponse(1);


    } catch (err) {
        console.error("Erreur lors de l'opération sur les réponses:", err);
    }
}


testReponseOperations();


main();
