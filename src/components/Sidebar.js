import React from "react";
import "./Sidebar.css";


function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Menu</h2>

      <button>Categories</button>
      <a href= 'http://localhost:5178/addarticle'><button>Creer un article</button></a>
      <a href= 'http://localhost:5178/addcategory'><button>Creer une catégorie</button></a>
    </div>
  );
}

export default Sidebar;
