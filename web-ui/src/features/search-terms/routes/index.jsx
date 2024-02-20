import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { SearchTerms } from './SearchTerms';
import {SearchTermWorkspace} from './SearchTermWorkspace'

export const SearchTermsRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<SearchTerms />} />
        <Route path="/searchterms/:searchTermId" element={<SearchTermWorkspace />} />
        <Route path="/searchterms/:searchTermId/*" element={<SearchTermWorkspace />} />
        <Route path="*" element={<Navigate to="." />} />
      </Routes>

  );
};
