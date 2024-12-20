import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddArticle = ({ onSubmit }) => {
    const [titre, setTitre] = useState('');
    const [contenu, setContenu] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Créer un objet FormData pour envoyer les données du formulaire et l'image
        const formData = new FormData();
        formData.append('Titre_Articles', titre);
        formData.append('Contenu_Articles', contenu);
        formData.append('Image_Utilisateur', image);

        try {
            // Remplacer l'URL par celle de votre backend
            const response = await fetch('http://localhost:3006/article/${CategoryId}', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Traitez la réponse du backend ici, par exemple, afficher un message de succès
                onSubmit();
            } else {
                // Gérer l'erreur si la requête échoue
                console.error('Erreur lors de l\'ajout de l\'article');
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
        }
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={10} lg={8} className="p-4">
                    <h2 className="text-center mb-4">Ajouter un Article</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Titre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez le titre de l'article"
                                value={titre}
                                onChange={(e) => setTitre(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Contenu</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={8}
                                placeholder="Entrez le contenu de l'article"
                                value={contenu}
                                onChange={(e) => setContenu(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Image de l'utilisateur</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handleImageChange}
                                required
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 py-3 fw-bold"
                        >
                            Ajouter
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddArticle;
