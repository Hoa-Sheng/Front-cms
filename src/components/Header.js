import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="header">
      <h1>Projet CMS</h1>
      <div className="menu-icon" onClick={toggleMenu}>
        <i className="fas fa-bars"></i>
      </div>
      <div className={`dropdown-menu ${isMenuOpen ? "show" : ""}`}>
        <button>Categories</button>
        <button>Créer un article</button>
        <button>Créer une catégorie</button>
      </div>
    </div>
  );
}

export default Header;
