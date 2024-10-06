import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Form, Alert } from 'react-bootstrap';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Obtener el token de la URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      setError('Token no proporcionado.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });

      if (response.ok) {
        setSuccess('¡Tu contraseña ha sido restablecida con éxito!');
        setTimeout(() => navigate('/signin'), 3000); // Redirigir a la página de inicio de sesión después de 3 segundos
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || 'Ocurrió un error al restablecer la contraseña.');
      }
    } catch (err) {
      setError('Error de conexión con el servidor.');
    }
  };

  return (
    <div>
      <h5 className="card-title text-center mb-4">Restablecer Contraseña</h5>
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      {success && <Alert variant="success" className="text-center">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="password">
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Nueva Contraseña"
            className="mb-3"
            required
          />
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Nueva Contraseña"
            className="mb-3"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="btn btn-primary w-100">
          Restablecer Contraseña
        </Button>
      </Form>
    </div>
  );
}
