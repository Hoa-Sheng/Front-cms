import React from "react";
import "./Article.css";

function Article({ article, isLeftAligned }) {
  
  return (
    <div className={`article ${isLeftAligned ? "left" : "right"}`}>
      {isLeftAligned ? (
        <>
          {article.Photo_Articles && (
            <img
            src={`http://localhost:3006${article.Photo_Articles}`}
              alt={`Illustration for ${article.Titre_Articles}`}
              className="article-photo"
            />
          )}
          <div className="article-content">
            <h2>{article.Titre_Articles}</h2>
            <p>{article.Contenu_Articles}</p>
            <div className="article-meta">
              <span>
                Publié le :{" "}
                {new Date(article.Date_de_creation_Articles).toLocaleString()}
              </span>
              <span>Par l'utilisateur : {article.Nom_Utilisateur}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="article-content">
            <h2>{article.Titre_Articles}</h2>
            <p>{article.Contenu_Articles}</p>
            <div className="article-meta">
              <span>
                Publié le :{" "}
                {new Date(article.Date_de_creation_Articles).toLocaleString()}
              </span>
              <span>Par l'utilisateur : {article.ID_utilisateur_Utilisateur}</span>
            </div>
          </div>
          {article.Photo_Articles && (
            <img
              src={article.Photo_Articles}
              alt={`Illustration for ${article.Titre_Articles}`}
              className="article-photo"
            />
          )}
        </>
      )}
    </div>
  );
}

export default Article;
