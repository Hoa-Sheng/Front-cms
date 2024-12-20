import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './register.css';
import API from './api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    photo: null,
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.photo) {
      data.append('photo', formData.photo); // Handle file upload
    }

    try {
      const response = await API.post('/auth/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Correct content type for file uploads
        },
      });
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Une erreur est survenue.');
      setMessage('');
    }
};


  return (
    <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100">
        <Col md={6} lg={4}>
          <div className="shadow">
            <h2>Inscrivez-vous</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Entrez votre nom"
                  value={formData.name} // Access formData.name
                  onChange={handleInputChange}
                  name="name" // Make sure the name attribute is correctly set
                  required
                  className="form-control"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Entrez votre email"
                  value={formData.email} // Access formData.email
                  onChange={handleInputChange}
                  name="email" // Make sure the name attribute is correctly set
                  required
                  className="form-control"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Entrez un mot de passe"
                  value={formData.password} // Access formData.password
                  onChange={handleInputChange}
                  name="password" // Make sure the name attribute is correctly set
                  required
                  className="form-control"
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className="btn-primary"
              >
                S'inscrire
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p>
                Vous avez déjà un compte ?{' '}
                <a href="/login">
                  Connectez-vous
                </a>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
