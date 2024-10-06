import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FaEdit } from 'react-icons/fa';
import "../css/FichajesTable.css";

const FichajesTable = ({ fichajes = [], setFichajes }) => {
    const [editingIndex, setEditingIndex] = useState(null);
    const [newTime, setNewTime] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
    const currentUser = useSelector(state => state.auth.user);

    const handleEditClick = (index) => {
        setEditingIndex(index);
        setNewTime(new Date(fichajes[index].fecha).toISOString().substr(11, 5));
    };

    const handleSaveClick = (index) => {
        const updatedFichajes = [...fichajes];
        const fichaje = updatedFichajes[index];
        console.log("Inicio: Usuario hizo clic en el botón Guardar.");
        const startTime = Date.now(); // Captura el tiempo de inicio
        const updatedFecha = new Date(fichaje.fecha);
        const [hours, minutes] = newTime.split(':').map(Number);
        updatedFecha.setHours(hours);
        updatedFecha.setMinutes(minutes);

        const fechaISO = `${updatedFecha.getFullYear()}-${(updatedFecha.getMonth() + 1).toString().padStart(2, '0')}-${updatedFecha.getDate().toString().padStart(2, '0')}T${updatedFecha.getHours().toString().padStart(2, '0')}:${updatedFecha.getMinutes().toString().padStart(2, '0')}:${updatedFecha.getSeconds().toString().padStart(2, '0')}`;

        axios.put(`http://localhost:8080/api/fichajes/${fichaje.idFichaje}`, {
            ...fichaje,
            fecha: fechaISO
        })
        .then(response => {
            const endTime = Date.now(); // Captura el tiempo de fin
            console.log(`Fin: Respuesta del backend recibida en ${endTime - startTime} ms.`);
            // Actualizar la fecha del fichaje localmente
            updatedFichajes[index] = { ...fichaje, fecha: fechaISO };
            setFichajes(updatedFichajes); // Actualizar el estado con la nueva fecha

            setEditingIndex(null);
            
            // Mostrar mensaje de éxito
            setSuccessMessage('Hora del fichaje actualizada correctamente. Se ha enviado un correo al usuario para avisarle.');
            setTimeout(() => setSuccessMessage(''), 3000); // Ocultar mensaje después de 3 segundos
        })
        .catch(error => {
            console.error('Error updating fichaje:', error);
        });
    };

    const handleCancelClick = () => {
        setEditingIndex(null);
    };

    return (
        <div className='containertable'>
            {successMessage && (
                <div style={{ color: 'green', marginBottom: '10px' }}>
                    {successMessage}
                </div>
            )}
            <table>
                <thead>
                    <tr>
                        {/* Renderizar solo si es ADMIN */}
                        {currentUser.userRole === 'ADMIN' && <th>Acción</th>}
                        <th className="user-column">Usuario</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Tipo</th>
                        <th>Tiempo trabajado en el día</th>
                    </tr>
                </thead>
                <tbody>
                    {fichajes.map((fichaje, index) => (
                        <tr key={fichaje.idFichaje}>
                            {/* Renderizar solo si es ADMIN */}
                            {currentUser.userRole === 'ADMIN' && (
                                <td>
                                    <FaEdit onClick={() => handleEditClick(index)} style={{ cursor: 'pointer' }} />
                                </td>
                            )}
                            <td className="user-column">{fichaje.usuario ? fichaje.usuario.nombre : 'Desconocido'}</td>
                            <td>{new Date(fichaje.fecha).toLocaleDateString()}</td>
                            <td>
                                {editingIndex === index ? (
                                    <>
                                        <input
                                            type="time"
                                            value={newTime}
                                            onChange={(e) => setNewTime(e.target.value)}
                                        />
                                        <div className='editbuttons'>
                                            <button onClick={() => handleSaveClick(index)}>Guardar</button>
                                            <button onClick={handleCancelClick}>Cancelar</button>
                                        </div>
                                    </>
                                ) : (
                                    new Date(fichaje.fecha).toLocaleTimeString()
                                )}
                            </td>
                            <td>{fichaje.tipoFichaje}</td>
                            <td>{fichaje.tiempoTrabajado}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default FichajesTable;
