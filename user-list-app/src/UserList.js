// src/UserList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  // État pour stocker la liste des utilisateurs
  const [listOfUser, setListOfUser] = useState([]);
  // État pour gérer l'état de chargement
  const [loading, setLoading] = useState(true);
  // État pour gérer les erreurs
  const [error, setError] = useState(null);

  // Utilisation de useEffect pour effectuer la requête API
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users') // L'URL de l'API jsonplaceholder
      .then(response => {
        setListOfUser(response.data); // Mise à jour de l'état avec les données des utilisateurs
        setLoading(false); // Désactiver le chargement
      })
      .catch(err => {
        setError(err.message); // En cas d'erreur
        setLoading(false); // Désactiver le chargement
      });
  }, []); // Le tableau vide [] garantit que l'effet ne s'exécute qu'une fois après le premier rendu

  // Affichage en fonction de l'état
  if (loading) {
    return <div>Loading...</div>; // Afficher un message de chargement pendant l'attente
  }

  if (error) {
    return <div>Error: {error}</div>; // Afficher l'erreur s'il y en a une
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {listOfUser.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> ({user.username})
            <br />
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
