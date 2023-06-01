import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../layouts';
import { Footer, Home, Signin, Login, JobPosting, JobList,EmployerJobList, EmployeeNotifications} from '../pages';

function loadLayouts(Layout, Page) {
  return (
    <Layout>
      <Page />
    </Layout>
  );
}

export function Rutas() {
  return (
    <Routes>
      <Route path="/Home" element={loadLayouts(Layout, Home)} />
      <Route path="/Registrarse" element={loadLayouts(Layout, Signin)} />
      <Route path="/Iniciar-Sesión" element={loadLayouts(Layout, Login)} />
      <Route path="/Publicar-Trabajos" element={loadLayouts(Layout, JobPosting)} />
      <Route path="/Lista-de-Trabajos" element={loadLayouts(Layout, JobList)} />
      <Route path="/Lista-Solicitudes" element={loadLayouts(Layout, EmployerJobList)} />
      <Route path="/Estados" element={loadLayouts(Layout, EmployeeNotifications)} />
    </Routes>
  );
}
