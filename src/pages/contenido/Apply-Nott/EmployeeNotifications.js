import React, { useEffect, useState } from "react";
import Axios from "../../../services/Axios";
import "./EmployeeNotifications.css";

export function EmployeeNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    const fetchEmployeeId = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await Axios.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEmployeeId(response.data._id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeeId();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await Axios.get(`/jobs/employee/${employeeId}/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (employeeId) {
      fetchNotifications();
    }
  }, [employeeId]);

  return (
    <div className="employee-notifications-container">
      <h2>Notification de tu Solicitud</h2>
      {notifications.length === 0 ? (
        <p>No se encontraron notificaciones.</p>
      ) : (
        
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <strong>Titulo del Trabajo:</strong> {notification.job.title}<br />
              <span><strong>Descripción:</strong> {notification.job.description}</span>
              <span><strong>Salario:</strong> ${notification.job.salary}</span>
              <span><strong>Domicilio:</strong> {notification.job.location}</span>
              <span><strong>Requisitos:</strong> {notification.job.requirements}</span>
              <span><strong>Estado:</strong> {notification.notification}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
