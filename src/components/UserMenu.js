import React from 'react';
import { useSelector } from 'react-redux';
import "../css/UserMenu.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const UserMenu = ({ setActiveComponent, activeComponent }) => {
    const userRole = useSelector(state => state.auth.user.userRole);

    return (
      <div className="sidebar">
        <div
          onClick={() => setActiveComponent('fichaje')}
          className={activeComponent === 'fichaje' ? 'active' : ''}
        >
          <i className={`fas fa-home icon ${activeComponent === 'fichaje' ? 'active' : ''}`} title="Inicio"></i>
        </div>
        <div
          onClick={() => setActiveComponent('historico')}
          className={activeComponent === 'historico' ? 'active' : ''}
        >
          <i className={`fas fa-chart-bar icon ${activeComponent === 'historico' ? 'active' : ''}`} title="Reportes"></i>
        </div>
        <div
          onClick={() => setActiveComponent('vacaciones')}
          className={activeComponent === 'vacaciones' ? 'active' : ''}
        >
          <i className={`fas fa-umbrella-beach icon ${activeComponent === 'vacaciones' ? 'active' : ''}`} title="Vacaciones"></i>
        </div>
        {userRole === 'ADMIN' && (
          <div
            onClick={() => setActiveComponent('CrearUsuarioAdmin')}
            className={activeComponent === 'CrearUsuarioAdmin' ? 'active' : ''}
          >
            <i className={`fas fa-user icon ${activeComponent === 'CrearUsuarioAdmin' ? 'active' : ''}`} title="Crear un usuario"></i>
          </div>
        )}
      </div>
    );
    
      
};

export default UserMenu;
