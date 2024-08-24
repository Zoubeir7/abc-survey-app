const { client, db } = require("./config/database");
const collectionSurvey = db.collection("surveys");


async function ajoutSurvey(document) {
    try {

        const existingSurvey = await collectionSurvey.findOne({ name: document.name });
        if (existingSurvey) {
            console.log(`Un sondage avec le nom '${document.name}' existe déjà.`);
            return;
        }

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


async function modifierSurvey(surveyName, updateData) {
    try {
        const result = await collectionSurvey.updateOne(
            { name: surveyName },
            { $set: updateData }
        );
        if (result.matchedCount > 0) {
            console.log(`le document mis à jour avec succès.`);
        } else {
            console.log('Le document que vous tentez de modifier n\'existe pas.');
        }
    } catch (error) {
        throw new Error(e.message);
    }
}


async function supprimerSurvey(surveyName) {
    try {
        const result = await collectionSurvey.deleteOne({ name: surveyName });
        if (result.deletedCount > 0) {
            console.log('le document supprimé avec succès.');
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
