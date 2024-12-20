import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Feed.css";

const Feedi = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState({});

  async function fetchArticles() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("http://localhost:3006/article");
      if (!response.ok) throw new Error("Erreur HTTP : " + response.status);
      const data = await response.json();
      if (data && Array.isArray(data.articles)) {
        setArticles(data.articles);
        // Fetch comments for each article
        data.articles.forEach(article => fetchComments(article.ID_article_Articles));
      } else {
        throw new Error("Format des données incorrect");
      }
    } catch (error) {
      console.error("Erreur de récupération des articles:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleAddComment = async (articleId, comment) => {
    if (!user) {
      alert("Vous devez être connecté pour ajouter un commentaire.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3006/comment/${articleId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du commentaire");
      }

      const newComment = await response.json();
      setComments((prev) => ({
        ...prev,
        [articleId]: [...(prev[articleId] || []), newComment],
      }));
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error.message);
    }
  };

  async function fetchComments(articleId) {
    try {
      const response = await fetch(`http://localhost:3006/comment/${articleId}`);
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      const data = await response.json();
      setComments((prev) => ({ ...prev, [articleId]: data }));
    } catch (error) {
      console.error("Erreur lors de la récupération des commentaires:", error.message);
    }
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="feedi-container">
      {loading && <p className="loading-message">Chargement...</p>}
      {error && <p className="error-message">Erreur: {error}</p>}
      {!loading && !error && articles.length > 0 && (
        <div className="articles-list">
          {articles.map((article) => (
            <div key={article.ID_article_Articles} className="article-card">
              <div className="article-content">
                <div className="article-image-container">
                  {article.Photo_Articles && (
                    <img
                      className="article-image"
                      src={`http://localhost:3006${article.Photo_Articles}`}
                      alt={article.Titre_Articles}
                    />
                  )}
                </div>
                <div className="article-text">
                  <h2>{article.Titre_Articles}</h2>
                  <p>{article.Contenu_Articles}</p>
                  <div className="author-date">
                    <p>
                      <strong>Auteur:</strong> {article.Nom_Utilisateur}
                    </p>
                    <p className="article-date">
                      {new Date(article.Date_de_creation_Articles).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="comments-section">
                <h3>Commentaires</h3>
                <ul>
                  {(comments[article.ID_article_Articles] || []).map((comment, index) => (
                    <li key={index}>{comment.text}</li>
                  ))}
                </ul>
                {user && (
                  <div className="add-comment">
                    <input
                      type="text"
                      placeholder="Ajouter un commentaire..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.target.value.trim()) {
                          handleAddComment(article.ID_article_Articles, e.target.value.trim());
                          e.target.value = "";
                        }
                      }}
                    />
                  </div>
                )}
                {!user && <p>Vous devez être connecté pour commenter.</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {!loading && !error && articles.length === 0 && <p>Aucun article trouvé.</p>}
    </div>
  );
};

export default Feedi;
