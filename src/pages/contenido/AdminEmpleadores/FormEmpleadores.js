import React, { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import { useParams } from "react-router-dom";

export function FormEmpleadores() {
  const [empleadores, setEmpleadores] = useState({
    curp: "",
    nombre: "",
    apellidos: "",
    fechana: "",
    sexo: "",
    telefono: "",
    email: "",
    password: "",
  });

  const params = useParams();

  useEffect(() => {
    obtenerEmpleador(params.id);
  }, [params.id]);

  const obtenerEmpleador = async (id) => {
    const empleador = await Axios.get(`/empleador/${id}`);
    setEmpleadores(empleador.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpleadores((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (params.id) {
        await Axios.patch(`/empleador/${params.id}`, empleadores);
        console.log("Datos actualizados correctamente");
      } else {
        await Axios.post("/empleador", empleadores);
        console.log("Registros guardados exitosamente");
      }
    } catch (error) {
      console.log(error);
    }

    console.log(formData);
  };

  return (
    <div className="container-fluid p-3">
      <div className="card">
        <div className="card-header">Datos personales</div>
        <div className="card-body">
          <form className="row g-3 p-2" onSubmit={handleSubmit}>
            <div className="mb-3 row">
              <label htmlFor="curp" className="col-sm-2 col-form-label">
                Curp
              </label>
              <div className="col-sm-10">
                <input
                  name="curp"
                  type="text"
                  className="form-control"
                  id="curp"
                  placeholder="Ingrese su curp"
                  value={empleadores.curp}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="nombre" className="col-sm-2 col-form-label">
                Nombre
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  id="nombre"
                  placeholder="Ingrese su nombre"
                  value={empleadores.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="apellidos" className="col-sm-2 col-form-label">
                Apellidos
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="apellidos"
                  id="apellidos"
                  placeholder="Ingresa los apellidos"
                  value={empleadores.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="fechana" className="col-sm-2 col-form-label">
                Fecha de Nacimiento
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  name="fechana"
                  id="fechana"
                  placeholder="Ingrese su fecha de nacimiento"
                  value={empleadores.fechana}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="sexo" className="col-sm-2 col-form-label">
                Sexo
              </label>
              <div className="col-sm-10">
                <select
                  name="sexo"
                  id="sexo"
                  className="form-control"
                  value={empleadores.sexo}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Seleccione --</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="telefono" className="col-sm-2 col-form-label">
                Teléfono
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  name="telefono"
                  id="telefono"
                  placeholder="Ingrese su teléfono"
                  value={empleadores.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  id="email"
                  placeholder="Ingrese su correo electrónico"
                  value={empleadores.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <label htmlFor="password" className="col-sm-2 col-form-label">
                Contraseña
              </label>
              <div className="col-sm-10">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  id="password"
                  placeholder="Ingrese su contraseña"
                  value={empleadores.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-sm-12 text-center">
              <button type="submit" className="btn btn-primary">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
);
}    
