import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import './index.css';

// Pages
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailsPage } from './pages/ProjectDetailsPage';
import { UnitsPage } from './pages/UnitsPage';
import { UnitDetailsPage } from './pages/UnitDetailsPage';
import { DevelopersPage } from './pages/DevelopersPage';
import { ZonesPage } from './pages/ZonesPage';
import { ContactPage } from './pages/ContactPage';

import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageProjects } from './pages/admin/ManageProjects';
import { ManageDevelopers } from './pages/admin/ManageDevelopers';
import { ManageUnits } from './pages/admin/ManageUnits';
import { ManageZones } from './pages/admin/ManageZones';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/units" element={<UnitsPage />} />
          <Route path="/units/:id" element={<UnitDetailsPage />} />
          <Route path="/zones" element={<ZonesPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Auth */}
          <Route path="/login" element={<AdminLogin />} />

          {/* Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="projects" element={<ManageProjects />} />
              <Route path="developers" element={<ManageDevelopers />} />
              <Route path="units" element={<ManageUnits />} />
              <Route path="zones" element={<ManageZones />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" />
    </QueryClientProvider>
  </StrictMode>
);
