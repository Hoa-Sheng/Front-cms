import React, { useState, useEffect } from 'react';
import './Feed.css'; // Assurez-vous d'importer les styles CSS

const Feedi = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fonction pour récupérer les articles depuis l'API
  async function fetchArticles() {
    try {
      setLoading(true); // Pendant le chargement
      setError(null); // Réinitialise l'erreur

      const response = await fetch('http://localhost:3006/article');
      
      // Vérifiez si la réponse est OK
      if (!response.ok) {
        throw new Error('Erreur HTTP : ' + response.status);
      }

      // Assurez-vous que la réponse est bien en JSON
      const data = await response.json();

      // Vérifiez que nous avons les articles
      if (data && Array.isArray(data.articles)) {
        setArticles(data.articles);  // Mise à jour de l'état des articles
      } else {
        throw new Error('Format des données incorrect');
      }
    } catch (error) {
      console.error('Erreur de récupération des articles:', error.message);
      setError(error.message); // Mise à jour de l'erreur
    } finally {
      setLoading(false); // Chargement terminé
    }
  }

  // Utiliser useEffect pour récupérer les articles lors du montage du composant
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="feedi-container">
      {loading && <p className="loading-message">Chargement...</p>}
      {error && <p className="error-message">Erreur: {error}</p>}
      {!loading && !error && articles.length > 0 && (
        <div className="articles-list">
          {articles.map(article => (
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
                    <p><strong>Auteur:</strong> {article.Nom_Utilisateur}</p>
                    <p className="article-date">{new Date(article.Date_de_creation_Articles).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Si aucun article n'est trouvé */}
      {!loading && !error && articles.length === 0 && (
        <p>Aucun article trouvé.</p>
      )}
    </div>
  );
};

export default Feedi;
