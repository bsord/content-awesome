import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Keywords } from './Keywords';
import {KeywordWorkspace} from './KeywordWorkspace'

export const KeywordsRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<Keywords />} />
        <Route path="/keywords/:keywordId/*" element={<KeywordWorkspace />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>

  );
};
