import ContentOutlinesListItem from './ContentOutlinesListItem';
import { List } from '../../../components/Elements';

import { useContentOutlinesBySearchTerm } from '../api/getContentOutline';
import { useParams } from 'react-router-dom';
import ContentOutlineRecommendations from './ContentOutlineRecommendations';
import AddContentOutline from './AddContentOutline';

const ContentOutlinesList = () => {
  const { searchTermId,keywordId } = useParams();
  const { data: contentOutlines, isLoading, error } = useContentOutlinesBySearchTerm(searchTermId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    return <span>There was an error</span>;
  }
  return (
    <List>
      <AddContentOutline keywordId={keywordId}/>
      {contentOutlines?.map((contentOutline, key) => {
        return <ContentOutlinesListItem key={key} contentOutline={contentOutline} />;
      })}
      <ContentOutlineRecommendations keywordId={keywordId} existingContentOutlines={contentOutlines}/>
    </List>
  );
};

export default ContentOutlinesList;
