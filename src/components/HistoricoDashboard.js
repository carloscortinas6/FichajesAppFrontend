import React, { useState } from 'react';
import UserSearcher from './UserSearcher';
import "../css/HistoricoDashboard.css";
import axios from 'axios';
import { exportToPDF, exportToExcel } from '../helpers/exportUtils';
import { useSelector } from 'react-redux';
import FichajesTable from './FichajesTable'; 

const HistoricoDashboard = () => {
    const [fichajes, setFichajes] = useState([]);
    const [showExportOptions, setShowExportOptions] = useState(false); // Estado para controlar la visibilidad de las opciones de exportación
    const [nombreUsuarioSeleccionado, setNombreUsuarioSeleccionado] = useState('');
    const currentUser = useSelector(state => state.auth.user);

    const handleSearch = (userId, startDate, endDate) => {
        axios.get('http://localhost:8080/api/fichajes/usuario/' + userId + '/periodo', {
            params: {
                startDate: startDate,
                endDate: endDate
            }
        })
        .then(response => {
            const fichajesData = response.data;
            calcularTiempoTrabajado(fichajesData);
            setShowExportOptions(false);
            obtenerNombreUsuario(userId);
        })
        .catch(error => {
            console.error('Error fetching fichajes:', error);
        });
    };

    const obtenerNombreUsuario = (userId) => {
        if (currentUser.userRole === 'USER') {
            setNombreUsuarioSeleccionado(currentUser.userName);
        } else if (currentUser.userRole === 'ADMIN') {
            axios.get(`http://localhost:8080/api/usuarios/${userId}`)
            .then(response => {
                setNombreUsuarioSeleccionado(response.data.nombre);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching user name:', error);
            });
        }
    };

    const calcularTiempoTrabajado = (fichajes) => {
        const tiempoPorDia = {};
    
        fichajes.forEach(fichaje => {
            const fecha = new Date(fichaje.fecha).toLocaleDateString();
            if (!tiempoPorDia[fecha]) {
                tiempoPorDia[fecha] = { entradas: [], salidas: [] };
            }
    
            if (fichaje.tipoFichaje === 'ENTRADA') {
                tiempoPorDia[fecha].entradas.push(new Date(fichaje.fecha));
            } else if (fichaje.tipoFichaje === 'SALIDA') {
                tiempoPorDia[fecha].salidas.push(new Date(fichaje.fecha));
            }
        });
    
        const tiempoTrabajado = {};
        for (const [fecha, { entradas, salidas }] of Object.entries(tiempoPorDia)) {
            let totalTiempo = 0;
            for (let i = 0; i < Math.min(entradas.length, salidas.length); i++) {
                const diferencia = (salidas[i] - entradas[i]) / (1000 * 60); // Diferencia en minutos
                totalTiempo += diferencia;
            }
            tiempoTrabajado[fecha] = totalTiempo;
        }
    
        const fichajesConTiempo = fichajes.map(fichaje => {
            const fecha = new Date(fichaje.fecha).toLocaleDateString();
            return {
                ...fichaje,
                tiempoTrabajado: tiempoTrabajado[fecha] ? formatTiempoTrabajado(tiempoTrabajado[fecha]) : '-'
            };
        });
    
        // Actualiza el estado de fichajes con el nuevo cálculo
        setFichajes(fichajesConTiempo);
    };
    

    const formatTiempoTrabajado = (minutos) => {
        const horas = Math.floor(minutos / 60);
        const mins = Math.round(minutos % 60);
        return `${horas}h ${mins}m`;
    };

    const handleExportClick = () => {
        setShowExportOptions(!showExportOptions); // Cambiar el estado para mostrar u ocultar las opciones de exportación
    };

    const handleExportOption = (option) => {
        console.log("Opción seleccionada para exportar:", option);
        setShowExportOptions(false); // Ocultar el menú de opciones después de seleccionar

        if (option === 'excel') {
            exportToExcel(fichajes, nombreUsuarioSeleccionado);
        } else if (option === 'pdf') {
            exportToPDF(fichajes, nombreUsuarioSeleccionado);
        };
    };

    return (
        <div>
            <UserSearcher onSearch={handleSearch} />
            <div className="content">
            <FichajesTable 
                fichajes={fichajes} 
                setFichajes={setFichajes} 
                calcularTiempoTrabajado={calcularTiempoTrabajado} 
            /> 
            </div>
            <div className='export'>
                {fichajes.length > 0 && (
                    <div className="export-options">
                        <button onClick={handleExportClick}>
                            Exportar Reporte
                        </button>
                        {showExportOptions && (
                            <div className="export-menu">
                                <ul>
                                    <li onClick={() => handleExportOption('excel')}>Exportar en Excel</li>
                                    <li onClick={() => handleExportOption('pdf')}>Exportar en PDF</li>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoricoDashboard;
