import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Preview from './pages/Preview.jsx'; // TEMP: design preview, remove with its route
import Login from './pages/admin/Login.jsx';
import ProtectedRoute from './components/admin/ProtectedRoute.jsx';
import AdminLayout from './components/admin/AdminLayout.jsx';
import Dashboard from './pages/admin/Dashboard.jsx';
import ProfileEditor from './pages/admin/ProfileEditor.jsx';
import ProjectsAdmin from './pages/admin/ProjectsAdmin.jsx';
import SkillsAdmin from './pages/admin/SkillsAdmin.jsx';
import ExperienceAdmin from './pages/admin/ExperienceAdmin.jsx';
import CertificatesAdmin from './pages/admin/CertificatesAdmin.jsx';
import MessagesAdmin from './pages/admin/MessagesAdmin.jsx';

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route path="/" element={<Home />} />
      <Route path="/preview" element={<Preview />} /> {/* TEMP: design preview */}

      {/* Admin */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfileEditor />} />
        <Route path="projects" element={<ProjectsAdmin />} />
        <Route path="skills" element={<SkillsAdmin />} />
        <Route path="experience" element={<ExperienceAdmin />} />
        <Route path="certificates" element={<CertificatesAdmin />} />
        <Route path="messages" element={<MessagesAdmin />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
