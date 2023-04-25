import React from 'react';
import ReactDOM from 'react-dom';
import AppEmpleador from './AppEmpleador';
import AppEmpleado from './AppEmpleado';
import reportWebVitals from './reportWebVitals';

//Librerias de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const root = ReactDOM.createRoot(document.getElementById('root'));

// Solo renderizar uno de los componentes
const isEmpleado = false; // o true dependiendo de la necesidad
root.render(
  isEmpleado ? <AppEmpleado /> : <AppEmpleador />
);

reportWebVitals();

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Librerias de bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App userType="empleador" />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/