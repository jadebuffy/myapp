// Importer les modules nécessaires
const express = require("express"); // Framework pour créer des applications web et API
const app = express(); // Initialisation de l'application Express
const mongoose = require("mongoose"); // ODM pour interagir avec MongoDB
const bodyParser = require('body-parser'); // Middleware pour parser les corps de requêtes
const cors = require('cors'); // Middleware pour autoriser les requêtes cross-origin
const Player = require('./player'); // Importation du modèle Player

// Middleware
app.use(cors()); // Utilisation de CORS pour autoriser les requêtes de toutes les origines
app.use(bodyParser.json()); // Utilisation de bodyParser pour parser les requêtes JSON

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/newcrud', { useNewUrlParser: true }) // Connexion à la base de données MongoDB
    .then(() => console.log('Connected to MongoDB')) // Message de succès en cas de connexion réussie
    .catch(err => console.error('Could not connect to MongoDB', err)); // Message d'erreur en cas d'échec de la connexion

// Route d'accueil
app.get('/', (req, res) => {
    res.send("Bienvenue sur mon serveur de jeu !"); // Réponse envoyée pour la route d'accueil
});

// Créer un nouveau joueur
app.post('/create', async (req, res) => {
    try {
        const newPlayer = await Player.create(req.body); // Création d'un nouveau joueur avec les données reçues
        res.status(200).send("Joueur créé avec succès"); // Réponse envoyée en cas de succès
    } catch (error) {
        console.error('Erreur dans la création de l\'utilisateur', error); // Message d'erreur en cas d'échec
        res.status(500).send("Erreur dans la création de l'utilisateur"); // Réponse envoyée en cas d'erreur
    }
});

// Sélectionner un joueur
app.get('/read/:userName', async (req, res) => {
    try {
        const player = await Player.findOne({ userName: req.params.userName }); // Recherche d'un joueur par userName
        res.status(200).json(player); // Réponse envoyée avec les données du joueur trouvé
    } catch (error) {
        console.error('Une erreur est survenue', error); // Message d'erreur en cas d'échec
        res.status(500).send("Une erreur est survenue"); // Réponse envoyée en cas d'erreur
    }
});

// Lister tous les joueurs
app.get('/players', async (req, res) => {
    try {
        const players = await Player.find({}); // Recherche de tous les joueurs
        res.status(200).json(players); // Réponse envoyée avec la liste des joueurs
    } catch (error) {
        console.error('Une erreur est survenue', error); // Message d'erreur en cas d'échec
        res.status(500).send("Une erreur est survenue"); // Réponse envoyée en cas d'erreur
    }
});

// Mettre à jour un joueur
app.put('/update/:userName', async (req, res) => {
    try {
        await Player.findOneAndUpdate({ userName: req.params.userName }, req.body); // Mise à jour du joueur spécifié par userName
        res.status(200).send("Joueur modifié avec succès !"); // Réponse envoyée en cas de succès
    } catch (error) {
        console.error('Le joueur ne peut pas être modifié', error); // Message d'erreur en cas d'échec
        res.status(500).send("Le joueur ne peut pas être modifié"); // Réponse envoyée en cas d'erreur
    }
});

// Supprimer un joueur
app.delete('/delete/:userName', async (req, res) => {
    try {
        const result = await Player.deleteOne({ userName: req.params.userName }); // Suppression du joueur spécifié par userName
        if (result.deletedCount === 0) { // Si aucun joueur n'a été supprimé
            return res.status(404).send("Le joueur n'a pas été trouvé"); // Réponse envoyée si le joueur n'a pas été trouvé
        }
        res.status(200).send("Joueur supprimé avec succès !"); // Réponse envoyée en cas de succès
    } catch (error) {
        console.error('Une erreur est survenue lors de la suppression du joueur', error); // Message d'erreur en cas d'échec
        res.status(500).send("Une erreur est survenue lors de la suppression du joueur"); // Réponse envoyée en cas d'erreur
    }
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log("Serveur lancé avec nodemon sur le port 3000!"); // Message de confirmation du démarrage du serveur
});
