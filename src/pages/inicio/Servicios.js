import React, { useState, useEffect } from "react";
import Axios from "../../services/Axios";
import "./Servicios.css"; // Importa el archivo CSS para las animaciones

export function Servicios() {
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await Axios.get("/empleado");
        setEmpleados(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmpleados();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ocurrió un error al cargar los datos</p>;
  }

  return (
    <div className="row">
      {empleados.map((empleado) => (
        <div className="col-4 p-2" key={empleado.id}>
          <div className="card mb-3 servicio-card">
            <div className="row g-0">
              <div className="col-md-4 servicio-imagen">
                <img
                  src="/imagen/Los-5-trabajos-mas-peligrosos-del-mundo-1_0.jpg"
                  className="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">
                    {empleado.nombre} {empleado.apellidos}
                  </h5>
                  <p className="card-text">
                    {empleado.telefono} <br />
                    {empleado.trabajo}
                  </p>
                  <p className="card-text">
                    <small className="text-muted">{empleado.sexo}</small>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-info servicio-contratar">
            Contratar...
          </button>
        </div>
      ))}
    </div>
  );
};
