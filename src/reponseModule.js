const { db } = require('./config/database');

const collectionReponse = db.collection('reponses');

async function ajouterReponse(questionId, reponseData) {
    try {
        reponseData.questionId = questionId;

        const existingReponse = await collectionReponse.findOne({
            questionId: questionId,
        });

        if (existingReponse) {
            console.log(`Une réponse existe déjà pour la question ID '${questionId}'.`);
        } else {
            await collectionReponse.insertOne(reponseData);
            console.log(`Réponse insérée avec succès pour la question ID: ${questionId}, réponse ID: ${reponseData.reponseId}`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

async function listerReponses(questionId) {
    try {
        const reponses = await collectionReponse.find({ questionId: questionId }).toArray();

        if (reponses.length > 0) {
            console.log(`Réponses pour la question ID '${questionId}':`);
            reponses.forEach(reponse => {
                console.log(JSON.parse(JSON.stringify(reponse)));
            });
        } else {
            console.log(`Aucune réponse trouvée pour la question ID '${questionId}'.`);
        }

        return reponses;
    } catch (e) {
        throw new Error(e.message);
    }
}

async function modifierReponse(questionId, updatedData) {
    try {
        const result = await collectionReponse.updateOne(
            { questionId: questionId },
            { $set: updatedData }
        );

        if (result.matchedCount > 0) {
            console.log(`Réponse mise à jour avec succès pour la question ID '${questionId}'.`);
        } else {
            console.log(`Le document que vous tentez de modifier n'existe pas.`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

async function supprimerReponse(questionId) {
    try {
        const result = await collectionReponse.deleteOne({ questionId: Number(questionId) });

        if (result.deletedCount > 0) {
            console.log(`Réponse supprimée avec succès pour la question ID '${questionId}'.`);
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
