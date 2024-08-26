const { db } = require('./config/database');

const collectionReponse = db.collection('reponses');
const collectionQuestion = db.collection('questions');

async function ajouterReponse(reponseData) {

    const questionExiste = await collectionQuestion.findOne({ questionId: reponseData.questionId });

    if (!questionExiste) {
        console.log(`La question avec l'ID '${reponseData.questionId}' n'existe pas.`);
    } else {

        const reponseExiste = await collectionReponse.findOne({ reponseId: reponseData.reponseId });

        if (reponseExiste) {
            console.log(`Une réponse avec l'ID '${reponseData.reponseId}' existe déjà.`);
        } else {

            await collectionReponse.insertOne(reponseData);
            console.log(`La réponse avec l'ID ${reponseData.reponseId} a été ajoutée avec succès.`);
        }
    }
}

async function listerReponses() {
    try {

        const reponses = await collectionReponse.find({}).toArray();

        if (reponses.length > 0) {
            console.log("Toutes les réponses trouvées :");
            reponses.forEach(reponse => {
                console.log(JSON.parse(JSON.stringify(reponse)));
            });
        } else {
            console.log("Aucune réponse trouvée.");
        }

        return reponses;
    } catch (e) {
        throw new Error(e.message);
    }
}


async function modifierReponse(reponseId, updatedData) {
    try {
        const result = await collectionReponse.updateOne(
            { reponseId: reponseId },
            { $set: updatedData }
        );

        if (result.matchedCount > 0) {
            console.log(`Réponse mise à jour avec succès pour la réponse ID '${reponseId}'.`);
        } else {
            console.log(`Le document que vous tentez de modifier n'existe pas.`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

async function supprimerReponse(reponseId) {
    try {
        const result = await collectionReponse.deleteOne({ reponseId: Number(reponseId) });

        if (result.deletedCount > 0) {
            console.log(`Réponse supprimée avec succès pour la réponse ID '${reponseId}'.`);
        } else {
            console.log(`Le document que vous tentez de supprimer n'existe pas.`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}


module.exports = {
    ajouterReponse,
    listerReponses,
    modifierReponse,
    supprimerReponse
};
