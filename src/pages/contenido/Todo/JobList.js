import { useState, useEffect } from "react";
import Axios from "../../../services/Axios";
import "../Css/JobList.css";
import { ApplyForm } from "./ApplyForm";

export function JobList({ token }) {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

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

  return (
    <div className="job-list-container">
      <h1 className="title">Trabajos disponibles</h1>
      <table className="job-list-table">
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descripción</th>
            <th>Salario</th>
            <th>Domicilio</th>
            <th>Requisitos</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id} className="job-list-item">
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>${job.salary}</td>
              <td>{job.location}</td>
              <td>{job.requirements}</td>
              <td>
                <button onClick={() => setSelectedJob(job)} className="apply-button">
                  Aplicar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedJob && (
        <div className="apply-form-container">
          <div className="apply-form-wrapper">
            <ApplyForm jobId={selectedJob._id} token={token} onClose={() => setSelectedJob(null)} />
            <button onClick={() => setSelectedJob(null)} className="cancel-button">
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
