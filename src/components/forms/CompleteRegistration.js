import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios';

const CompleteRegistration = () => {
    const [token, setToken] = useState(null);
    const [nombre, setNombre] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tokenFromUrl = params.get('token');
        setToken(tokenFromUrl);
    }, [location.search]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (contraseña !== confirmarContraseña) {
            setError('Las contraseñas no coinciden.');
            return;
        }

        console.log('Datos a enviar:', { token, username: nombre, password: contraseña });

        try {
            // Realiza la solicitud de registro
            await axios.post('http://localhost:8080/api/complete-registration', {
                token,
                username: nombre,
                password: contraseña
            });

            // Mostrar mensaje de éxito antes de redirigir
            alert("Registro completado correctamente. Te redirigimos a la página de inicio de sesión.");

            // Esperar un momento antes de redirigir al usuario
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirige después de 2 segundos
        } catch (err) {
            setError('Error al completar el registro.');
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Completa tu Registro</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre Completo:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirmar Contraseña:</label>
                    <input
                        type="password"
                        value={confirmarContraseña}
                        onChange={(e) => setConfirmarContraseña(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrar</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default CompleteRegistration;
