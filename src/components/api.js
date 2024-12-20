import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3006', // L'URL de votre serveur backend
  withCredentials: true, // Permet d'envoyer des cookies ou des informations d'authentification
});

export default API;
