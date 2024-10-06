import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationSuccess = () => {
    return (
        <div>
            <h1>Registro Completado</h1>
            <p>Perfecto, has terminado el registro correctamente. Pulsa aquí para comenzar a registrar tus fichajes:</p>
            <Link to="/user-dashboard">Ir al Dashboard</Link>
        </div>
    );
};

export default RegistrationSuccess;