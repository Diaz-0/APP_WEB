import React, { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import { useParams } from "react-router-dom";

export function FormEmpleados() {
  const initialState = {
    curp: "",
    nombre: "",
    apellidos: "",
    fechana: "",
    sexo: "",
    trabajo: "",
    telefono: "",
    email: "",
    password: "",
  };
  const [empleados, setEmpleados] = useState(initialState);
  const [loading, setLoading] = useState(false); // Indicador de carga
  const params = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleados({ ...empleados, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Iniciar indicador de carga
    try {
      // Si params.id está definido, es una actualización. Si no, es un nuevo registro.
      if (params.id) {
        await Axios.patch(`/empleado/${params.id}`, empleados);
        console.log("Datos actualizados correctamente");
      } else {
        await Axios.post("/empleado", empleados);
        console.log("Registros guardados exitosamente");
        setEmpleados(initialState); // Restablecer estado a valores iniciales
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Detener indicador de carga
    }
  };

  const obtenerEmpleados = async (id) => {
    try {
      const empleado = await Axios.get(`/empleado/${id}`);
      setEmpleados(empleado.data);
      console.log(empleado);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    obtenerEmpleados(params.id);
  }, [params.id]);

  return (
    <>
      <div className="card">
        <div className="card-header">Datos personales</div>
        <div className="card-body">
          <form className="row g-3 p-2" onSubmit={handleSubmit}>
            <div className="mb-3 col-sm-6">
              <label htmlFor="curp" className="form-label">
                Curp
              </label>
              <input
                name="curp"
                type="text"
                className="form-control"
                id="curp"
                placeholder="Ingrese su curp"
                value={empleados.curp}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                id="nombre"
                placeholder="Ingrese su nombre"
                value={empleados.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="apellidos" className="form-label">
                Apellidos
              </label>
              <input
                type="text"
                className="form-control"
                name="apellidos"
                id="apellidos"
                placeholder="Ingrese sus apellidos"
                value={empleados.apellidos}
                  onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="fechana" className="form-label">
                Fecha de nacimiento
              </label>
              <input
                type="date"
                className="form-control"
                name="fechana"
                id="fechana"
                placeholder="Ingrese su fecha de nacimiento"
                value={empleados.fechana}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="sexo" className="form-label">
                Sexo
              </label>
              <select
                className="form-select"
                name="sexo"
                id="sexo"
                value={empleados.sexo}
                onChange={handleChange}
              >
                <option value="">Seleccione una opción</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="trabajo" className="form-label">
                Trabajo
              </label>
              <input
                  type="text"
                  className="form-control"
                  name="trabajo"
                  id="trabajo"
                  placeholder="Ingrese su trabajo"
                  value={empleados.trabajo}
                  onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  id="telefono"
                  placeholder="Ingrese su teléfono"
                  value={empleados.telefono}
                  onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Ingrese su email"
                  value={empleados.email}
                  onChange={handleChange}
              />
            </div>
            <div className="mb-3 col-sm-6">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  value={empleados.password}
                  onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 col-sm-6 mx-auto">
              <button
              className="btn btn-primary"
              type="submit"
              disabled={loading}
              >
              {params.id ? "Actualizar" : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
