const { db } = require("./config/database");
const collectionSurvey = db.collection("surveys");

async function generateUniqueSurveyId(collectionSurvey) {
    const lastSurvey = await collectionSurvey
        .find({})
        .sort({ surveyId: -1 })
        .limit(1)
        .toArray();
    return lastSurvey.length > 0 ? lastSurvey[0].surveyId + 1 : 1;
}

async function ajoutSurvey(document) {
    try {

        document.surveyId = await generateUniqueSurveyId(collectionSurvey);
        await collectionSurvey.insertOne(document);
        console.log('Sondage ajouté avec succès.');
    } catch (e) {
        throw new Error(e.message);
    }
}

async function listerSurvey() {
    try {
        const surveys = await collectionSurvey.find({}).toArray();
        console.log("Sondages récupérés:", surveys);
    } catch (e) {
        throw new Error(e.message);
    }
}

async function modifierSurvey(surveyId, updateData) {
    try {
        const id = parseInt(surveyId, 10);

        const result = await collectionSurvey.updateOne(
            { surveyId: id },
            { $set: updateData }
        );
        if (result.matchedCount > 0) {
            console.log(`Le document mis à jour avec succès.`);
        } else {
            console.log('Le document que vous tentez de modifier n\'existe pas.');
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function supprimerSurvey(surveyId) {
    try {
        const id = parseInt(surveyId, 10);

        const result = await collectionSurvey.deleteOne({ surveyId: id });
        if (result.deletedCount > 0) {
            console.log('Le document supprimé avec succès.');
        } else {
            console.log('Le document que vous tentez de supprimer n\'existe pas.');
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    ajoutSurvey,
    listerSurvey,
    modifierSurvey,
    supprimerSurvey,
};
