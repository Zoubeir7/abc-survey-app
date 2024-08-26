const { client, db } = require("./config/database");

const collectionQuestion = db.collection("questions");
const collectionSurvey = db.collection("surveys");

async function ajouterQuestion(document) {
    try {
       
        const surveyExiste = await collectionSurvey.findOne({ surveyId: document.surveyId });

        if (!surveyExiste) {
            console.log(`Le survey avec l'ID ${document.surveyId} n'existe pas.`);
        } else {
            const questionExiste = await collectionQuestion.findOne({ questionId: document.questionId });

            if (questionExiste) {
                console.log('Une question avec cet ID existe déjà.');
            } else {
                await collectionQuestion.insertOne(document);
                console.log(`Le document ${document.questionId} a été ajouté avec succès.`);
            }
        }
    } catch (e) {
        throw new Error(e.message);
    }
}


async function listerQuestion() {
    try {
        const result = await collectionQuestion.find({}).toArray();
        console.log("Les documents questionss", result);
    } catch (e) {
        throw new Error(e.message);
    }
}

async function modifierQuestion(questionId, updateData) {
    try {
        const id = parseInt(questionId, 10);

        const existingQuestion = await collectionQuestion.findOne({ questionId: id });
        if (existingQuestion) {
            await collectionQuestion.updateOne(
                { questionId: id },
                { $set: updateData }
            );
            console.log(`Document modifié avec succès.`);
        } else {
            console.log(`Le document que vous tentez de modifier n'existe pas.`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

async function supprimerQuestion(questionId) {
    try {
        const id = parseInt(questionId, 10);

        const existingQuestion = await collectionQuestion.findOne({ questionId: id });
        if (existingQuestion) {
            await collectionQuestion.deleteOne({ questionId: id });
            console.log(`Document supprimé avec succès.`);
        } else {
            console.log(`Le document que vous tentez de supprimer n'existe pas.`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}

module.exports = {
    ajouterQuestion,
    listerQuestion,
    modifierQuestion,
    supprimerQuestion,
};
