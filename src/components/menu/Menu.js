import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Axios from "../../services/Axios";
import './Menu.css';

export function Menu() {
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const location = useLocation();

  useEffect(() => {
    // Llamar a la API para obtener el perfil del usuario
    // y verificar si es un empleador o no
    const getProfile = async () => {
      try {
        const response = await Axios.get(`/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
  }, [token]); // Agregar token como dependencia para volver a llamar a la función si cambia el token

  const isEmployer = profile?.role === 'employer';
  const isEmployee = profile?.role === 'employee';

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/Home">
          <img src="/imagen/bandicam 2023-03-29 11-15-06-403.jpg" alt="Logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/Home">
                Home
              </Link>
            </li>
            {isEmployer && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Funciones-1
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown1">
                  <li>
                    <Link className="dropdown-item" to="/Publicar-Trabajos">
                      Publicar Trabajos
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Lista-Solicitudes">
                      Solicitud
                    </Link>
                  </li>
                </ul>
              </li>
            )}
            {isEmployee && (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="navbarDropdown2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Funciones-2
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <li>
                    <Link className="dropdown-item" to="/Lista-de-Trabajos">
                      Servicios
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Estados">
                      Notificaciones
                    </Link>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          <div className="login-section">
            <Link className="login-link" to="/Iniciar-Sesión">
              <img src="/imagen/hamburguer-icon.jpg" alt="Login" className="login-icon" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
