import { KeywordsView } from '../components/KeywordsView';
import { useParams } from 'react-router-dom';
import { useKeywordById } from '../api/getKeyword';
import {SearchTermsRoutes} from '../../search-terms'
export const KeywordWorkspace = () => {
  const { keywordId } = useParams();
  const { data: keyword, isLoading, error } = useKeywordById(keywordId);

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
          <KeywordsView/>
        </div>
        <div>
        <SearchTermsRoutes />
        </div>
      </div>
    </div>
  );

  
};
