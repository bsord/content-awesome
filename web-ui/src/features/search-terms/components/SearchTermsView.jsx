import AddSearchTerm from './AddSearchTerm';
import SearchTermsList from './SearchTermsList';
import { Typography } from '../../../components/Elements';

export const SearchTermsView = () => {
  return (
    <div className="max-w-md">
      <div className="mt-6 flex flex-col items-center">
        <Typography variant="h3">Search Queries</Typography>

        
        <SearchTermsList />
      </div>
    </div>
  );
};
