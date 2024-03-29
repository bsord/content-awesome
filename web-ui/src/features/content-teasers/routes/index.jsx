import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ContentTeasers } from './ContentTeasers';
import {ContentTeaserWorkspace} from './ContentTeaserWorkspace'

export const ContentTeasersRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<ContentTeasers />} />
        <Route path="/contentTeaser/:contentTeaserId/*" element={<ContentTeaserWorkspace />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>

  );
};
