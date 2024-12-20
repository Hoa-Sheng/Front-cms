import React, { useState } from 'react';
import "./PostForm.css";

function PostForm({ onNewArticle }) {
  const [titre, setTitre] = useState('');
  const [contenu, setContenu] = useState('');
  const [tags, setTags] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titre', titre);
    formData.append('contenu', contenu);
    formData.append('tags', tags);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/articles/1`, {  // Assurez-vous que l'ID de la catégorie est bien passé ici
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Assurez-vous de gérer l'authentification
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        onNewArticle(data);
        alert('Article créé avec succès');
      } else {
        alert(data.message || 'Erreur lors de la création de l\'article');
      }
    } catch (error) {
      console.error('Erreur de soumission:', error);
      alert('Une erreur est survenue lors de la création de l\'article');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div>
        <label htmlFor="titre">Titre:</label>
        <input
          type="text"
          id="titre"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="contenu">Contenu:</label>
        <textarea
          id="contenu"
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="tags">Tags (séparés par des virgules):</label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="photo">Photo:</label>
        <input
          type="file"
          id="photo"
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default PostForm;
