import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddCategory = ({ onSubmit }) => {
    const [nom, setNom] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Créer un objet FormData pour envoyer les données du formulaire et la photo
        const formData = new FormData();
        formData.append('name', nom); // Update field name to 'name'
        formData.append('description', description); // Update field name to 'description'
        formData.append('photo', photo); // Update field name to 'photo'

        try {
            // Remplacez l'URL par celle de votre backend
            const response = await fetch('http://localhost:3006/categorie', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                // Traitez la réponse du backend ici, par exemple, afficher un message de succès
                onSubmit();
            } else {
                // Traitez les erreurs ici
                console.error('Erreur lors de la création de la catégorie');
            }
        } catch (error) {
            console.error('Erreur lors de la création de la catégorie:', error);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNom">
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                type="text"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPhoto">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => setPhoto(e.target.files[0])}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Ajouter la catégorie
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddCategory;