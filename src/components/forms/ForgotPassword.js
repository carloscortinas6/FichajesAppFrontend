import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import '../../css/ForgotPassword.css'; // Asegúrate de crear y personalizar este archivo CSS
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const loggedIn = useSelector(state => state.auth.loggedIn); 
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/user-dashboard"); // Redirigir a la página del usuario
    }
  }, [loggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el correo electrónico de recuperación.');
      }

      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    } catch (err) {
      setError('Error al enviar el correo de recuperación. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="forgot-password-container">
      <h5 className="text-center mb-4">Recuperar Contraseña</h5>
      {message && (
        <Alert variant="success" className="text-center">
          {message}
        </Alert>
      )}
      {error && (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            required
            className="mb-3"
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="btn btn-primary w-100">
          Enviar Enlace de Recuperación
        </Button>
      </Form>
    </div>
  );
}
