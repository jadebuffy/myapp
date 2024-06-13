// Importation des modules nécessaires de React et axios, ainsi que du fichier CSS
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Composant fonctionnel principal de l'application
function App() {
  // Déclaration de l'état pour stocker la liste des joueurs
  const [players, setPlayers] = useState([]);
  
  // Déclaration de l'état pour stocker les informations du nouveau joueur
  const [newPlayer, setNewPlayer] = useState({
    userName: '',
    playerName: '',
    power: '',
    level: ''
  });

  // Utilisation de useEffect pour appeler fetchPlayers lors du montage initial du composant
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Fonction asynchrone pour récupérer la liste des joueurs depuis l'API
  const fetchPlayers = async () => {
    try {
      // Envoi d'une requête GET à l'API pour obtenir la liste des joueurs
      const response = await axios.get('http://localhost:3000/players');
      // Mise à jour de l'état players avec les données reçues de l'API
      setPlayers(response.data);
    } catch (error) {
      // Affichage d'une erreur en cas d'échec de la requête
      console.error("There was an error fetching the players!", error);
    }
  };

  // Fonction asynchrone pour créer un nouveau joueur via l'API
  const createPlayer = async () => {
    try {
      // Envoi d'une requête POST à l'API pour créer un nouveau joueur avec les données de newPlayer
      await axios.post('http://localhost:3000/create', newPlayer);
      // Rafraîchissement de la liste des joueurs après la création
      fetchPlayers();
      // Réinitialisation des champs du formulaire après la création
      setNewPlayer({ userName: '', playerName: '', power: '', level: '' });
    } catch (error) {
      // Affichage d'une erreur en cas d'échec de la requête
      console.error("There was an error creating the player!", error);
    }
  };

  // Fonction asynchrone pour mettre à jour le nom d'un joueur via l'API
  const updatePlayer = async (userName) => {
    // Demande à l'utilisateur de saisir un nouveau nom pour le joueur
    const newPlayerName = prompt("Enter new player name:");
    if (!newPlayerName) return; // Si aucun nom n'est saisi, l'opération est annulée
    try {
      // Envoi d'une requête PUT à l'API pour mettre à jour le nom du joueur
      await axios.put(`http://localhost:3000/update/${userName}`, { playerName: newPlayerName });
      // Rafraîchissement de la liste des joueurs après la modification
      fetchPlayers();
    } catch (error) {
      // Affichage d'une erreur en cas d'échec de la requête
      console.error("There was an error updating the player!", error);
    }
  };

  // Fonction asynchrone pour supprimer un joueur via l'API
  const deletePlayer = async (userName) => {
    try {
      // Envoi d'une requête DELETE à l'API pour supprimer le joueur spécifié
      await axios.delete(`http://localhost:3000/delete/${userName}`);
      // Rafraîchissement de la liste des joueurs après la suppression
      fetchPlayers();
    } catch (error) {
      // Affichage d'une erreur en cas d'échec de la requête
      console.error("There was an error deleting the player!", error);
    }
  };

  // Gestionnaire de changement pour mettre à jour l'état newPlayer lors de la saisie de l'utilisateur
  const handleChange = (e) => {
    // Récupération du nom et de la valeur de l'input qui a changé
    const { name, value } = e.target;
    // Mise à jour de l'état newPlayer avec les nouvelles valeurs saisies
    setNewPlayer(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Rendu du composant principal
  return (
    <div className="App">
      <h1>Bienvenue sur mon serveur de jeu !</h1>
      <div>
        {/* Champs de formulaire pour créer un nouveau joueur */}
        <input
          type="text"
          name="userName"
          placeholder="Nom d'utilisateur"
          value={newPlayer.userName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="playerName"
          placeholder="Pseudonyme"
          value={newPlayer.playerName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="power"
          placeholder="Puissance"
          value={newPlayer.power}
          onChange={handleChange}
        />
        <input
          type="number"
          name="level"
          placeholder="Niveau"
          value={newPlayer.level}
          onChange={handleChange}
        />
        {/* Bouton pour créer un nouveau joueur */}
        <button onClick={createPlayer}>Créer un joueur</button>
      </div>
      <h2>Liste des joueurs</h2>
      <ul>
        {/* Affichage de la liste des joueurs avec les options de modification et de suppression */}
        {players.map(player => (
          <li key={player.userName}>
            {player.playerName} ({player.userName})
            {/* Bouton pour modifier un joueur */}
            <button onClick={() => updatePlayer(player.userName)}>Modifier</button>
            {/* Bouton pour supprimer un joueur */}
            <button onClick={() => deletePlayer(player.userName)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Exportation du composant App pour pouvoir l'utiliser dans d'autres parties de l'application
export default App;
