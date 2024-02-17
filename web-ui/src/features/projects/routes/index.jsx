import { Navigate, Route, Routes } from 'react-router-dom';

import { Projects } from './Projects';

export const ProjectsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Projects />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
