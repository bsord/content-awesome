import { SearchTermsView } from '../components/SearchTermsView';
import { useParams } from 'react-router-dom';
import { useSearchTermById } from '../api/getSearchTerm';
import {ContentTeasersRoutes} from '../../content-teasers'

export const SearchTermWorkspace = () => {
  const { searchTermId } = useParams();
  const { data: searchTerm, isLoading, error } = useSearchTermById(searchTermId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    console.log(error)
    return <span>There was an error</span>;
  }

  return (
    <div>
      <div className='flex flex-row'>
        <div>
          <SearchTermsView/>
        </div>
        <div>
          <ContentTeasersRoutes />
        </div>
      </div>
    </div>
  );

  
};
