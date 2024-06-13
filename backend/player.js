// Importation du module mongoose pour interagir avec MongoDB
var mongoose = require("mongoose");

// Définition du schéma pour le modèle Player
var playerSchema = new mongoose.Schema({
    // Champ userName de type String, obligatoire et unique
    userName: { type: String, required: true, unique: true },
    // Champ playerName de type String, obligatoire
    playerName: { type: String, required: true },
    // Champ power de type Number, obligatoire
    power: { type: Number, required: true },
    // Champ level de type Number, obligatoire
    level: { type: Number, required: true },
});

// Exportation du modèle Player basé sur playerSchema
module.exports = mongoose.model("Player", playerSchema);
 