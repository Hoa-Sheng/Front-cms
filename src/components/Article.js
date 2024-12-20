import React from "react";
import "./Article.css";

function Article({ article, isLeftAligned, onCommentClick }) {
  return (
    <div className={`article ${isLeftAligned ? "left" : "right"}`}>
      {isLeftAligned ? (
        <>
          {article.Photo_Articles && (
            <img
              src={`http://localhost:3006${article.Photo_Articles}`}
              alt={article.Titre_Articles}
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
              <span>Par : {article.Nom_Utilisateur}</span>
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
              <span>Par : {article.Nom_Utilisateur}</span>
            </div>
          </div>
          {article.Photo_Articles && (
            <img
              src={`http://localhost:3006${article.Photo_Articles}`}
              alt={article.Titre_Articles}
              className="article-photo"
            />
          )}
        </>
      )}
      <div className="comment-section">
        <img
          src=".\images\commentlinear_106230.svg" // Remplacez avec le bon chemin
          alt="Comment"
          className="comment-icon"
          onClick={() => onCommentClick(article.ID_article_Articles)}
        />
      </div>
    </div>
  );
}


export default Article;
