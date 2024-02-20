import SearchTermsListItem from './SearchTermsListItem';
import { List } from '../../../components/Elements';

import { useSearchTermsByKeyword } from '../api/getSearchTerm';
import { useParams } from 'react-router-dom';
import SearchTermRecommendations from './SearchTermRecommendations';
import AddSearchTerm from './AddSearchTerm';

const SearchTermsList = ({keyword}) => {
  const { keywordId } = useParams();
  const { data: searchTerms, isLoading, error } = useSearchTermsByKeyword(keywordId);
  console.log(searchTerms)
  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    return <span>There was an error</span>;
  }
  return (
    <List>
      <AddSearchTerm keywordId={keywordId}/>
      {searchTerms?.map((searchTerm, key) => {
        return <SearchTermsListItem key={key} searchTerm={searchTerm} />;
      })}
      <SearchTermRecommendations keywordId={keywordId} existingSearchTerms={searchTerms}/>
    </List>
  );
};

export default SearchTermsList;
