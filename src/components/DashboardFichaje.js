import React, { useState, useEffect } from 'react';
import "../css/DashboardFichaje.css";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

const DashboardFichaje = () => {
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [tipoFichaje, setTipoFichaje] = useState('entrada'); // Inicializa como 'entrada' por defecto
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
        console.log("Usuario en Redux:", user); // Verifica que user tenga la estructura correcta
    }, [user]);

    useEffect(() => {
        updateTimeAndDate();
        const intervalId = setInterval(updateTimeAndDate, 60000);

        // Consulta el último fichaje al cargar la página
        if (user && user.userId) {
            axios.get(`http://localhost:8080/api/fichajes/ultimo/${user.userId}`)
                .then(response => {
                    const ultimoFichaje = response.data;
                    if (ultimoFichaje && ultimoFichaje.tipoFichaje === 'ENTRADA') {
                        setTipoFichaje('salida');
                    } else {
                        setTipoFichaje('entrada'); // Asegúrate de manejar el caso en que no haya un último fichaje o sea de tipo 'salida'
                    }
                })
                .catch(error => {
                    console.error('Error fetching the last fichaje:', error);
                });
        } 

        return () => clearInterval(intervalId);
    }, [user]);

    const updateTimeAndDate = () => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('es-ES', {
            timeZone: 'Europe/Madrid',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const dateString = `${day}/${month}`;

        setTime(timeString);
        setDate(dateString);
    };

    const handleFichaje = () => {
        if (!user.userId) {
            toast.error('No se ha podido obtener el ID del usuario.');
            return;
        }

        const fichajeData = {
            userId: user.userId,
            tipoFichaje: tipoFichaje,
            timestamp: new Date().toISOString()
        };

        axios.post('http://localhost:8080/api/fichajes', fichajeData)
            .then(response => {
                toast.success(`Fichaje de ${tipoFichaje} registrado correctamente`);
                setTipoFichaje(tipoFichaje === 'entrada' ? 'salida' : 'entrada');
            })
            .catch(error => {
                toast.error(`Error al registrar el fichaje de ${tipoFichaje}`);
            });
    };

    return (
            <div>
            <div className="welcome-message">
                <h1>Bienvenido {user.userName}</h1>
                <p>¡Ya puedes comenzar a fichar!</p>
            </div>
            <div className="content-fichaje">
            <div className='titulo'>Fichaje</div>
            <div className="time">{time}</div>
            <div className="date">{date}</div>
            <button onClick={handleFichaje}>
                Fichar de {tipoFichaje}
            </button>
            <ToastContainer />
        </div>
        </div>
    );
};

export default DashboardFichaje;
