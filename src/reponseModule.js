const { db } = require('./config/database');

async function ajouterReponse(questionId, reponseData) {
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

async function listerReponses(questionId) {
    const collection = db.collection('reponses');
    const reponses = await collection.find({ questionId: questionId }).toArray();

    console.log(`Réponses pour la question ID '${questionId}':`);

  
    reponses.forEach(reponse => {
        console.log(JSON.parse(JSON.stringify(reponse)));
    });

    return reponses;
}

async function modifierReponse(reponseId, updatedData) {
    const collection = db.collection('reponses');

    const result = await collection.updateOne(
        { reponseId: reponseId },
        { $set: updatedData }
    );

    if (result.matchedCount === 0) {
        console.log(`Aucune réponse trouvée avec l'ID '${reponseId}'`);
        return;
    }

    console.log(`Réponse a mise à jour avec succès.`);
}

async function supprimerReponse(reponseId) {
    const collection = db.collection('reponses');

    const result = await collection.deleteOne({ reponseId: Number(reponseId) });

    if (result.deletedCount === 0) {
        console.log(`Aucune réponse trouvée avec l'ID '${reponseId}'`);
        return;
    }

    console.log(`Réponse  supprimée avec succès.`);
}

module.exports = {
    ajouterReponse,
    listerReponses,
    modifierReponse,
    supprimerReponse
};
