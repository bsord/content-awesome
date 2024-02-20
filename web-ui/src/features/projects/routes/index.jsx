import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Projects } from './Projects';
import { ProjectWorkspace } from './ProjectWorkspace';

export const ProjectsRoutes = () => {
  return (
    <Layout title="Content Awesome">
      <Routes>
        <Route path="" element={<Projects />} />
        <Route path="/:projectId" element={<ProjectWorkspace />} />
        <Route path="/:projectId/*" element={<ProjectWorkspace />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>
    </Layout>
  );
};
