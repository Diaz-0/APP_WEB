import { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import "../Css/EmployerJobList.css";

export function EmployerJobList({ token }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await Axios.get("/jobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [token]);

  const fetchApplications = async (jobId) => {
    try {
      const response = await Axios.get(`/jobs/${jobId}/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewApplications = async (job) => {
    await fetchApplications(job._id);
  };

  return (
    <div className="job-list2-container">
      <h1 className="title2">Trabajos publicados</h1>
      <table className="job-list2-table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Salario</th>
            <th>Domicilio</th>
            <th>Requisitos</th>
            <th>Solicitudes</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="job-list2-item">
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>${job.salary}</td>
              <td>{job.location}</td>
              <td>{job.requirements}</td>
              <td>
                <button onClick={() => handleViewApplications(job)} className="view-applications-button">
                  Ver Solicitudes
                </button>
              </td>
            </tr>
          ))}
          {applications.length > 0 && (
            <tr>
              <td colSpan="6">
                <table className="applications-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Telefono</th>
                      <th>Mensaje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((application) => (
                      <tr key={application._id} className="application-item">
                        <td>{application.name}</td>
                        <td>{application.email}</td>
                        <td>{application.phone}</td>
                        <td>{application.resume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
