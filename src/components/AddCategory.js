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
        formData.append('Nom_Categories', nom);
        formData.append('Description_Categories', description);
        formData.append('Photo_Categorie', photo);

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
                // Gérer l'erreur si la requête échoue
                console.error('Erreur lors de l\'ajout de la catégorie');
            }
        } catch (error) {
            console.error('Erreur réseau:', error);
        }
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <Col md={8} lg={6} className="p-4">
                    <h2 className="text-center mb-4">Ajouter une Catégorie</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4">
                            <Form.Label>Nom de la Catégorie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Entrez le nom de la catégorie"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Description de la Catégorie</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Entrez la description de la catégorie"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Photo de la Catégorie</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={handlePhotoChange}
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

export default AddCategory;
