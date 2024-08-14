const { connectToDatabase } = require('./config/database');

// Fonction pour insérer une réponse dans la collection 'reponses'
async function insertReponse(questionId, reponseData) {
    const db = await connectToDatabase();
    const collection = db.collection('reponses');

    // Ajouter l'ID de la question à la réponse
    reponseData.questionId = questionId;

    // Vérifier si la réponse existe déjà pour la même question et le même titre
    const existingReponse = await collection.findOne({
        questionId: questionId,
        title: reponseData.title
    });

    if (existingReponse) {
        console.log(`Une réponse avec le titre '${reponseData.title}' existe déjà pour la question ID '${questionId}'.`);
        return;
    }

    // Insérer la nouvelle réponse
    await collection.insertOne(reponseData);
    console.log(`Réponse insérée avec l'ID: ${reponseData.reponseId}`);
}

// Fonction pour afficher toutes les réponses d'une question spécifique
async function getReponsesByQuestionId(questionId) {
    const db = await connectToDatabase();
    const collection = db.collection('reponses');

    // Trouver toutes les réponses associées à une question spécifique
    const reponses = await collection.find({ questionId: questionId }).toArray();

    // Afficher toutes les réponses
    console.log(`Réponses pour la question ID '${questionId}':`);
    reponses.forEach(reponse => {
        console.log(JSON.stringify(reponse, null, 2)); 
     
    });

    return reponses;
}

// Fonction pour mettre à jour une réponse spécifique
async function updateReponse(reponseId, updatedData) {
    const db = await connectToDatabase();
    const collection = db.collection('reponses');

    // Mise à jour de la réponse basée sur l'ID personnalisé de la réponse
    const result = await collection.updateOne(
        { reponseId: reponseId }, 
        { $set: updatedData }
    );

    if (result.matchedCount === 0) {
        console.log(`Aucune réponse trouvée avec l'ID '${reponseId}'`);
        return;
    }

    console.log(`Réponse avec l'ID '${reponseId}' mise à jour avec succès.`);
}

// Fonction pour supprimer une réponse spécifique
async function deleteReponse(reponseId) {
    const db = await connectToDatabase();
    const collection = db.collection('reponses');

    // Assurez-vous que `reponseId` est bien un nombre ici
    const result = await collection.deleteOne({ reponseId: Number(reponseId) });

    if (result.deletedCount === 0) {
        console.log(`Aucune réponse trouvée avec l'ID '${reponseId}'`);
        return;
    }

    console.log(`Réponse avec l'ID '${reponseId}' supprimée avec succès.`);
}

// Export des fonctions
module.exports = {
    insertReponse,
    getReponsesByQuestionId,
    updateReponse,
    deleteReponse
};
