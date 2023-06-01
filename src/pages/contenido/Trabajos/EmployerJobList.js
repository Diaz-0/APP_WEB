import React, { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import "./EmployerJobList.css";

export function EmployerJobList({ token }) {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchUserAndJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const userResponse = await Axios.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userId = userResponse.data._id;
          setUser(userResponse.data);

          const jobsResponse = await Axios.get(`/jobs/employer/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setJobs(jobsResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserAndJobs();
  }, []);

  const getJobApplications = async (jobId) => {
    try {
      const response = await Axios.get(`/jobs/${jobId}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedJob(jobId);
      setJobApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const closeApplications = () => {
    setSelectedJob(null);
    setJobApplications([]);
  };

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
      {selectedJob && (
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
          <button className="close-button" onClick={closeApplications}>
            Cerrar
          </button>
        </div>
      )}
      <h1 className="title">Trabajos Publicados</h1>
      <table className="job-list-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Salario</th>
            <th>Domicilio</th>
            <th>Requisitos</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="job-list-item"
              onClick={() => getJobApplications(job._id)}
            >
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>${job.salary}</td>
              <td>{job.location}</td>
              <td>{job.requirements}</td>
              <td>
                <button className="view-applications-button">
                  Ver aplicaciones
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}