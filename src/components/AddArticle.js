import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddArticle = ({ onSubmit }) => {
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch categories from the backend
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:3006/categories');
                if (!response.ok) {
                    throw new Error('Erreur HTTP : ' + response.status);
                }
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des catégories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Créer un objet FormData pour envoyer les données du formulaire et l'image
        const formData = new FormData();
        formData.append('Titre_Articles', titre);
        formData.append('Contenu_Articles', contenu);
        formData.append('Image_Utilisateur', image);
        formData.append('ID_Categories_Categories', selectedCategory);

        try {
            // Remplacer l'URL par celle de votre backend
            const response = await fetch('http://localhost:3006/article', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Traitez la réponse du backend ici, par exemple, afficher un message de succès
                onSubmit();
            } else {
                // Traitez les erreurs ici
                console.error('Erreur lors de la création de l\'article');
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'article:', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitre">
                            <Form.Label>Titre</Form.Label>
                            <Form.Control
                                type="text"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formContenu">
                            <Form.Label>Contenu</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={contenu}
                                onChange={(e) => setContenu(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formCategory">
                            <Form.Label>Catégorie</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                required
                            >
                                <option value="">Sélectionnez une catégorie</option>
                                {categories.map((category) => (
                                    <option key={category.ID_Categories_Categories} value={category.ID_Categories_Categories}>
                                        {category.Nom_Categories}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Ajouter l'article
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddArticle;