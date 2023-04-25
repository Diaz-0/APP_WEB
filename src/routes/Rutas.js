import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../layouts';
import { Footer, Home, Signin, Login, JobPosting, JobList,EmployerJobList} from '../pages';

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
      <Route path="/" element={loadLayouts(Layout, Home)} />
      <Route path="/sg" element={loadLayouts(Layout, Signin)} />
      <Route path="/lg" element={loadLayouts(Layout, Login)} />
      <Route path="/jp" element={loadLayouts(Layout, JobPosting)} />
      <Route path="/jl" element={loadLayouts(Layout, JobList)} />
      <Route path="/s" element={loadLayouts(Layout, EmployerJobList)} />
    </Routes>
  );
}

