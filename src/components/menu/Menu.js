import React from 'react';
import { Link } from 'react-router-dom';

export function Menu () {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
      <Link className="navbar-brand" to="/">
          <img src="/imagen/bandicam 2023-03-29 11-15-06-403.jpg" alt="Logo" style={{ width: '55px' }} />
          </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div style={{ bottom: '0px', right: '50%', width: '1200px' }}>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/jl">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/s">Solicitud</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Administración de servicio
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/empleado">Admin Empleados</Link></li>
                  <li><Link className="dropdown-item" to="/empleador">Admin Empleadores</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Usuarios</a></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex justify-content-center">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li><Link className="nav-link active" to="/lg">Iniciar sesión</Link></li>
                <li><Link className="nav-link active" to="/sg">Registrarse</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
