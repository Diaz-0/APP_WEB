import { useState } from "react";
import Axios from "../../../services/Axios";
import "../Css/ApplyForm.css";

export function ApplyForm({ jobId, token }) {
  const [applicant, setApplicant] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });
  const [error, setError] = useState(null);

  const applyToJob = async () => {
    try {
      const response = await Axios.post(`/jobs/${jobId}/apply`, applicant, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      alert("¡Aplicado al trabajo con éxito!");
    } catch (error) {
      console.error(error);
      alert("No se pudo aplicar al trabajo.");
      setError(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApplicant((prevApplicant) => ({
      ...prevApplicant,
      [name]: value,
    }));
  };

  return (
    <div className="apply-form-container">
      <h1 className="title">Aplicar al Trabajo</h1>
      {error && <div className="error-message">{error.message}</div>}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          applyToJob();
        }}
      >
        <div className="input-container">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={applicant.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={applicant.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={applicant.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="input-container">
          <textarea
            name="resume"
            placeholder="Resume"
            value={applicant.resume}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="submit-button" type="submit">Aplicar</button>
      </form>
    </div>
  );
}
