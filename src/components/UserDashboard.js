import React, { useState } from 'react';
import UserMenu from './UserMenu';
import DashboardFichaje from './DashboardFichaje';
import HistoricoDashboard from './HistoricoDashboard';
import CrearUsuarioAdmin from './forms/CrearUsuarioAdmin';

const UserDashboard = () => {

  const [activeComponent, setActiveComponent] = useState('fichaje');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'fichaje':
        return <DashboardFichaje />;
      case 'historico':
        return <HistoricoDashboard />;
      case 'CrearUsuarioAdmin':
        return <CrearUsuarioAdmin />;
      default:
        return <DashboardFichaje />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}> {/* Hace que el contenedor sea tan alto como la pantalla */}
      <UserMenu setActiveComponent={setActiveComponent} activeComponent={activeComponent}/>
      <div style={{ flex: 1, padding: '20px' }}>
        {renderComponent()}
      </div>
    </div>
  );
  
};;

export default UserDashboard;