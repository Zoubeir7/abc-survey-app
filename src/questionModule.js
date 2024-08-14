const { connectToDatabase } = require('./config/database');

// Fonction pour insérer une question dans la collection 'questions'
async function insertQuestion(fileName, questionData) {
    const db = await connectToDatabase();
    const collection = db.collection('questions');

    // Vérifie si une question avec le même ID existe déjà
    const existingQuestion = await collection.findOne({ questionId: questionData.questionId });

    if (existingQuestion) {
        console.log(`La question avec l'ID '${questionData.questionId}' existe déjà.`);
        return;
    }

    // Ajouter le nom du fichier et insérer la question
    const questionWithFileName = {
        ...questionData,
        fileName: fileName // Associe la question au fichier
    };

    const result = await collection.insertOne(questionWithFileName);
    console.log(`Question insérée avec l'ID: ${result.insertedId}`);
}

// Fonction pour afficher toutes les questions de la collection 'questions'
async function getAllQuestions() {
    const db = await connectToDatabase();
    const collection = db.collection('questions');

    // Récupérer toutes les questions
    const questions = await collection.find().toArray();

    // Afficher toutes les questions
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
