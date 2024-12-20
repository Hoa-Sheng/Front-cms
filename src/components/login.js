import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3006/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Email ou mot de passe incorrect');
            }

            const data = await response.json();
            onLogin(); // Appeler la fonction onLogin passée en prop
            navigate('/'); // Redirige vers la page principale
        } catch (error) {
            setError(error.message || 'Erreur lors de la connexion');
        }
    };

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={4} className="p-4">
                    <div className="shadow rounded p-5">
                        <h2 className="text-center">Connexion</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Adresse email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="password"
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="form-control"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                type="submit"
                                className="btn-primary w-100"
                            >
                                Se connecter
                            </Button>
                        </Form>
                        <div className="text-center mt-3">
                            <p>
                                Vous n'avez pas de compte ?{' '}
                                <Link to="/register">
                                    Inscrivez-vous
                                </Link>
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
