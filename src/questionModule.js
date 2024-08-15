const { connectToDatabase } = require('./config/database');


async function insertQuestion(fileName, questionData) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');

    const questionWithFileName = {
        ...questionData,
        fileName: fileName
    };

    const result = await collection.insertOne(questionWithFileName);
    console.log(`Question insérée avec l'ID: ${result.insertedId}`);
}


async function getAllQuestions() {
    const db = await connectToDatabase();
    const collection = db.collection('questions');


    const questions = await collection.find().toArray();

    console.log("Questions dans la collection 'questions':");
    questions.forEach(question => {
        console.log(JSON.stringify(question, null, 2));
    });

    return questions;
}

// Fonction pour mettre à jour une question dans la collection 'questions'
async function updateQuestion(questionId, newQuestionData) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');

    // Mise à jour de la question basée sur l'ID
    const result = await collection.updateOne(
        { questionId: questionId },
        { $set: newQuestionData }
    );

    if (result.matchedCount === 0) {
        console.log(`Aucune question trouvée avec l'ID '${questionId}'`);
        return;
    }

    console.log(`Question avec l'ID '${questionId}' mise à jour avec succès.`);
}

// Fonction pour supprimer une question de la collection 'questions'
async function deleteQuestion(questionId) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');

    // Suppression de la question basée sur l'ID
    const result = await collection.deleteOne({ questionId: questionId });

    if (result.deletedCount === 0) {
        console.log(`Aucune question trouvée avec l'ID '${questionId}'`);
        return;
    }

    console.log(`Question avec l'ID '${questionId}' supprimée avec succès.`);
}

module.exports = {
    insertQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion
};
