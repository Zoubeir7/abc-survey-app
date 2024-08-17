const { connectToDatabase, client } = require('./config/database');
const { insertFile, getAllFiles, updateFile, deleteFile } = require('./fichierModule');
const { insertQuestion, getAllQuestions, updateQuestion, deleteQuestion } = require('./questionModule');
const { insertReponse, getReponsesByQuestionId, updateReponse, deleteReponse } = require('./reponseModule');




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


const reponseData = {
    reponseId: 1,
    title: "Très satisfait"
};


const questionId = 3;



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


const newQuestionData = {
    title: "Comment évalueriez-vous notre service client ?",
    type: "rating",
    options: {
        minValue: 1,
        maxValue: 10,
        step: 1
    }
};



async function main() {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    try {

        const existingFile = await collection.findOne({ 'fichiers.name': fileData.fichiers[0].name });
        if (existingFile) {
            console.log(`Le fichier '${fileData.fichiers[0].name}' existe déjà.`);
        }

        else {


            const insertResult = await insertFile(fileData);
            console.log(`Fichier inséré avec l'ID: ${insertResult.insertedId}`);
            await insertQuestion(fichier, questionData);
        }

        const files = await getAllFiles();
        console.log(JSON.stringify(files, null, 2));


        const updatedData = {
            "fichiers.0.description": "Description mise à jour de l'enquête."
        };
        await updateFile("Enquête de Satisfaction 001", "Enquête de Satisfaction 002");

        await deleteFile("");

    }
    catch (err) {
        console.error("Erreur lors de l'opération sur les fichiers:", err);
    }

    //
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

        await updateQuestion(3, newQuestionData);


        await deleteQuestion();

    }
    catch (err) {
        console.error("Erreur lors de l'opération sur les questions:", err);
    }

    try {


        await insertReponse(questionId, reponseData);



        const reponses = await getReponsesByQuestionId(questionId);
        console.log(JSON.stringify(reponses, null, 2));


        const newReponseData = {
            title: "Satisfait"
        };

        await updateReponse(1, newReponseData);



        await deleteReponse(1);


    } catch (err) {
        console.error("Erreur lors de l'opération sur les réponses:", err);
    }


}




main();
