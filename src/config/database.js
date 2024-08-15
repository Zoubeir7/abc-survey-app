const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
    try {

        await client.connect();
        console.log('Connexion réussie à MongoDB');

        const dbName = 'satisfaction_survey';
        const db = client.db(dbName);

        console.log(`Connexion à la base de données : ${dbName}`);

        return db;
    } catch (error) {
        console.error('Erreur lors de la connexion à MongoDB', error);
        throw error;
    }
}


module.exports = {
    connectToDatabase,
    client
};
