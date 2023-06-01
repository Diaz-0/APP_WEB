import { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import './JobPosting.css';

export function JobPosting () {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [requirements, setRequirements] = useState("");
  const [user, setUser] = useState(null); // Nuevo estado para almacenar el usuario actual

  useEffect(() => {
    // Buscar el usuario actual al cargar el componente
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await Axios.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/jobs", {
        title,
        description,
        salary,
        location,
        requirements,
        employer: user._id // Usar el ID del usuario actual como employer
      });
      // Actualizar el estado del trabajo con la respuesta del servidor
      const newJob = response.data;
      // Realizar cualquier acción adicional después de publicar el trabajo
      // Resetear los valores del formulario
      setTitle("");
      setDescription("");
      setSalary("");
      setLocation("");
      setRequirements("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="job-posting">
      <h1>Publicar trabajo</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="salary">Salario</label>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Ubicación</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirements">Requisitos</label>
          <textarea
            id="requirements"
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          />
        </div>
        <button type="submit">Publicar trabajo</button>
      </form>
    </div>
  );
}
