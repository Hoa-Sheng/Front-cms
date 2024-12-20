import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <button>Categories</button>
      <button>Creer un article</button>
      <button>Creer une catégorie</button>
    </div>
  );
}

export default Sidebar;
