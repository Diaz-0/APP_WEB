import React, { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import "../Trabajos/EmployerJobList.css";

export function Estado({ token }) {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
      try {
        if (selectedJob) {
          const response = await Axios.get(`/jobs/${selectedJob}/applications`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJobApplications(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchJobApplications();
  }, [selectedJob, token]);

  const acceptApplication = async (applicationId) => {
    try {
      await Axios.put(`/jobs/application/${applicationId}/accept`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Actualizar el estado o realizar cualquier otra acción después de aceptar la solicitud
    } catch (error) {
      console.error(error);
    }
  };

  const rejectApplication = async (applicationId) => {
    try {
      await Axios.put(`/jobs/application/${applicationId}/reject`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Actualizar el estado o realizar cualquier otra acción después de rechazar la solicitud
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="job-list-container">
      <div className="applications-container">
        <h2 className="title2">Aplicaciones de Trabajo</h2>
        <ul>
          {jobApplications.map((application) => (
            <li key={application._id} className="application-item">
              <p className="application-field">
                <span className="field-label">Curp:</span>{" "}
                {application.employeeProfile?.curp}
              </p>
              <p className="application-field">
                <span className="field-label">Nombre:</span>{" "}
                {application.employeeProfile?.name}
              </p>
              <p className="application-field">
                <span className="field-label">Apellido:</span>{" "}
                {application.employeeProfile?.lastName}
              </p>
              <p className="application-field">
                <span className="field-label">Fecha de Nacimiento:</span>{" "}
                {application.employeeProfile?.birthDate
                  ? new Date(application.employeeProfile.birthDate).toLocaleDateString()
                  : ""}
              </p>
              <p className="application-field">
                <span className="field-label">Dirección:</span>{" "}
                {application.employeeProfile?.address}
              </p>
              <p className="application-field">
                <span className="field-label">Género:</span>{" "}
                {application.employeeProfile?.gender}
              </p>
              <p className="application-field">
                <span className="field-label">Teléfono:</span>{" "}
                {application.employeeProfile?.phone}
              </p>
              <div className="application-buttons">
                <button
                  className="accept-button"
                  onClick={() => acceptApplication(application._id)}
                >
                  Aceptar
                </button>
                <button
                  className="reject-button"
                  onClick={() => rejectApplication(application._id)}
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
