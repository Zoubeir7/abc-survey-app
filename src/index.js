const { ajoutSurvey, listerSurvey, modifierSurvey, supprimerSurvey } = require('./surveyModule');
const { ajouterQuestion, listerQuestion, modifierQuestion, supprimerQuestion, } = require("./questionModule");
const { ajouterReponse, listerReponses, modifierReponse, supprimerReponse } = require('./reponseModule');


const survey = {
    surveyId: 1,
    name: "Enquête de Satisfaction 001",
    description: "Enquête visant à évaluer la satisfaction des clients concernant nos services.",
    createdAt: "2024-07-25T08:00:00Z",
    createdBy: {
        employeeName: "Jane Smith",
        employeeRole: "Responsable du service client",
    }
};

const question = {
    questionId: 1,
    surveyId: 1,
    title: "Comment évalueriez-vous notre service ?",
    type: "rating",
    options: {
        inValue: 1,
        maxValue: 5,
        step: 1
    }

};

const reponse = { reponseId: 1, questionId: 1, title: "Très satisfait" };



async function main() {
    console.log("================== Test Survey=============");

    await ajoutSurvey(survey);

    await listerSurvey();

    await modifierSurvey("Enquête de Satisfaction 001", { description: "Enquête mise à jour" });

    await supprimerSurvey();


    console.log("===r============Test des questions ========");


    await ajouterQuestion(question);


    await listerQuestion();


    await modifierQuestion(1, { title: "Comment évalueriez-vous notre service maintenant ?" });


    await supprimerQuestion();


    console.log("===========Test des réponses ===============");


    await ajouterReponse(reponse.questionId, reponse);


    await listerReponses(reponse.questionId);


    await modifierReponse(reponse.reponseId, { title: "Satisfait" });


    await supprimerReponse(1);

    process.exit();

}

main();







