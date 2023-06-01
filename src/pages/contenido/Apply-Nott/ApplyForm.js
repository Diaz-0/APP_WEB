import React, { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import "./ApplyForm.css";

export function ApplyForm({ jobId, token }) {
  const [applicant, setApplicant] = useState({});
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

  const fetchProfileId = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await Axios.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicant((prevApplicant) => ({
          ...prevApplicant,
          employeeProfileId: response.data._id,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfileId();
  }, []);

  const handleConfirm = (event) => {
    event.preventDefault();
    applyToJob();
  };

  return (
    <div className="apply-form2-container">
      <h1 className="title4">Aplicar al Trabajo</h1>
      {error && <div className="error-message">{error.message}</div>}
      <form onSubmit={handleConfirm}>
        <button className="confirm-button" type="submit">
          Confirmar
        </button>
      </form>
    </div>
  );
}
