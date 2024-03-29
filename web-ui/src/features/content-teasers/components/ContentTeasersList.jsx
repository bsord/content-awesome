import ContentTeasersListItem from './ContentTeasersListItem';
import { List } from '../../../components/Elements';

import { useContentTeasersBySearchTerm } from '../api/getContentTeaser';
import { useParams } from 'react-router-dom';
import ContentTeaserRecommendations from './ContentTeaserRecommendations';
import AddContentTeaser from './AddContentTeaser';

const ContentTeasersList = () => {
  const { searchTermId,keywordId,contentTeaserId } = useParams();
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
        var active = false
        if(contentTeaser._id == contentTeaserId){
          active = true
        }
        return <ContentTeasersListItem key={key} contentTeaser={contentTeaser} active={active}/>;
      })}
      <ContentTeaserRecommendations keywordId={keywordId} existingContentTeasers={contentTeasers}/>
    </List>
  );
};

export default ContentTeasersList;
