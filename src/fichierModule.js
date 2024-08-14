const { connectToDatabase, client } = require('./config/database');

// Fonction pour insérer un document dans la collection 'fichiers'
async function insertFile(fileData) {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    // Vérifie si un fichier avec le même nom existe déjà
    const existingFile = await collection.findOne({ 'fichiers.name': fileData.fichiers[0].name });

    if (existingFile) {
        console.log(`Le fichier '${fileData.fichiers[0].name}' existe déjà.`);
        return;
    }

    // Insère le nouveau fichier
    const result = await collection.insertOne(fileData);
    console.log(`Fichier inséré avec l'ID: ${result.insertedId}`);
}


// Fonction pour afficher tous les documents de la collection 'fichiers'
async function getAllFiles() {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    // Récupérer tous les documents
    const files = await collection.find().toArray();

    // Afficher tous les fichiers
    console.log("Documents dans la collection 'fichiers':");
    files.forEach(file => {
        console.log(JSON.stringify(file, null, 2)); 
        // Affiche les documents avec une indentation de 2 pour meilleure lisibilité
    });

    return files;
}


// Fonction pour mettre à jour le nom d'un document dans la collection 'fichiers'
async function updateFile(oldName, newName) {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    // Mise à jour du document basé sur le nom ancien
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


// Fonction pour supprimer un document de la collection 'fichiers'
async function deleteFile(name) {
    const db = await connectToDatabase();
    const collection = db.collection('fichiers');

    // Suppression du document basé sur le nom unique
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
