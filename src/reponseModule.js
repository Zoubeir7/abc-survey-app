const { connectToDatabase } = require('./config/database');


async function insertReponse(questionId, reponseData) {
    const db = await connectToDatabase();
    const collection = db.collection('reponses');


    reponseData.questionId = questionId;

  
    const existingReponse = await collection.findOne({
        questionId: questionId,
        title: reponseData.title
    });

    if (existingReponse) {
        console.log(`Une réponse avec le titre '${reponseData.title}' existe déjà pour la question ID '${questionId}'.`);
        return;
    }

 
    await collection.insertOne(reponseData);
    console.log(`Réponse insérée avec l'ID: ${reponseData.reponseId}`);
}


async function getReponsesByQuestionId(questionId) {
    const db = await connectToDatabase();
    const collection = db.collection('reponses');

    const reponses = await collection.find({ questionId: questionId }).toArray();

    console.log(`Réponses pour la question ID '${questionId}':`);
    reponses.forEach(reponse => {
        console.log(JSON.stringify(reponse, null, 2));

    });

    return reponses;
}


async function updateReponse(reponseId, updatedData) {
    const db = await connectToDatabase();
    const collection = db.collection('reponses');

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

module.exports = {
    insertReponse,
    getReponsesByQuestionId,
    updateReponse,
    deleteReponse
};
