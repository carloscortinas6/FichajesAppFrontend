import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import SignInForm from '../components/forms/SignInForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { isObjectEmpty } from '../helpers/helpers';
import { loginUser } from '../actions/authActions';
import { useNavigate } from "react-router-dom";


export default function SignIn() {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const loggedIn = useSelector(state => state.auth.loggedIn); 
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/user-dashboard"); // Redirigir a la página del usuario
    }
  }, [loggedIn, navigate]);

  const login = ({ email, password }) => {
    const errors = {};
    setErrors(errors);

    if (!validator.isEmail(email)) {
      errors.email = "El correo electrónico es inválido";
    }

    if (validator.isEmpty(password)) {
      errors.password = "La contraseña no puede estar vacía";
    }

    if (!isObjectEmpty(errors)) {
      setErrors(errors);
      return;
    }

    dispatch(loginUser({ email, password }))
      .then(response => {
        // Redirigir a la página específica del usuario
        navigate("/user-dashboard");
      }).catch(err => {
        // Aquí puedes manejar los errores del servidor y mostrarlos si es necesario
        setErrors({ general: "Las credenciales son incorrectas" });
      });
  }

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100" style={{ paddingBottom: '40vh' }}>
      <Row className="justify-content-center w-50">
        <Col md={8} lg={6}>
          <Card body>
            <SignInForm errors={errors} onSubmitCallback={login} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
  
}