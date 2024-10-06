import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/Navigation.css'; 

export default function Navigation() { //barrita de arriba, en el curso de udemy dice como hacer el logout y la barra dinamica en la clase 99

  const loggedIn = useSelector(state => state.auth.loggedIn);
  //const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/signin');
  };

  const handleLogoutClick = () => {
    dispatch(logoutUser());
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link" href="/">Inicio</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Sobre nosotros</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Servicios</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Contacto</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/">Precios</a>
                </li>
                <li className="nav-item">
                    {loggedIn ? (
                        <button className="nav-link" onClick={handleLogoutClick}>Cerrar Sesión</button>
                    ) : (
                        <button className="nav-link" onClick={handleLoginClick}>Iniciar Sesión</button>
                    )}
                </li>
            </ul>
        </div>
    </div>
</nav>

  )
}
