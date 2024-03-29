import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ContentOutlines } from './ContentOutline';
import {ContentOutlineWorkspace} from './ContentOutlineWorkspace'

export const ContentOutlinesRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<ContentOutlines />} />
        <Route path="/contentOutline/:contentOutlineId" element={<ContentOutlineWorkspace />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>

  );
};
