import React, { useEffect, useState } from "react";
import Axios from "../../../services/Axios";
import { Link } from "react-router-dom";

export function AdminEmpleadores() {
  const [empleadores, setEmpleadores] = useState([]);

  const consultarEmpleadores = async () => {
    try {
      const response = await Axios.get("/empleador");
      setEmpleadores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEmpleador = async (id) => {
    
      if (window.confirm("¿Esta seguro de eliminar al empleado?")) {
      const response = await Axios.delete(`/empleador/${id}`);
      console.log(response.data);
      consultarEmpleadores();
    } 
  };


  useEffect(() => {
    consultarEmpleadores();
  }, []);

  return (
    <div className="container-fluid">
      <div>
        <h1>Registrate de Empleador</h1>
      </div>
      <div className="container text-center">
        <div className="row row-cols-4">
          <div className="col-md-3">
            <button type="button" className="btn btn-primary">
              <Link className="dropdown-item" to="/formempleador">
                Agregar Empleadores...
              </Link>
            </button>
          </div>
        </div>
        <div className="row row-cols-12">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">CURP</th>
                <th scope="col">Nombre</th>
                <th scope="col">Apellidos</th>
                <th scope="col">Fecha de Nacimiento</th>
                <th scope="col">Sexo</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo Electronico</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleadores.map((empleador, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{empleador.curp}</td>
                    <td>{empleador.nombre}</td>
                    <td>{empleador.apellidos}</td>
                    <td>{empleador.fechana}</td>
                    <td>{empleador.sexo}</td>
                    <td>{empleador.telefono}</td>
                    <td>{empleador.email}</td>
                    <td>
                      <button type="button" className="btn btn-info">
                        Editar
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteEmpleador(empleador._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
