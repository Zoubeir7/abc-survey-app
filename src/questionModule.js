const { client, db } = require("./config/database");

const collectionQuestion = db.collection("questions");


async function generateUniqueQuestionId(collectionQuestion) {
    const lastQuestion = await collectionQuestion
        .find({})
        .sort({ questionId: -1 })
        .limit(1)
        .toArray();
    return lastQuestion.length > 0 ? lastQuestion[0].questionId + 1 : 1;
}

async function ajouterQuestion(document) {
    try {
        document.questionId = await generateUniqueQuestionId(collectionQuestion);
        await collectionQuestion.insertOne(document);
        console.log(`Le document ${document.questionId} a été ajouté avec succès.`);
    } catch (e) {
        throw new Error(e.message);
    }
}


async function listerQuestion() {
    try {
        const result = await collectionQuestion.find({}).toArray();
        console.log("Les résultats:", result);
    } catch (e) {
        throw new Error(e.message);
    }
}

async function modifierQuestion(questionId, updateData) {
    try {
        const id = parseInt(questionId, 10);

        const existingQuestion = await collectionQuestion.findOne({
            questionId: id,
        });
        if (existingQuestion) {
            await collectionQuestion.updateOne(
                { questionId: id },
                { $set: updateData }
            );
            console.log(`Document ${id} est modifié avec succès.`);
        } else {
            console.log(`Erreur: Le document avec questionId ${id} n'existe pas.`);
        }
    } catch (e) {
        throw new Error(e.message);
    }
}


async function supprimerQuestion(questionId) {
    try {
        const id = parseInt(questionId, 10);

        const existingQuestion = await collectionQuestion.findOne({
            questionId: id,
        });
        if (existingQuestion) {
            await collectionQuestion.deleteOne({ questionId: id });
            console.log(`Document ${id} a été supprimé avec succès.`);
        } else {
            console.log(`Erreur: Le document avec questionId ${id} n'existe pas.`);
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
