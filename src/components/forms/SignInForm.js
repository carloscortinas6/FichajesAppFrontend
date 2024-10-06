import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import '../../css/SignInForm.css';

export default function SignInForm({ errors, onSubmitCallback }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    onSubmitCallback({ email, password });
  };

  const handleForgotPassword = () => {
    // Aquí puedes redirigir a la página de recuperación de contraseña
    window.location.href = '/forgot-password'; // Cambia esto según tu enrutamiento
  };

  return (
    <div>
      <h5 className="card-title text-center mb-4 custom-title">TIMP</h5>
      {errors.general && (
        <Alert variant="danger" className="text-center">
          {errors.general}
        </Alert>
      )}
      <Form onSubmit={submitForm}>
        <Form.Group controlId="email">
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Correo Electrónico"
            isInvalid={!!errors.email}
            className="mb-3"
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            isInvalid={!!errors.password}
            className="mb-3"
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="btn w-100 mb-2">
          Iniciar Sesión
        </Button>

        {/* Botón para "¿Has olvidado la contraseña?" */}
        <div className="text-center">
          <Button onClick={handleForgotPassword} variant="link" className="p-0">
            ¿Has olvidado la contraseña?
          </Button>
        </div>
      </Form>
    </div>
  );
}
