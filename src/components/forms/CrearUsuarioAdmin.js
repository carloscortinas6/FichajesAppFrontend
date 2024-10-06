import React, { useState } from 'react';
import axios from 'axios';
import "../../css/CrearUsuarioAdmin.css"; 

const CrearUsuarioAdmin = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER'); // Valor por defecto es 'USER'
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            correoElectronico: email,
            rol: role
        };

        axios.post('http://localhost:8080/api/usuarios/crearPorAdmin', userData)
            .then(response => {
                setSuccess('Usuario creado con éxito. Se ha enviado un correo para completar el registro.');
                setError('');
                setEmail('');
                setRole('USER'); // Restablece el rol al valor por defecto
            })
            .catch(error => {
                setError(`Error al crear el usuario: ${error.response.data}`);
                setSuccess('');
            });
    };

    return (
        <div className="crear-usuario-admin">
            <h1>Crear Usuario Admin</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Rol:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="USER">Usuario Normal</option>
                        <option value="ADMIN">Administrador</option>
                    </select>
                </div>
                <button type="submit">Crear Usuario</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}
        </div>
    );
};

export default CrearUsuarioAdmin;
