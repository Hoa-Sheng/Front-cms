import React, { useState, useEffect } from "react";
import "./Header.css";
import { Link, useNavigate } from 'react-router-dom';


function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour savoir si l'utilisateur est connecté
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Largeur de l'écran
  const navigate = useNavigate(); // Hook pour la redirection

  // Met à jour la largeur de l'écran
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  // Vérifier l'état de la connexion au démarrage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // L'utilisateur est connecté
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle pour le menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fonction pour se déconnecter
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    navigate('/login'); // Rediriger vers la page de login sans perdre l'état
  };

  return (
    <div className="header">
      <h1>Projet CMS</h1>
      {screenWidth > 640 ? (
        !isLoggedIn ? (
          <Link to="/login">
            <button className="login-btn">Se connecter</button>
          </Link>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
        )
      ) : (
        /* Icône burger pour les écrans de petite taille */
        <div className="menu-icon" onClick={toggleMenu}>
          <i className="fas fa-bars"></i>
        </div>
      )}

      {/* Menu déroulant */}
      <div className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}>
        <button>Categories</button>
        <a href= 'http://localhost:5178/AddArticle'><button>Creer un article</button></a>
        <a href= 'http://localhost:5178/addcategory'><button>Creer une catégorie</button></a>

        {/* Affichage du bouton de connexion/déconnexion dans le menu déroulant */}
        {!isLoggedIn ? (
          <Link to="/login">
            <button className="login-btn">Se connecter</button>
          </Link>
        ) : (
          <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
        )}
      </div>
    </div>
  );
}

export default Header;
