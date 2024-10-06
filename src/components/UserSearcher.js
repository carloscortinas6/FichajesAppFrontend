import React, { useEffect, useState, useCallback } from 'react';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import axios from 'axios';
import "../css/UserSearcher.css";
import UserPeriod from './UserPeriod';
import BotonReporte from './BotonReporte';

const UserSearcher = ({ onSearch }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [period, setPeriod] = useState({ startDate: null, endDate: null });
    const user = useSelector(state => state.auth.user);

    const fetchUsers = useCallback((query) => {
        axios.get(`http://localhost:8080/api/usuarios/search`, {
            params: {
                query: query,
                empresaId: user.empresaId // Asegúrate de que esta información esté disponible en el estado del usuario
            }
        })
        .then(response => {
            console.log('Usuarios encontrados:', response.data);
            const usersData = response.data.map(user => ({
                value: user.id,
                label: `${user.nombre}`
            }));
            setUsers(usersData);
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
    }, [user.empresaId]);

    useEffect(() => {
        if (user.userRole !== 'ADMIN') {
            setUsers([{
                value: user.userId,
                label: `${user.userName}`
            }]);
            setSelectedUser({
                value: user.userId,
                label: `${user.userName}`
            });
        } else {
            setSelectedUser({
                value: user.userId,
                label: `${user.userName}`
            });
            fetchUsers('');
        }
    }, [user, fetchUsers]);

    const handleInputChange = (newValue) => {
        setInputValue(newValue);

        if (newValue.length >= 1) {
            fetchUsers(newValue);
        } else {
            setUsers([]);
        }
    };

    const handlePeriodChange = (period) => {
        setPeriod(period);
    };

    const handleSearchClick = () => {
        if (!selectedUser || !period.startDate || !period.endDate) {
            console.error('User or period not selected');
            return;
        }
        console.log(selectedUser.value);
        onSearch(selectedUser.value, period.startDate.toISOString(), period.endDate.toISOString());
    };

    return (
        <div className="user-searcher">
            <div className="user-info">
                Usuario:
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    onInputChange={handleInputChange}
                    options={users}
                    isDisabled={user.userRole !== 'ADMIN'}
                    placeholder="Seleccione un usuario"
                    className="form-select"
                    classNamePrefix="select"
                    inputValue={inputValue}
                />
            </div>
            <div className="user-period-wrapper">
                <UserPeriod onPeriodChange={handlePeriodChange} />
            </div>
            <div className="boton-reporte-container">
                <BotonReporte onClick={handleSearchClick} />
            </div>
        </div>
    );
    
};

export default UserSearcher;
