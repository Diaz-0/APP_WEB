import React, { useEffect, useState } from "react";
import Axios from "../../../services/Axios";
import { Link } from "react-router-dom";

export function AdminEmpleados() {
  const [empleados, setEmpleados] = useState([]);

  const consultarEmpleados = async () => {
    const consultar = await Axios.get("/empleado");
    setEmpleados(consultar.data);
  };

  const deleteEmpleado = async (id) => {
    if (window.confirm("¿Está seguro de eliminar al empleado?")) {
      await Axios.delete(`/empleado/${id}`);
      await consultarEmpleados();
    }
  };

  useEffect(() => {
    consultarEmpleados();
  }, []);

  return (
    <div className="container-fluid">
      <div>
        <h1>Registrate de Empleado</h1>
      </div>
      <div className="container text-center">
        <div className="row row-cols-4">
          <div className="col-md-3">
            <button type="button" className="btn btn-primary">
              <Link className="dropdown-item" to="/formempleado">
                Agregar Empleados...
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
                <th scope="col">Trabajo</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo Electronico</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((empleado, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{empleado.curp}</td>
                    <td>{empleado.nombre}</td>
                    <td>{empleado.apellidos}</td>
                    <td>{empleado.fechana}</td>
                    <td>{empleado.sexo}</td>
                    <td>{empleado.trabajo}</td>
                    <td>{empleado.telefono}</td>
                    <td>{empleado.email}</td>
                    <td>
                      <button type="button" className="btn btn-info">
                        Editar
                      </button>
                    </td>
                    <td>
                      <button type="button" className="btn btn-danger" onClick={() => deleteEmpleado(empleado._id)}>
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
