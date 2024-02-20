import ContentTeasersListItem from './ContentTeasersListItem';
import { List } from '../../../components/Elements';

import { useContentTeasersBySearchTerm } from '../api/getContentTeaser';
import { useParams } from 'react-router-dom';
import ContentTeaserRecommendations from './ContentTeaserRecommendations';
import AddContentTeaser from './AddContentTeaser';

const ContentTeasersList = () => {
  const { searchTermId,keywordId } = useParams();
  const { data: contentTeasers, isLoading, error } = useContentTeasersBySearchTerm(searchTermId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    return <span>There was an error</span>;
  }
  return (
    <List>
      <AddContentTeaser keywordId={keywordId}/>
      {contentTeasers?.map((contentTeaser, key) => {
        return <ContentTeasersListItem key={key} contentTeaser={contentTeaser} />;
      })}
      <ContentTeaserRecommendations keywordId={keywordId} existingContentTeasers={contentTeasers}/>
    </List>
  );
};

export default ContentTeasersList;
