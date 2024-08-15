const { connectToDatabase, client } = require('./config/database');

async function insertFile(fileData) {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    const result = await collection.insertOne(fileData);
    console.log(`Fichier inséré avec l'ID: ${result.insertedId}`);
}

async function getAllFiles() {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');


    const files = await collection.find().toArray();


    console.log("Documents dans la collection 'fichiers':");
    files.forEach(file => {
        console.log(JSON.stringify(file, null, 2));

    });

    return files;
}


async function updateFile(oldName, newName) {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    const result = await collection.updateOne(
        { 'fichiers.name': oldName },
        { $set: { 'fichiers.$.name': newName } }
    );

    if (result.matchedCount === 0) {
        console.log(`Aucun fichier trouvé avec le nom '${oldName}'`);
        return;
    }

    console.log(`Nom du fichier '${oldName}' mis à jour en '${newName}' avec succès.`);
}


async function deleteFile(name) {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    const result = await collection.deleteOne({ 'fichiers.name': name });

    if (result.deletedCount === 0) {
        console.log(`Aucun fichier trouvé avec le nom '${name}'`);
        return;
    }

    console.log(`Fichier '${name}' supprimé avec succès.`);
}

module.exports = {
    insertFile,
    getAllFiles,
    updateFile,
    deleteFile
};
