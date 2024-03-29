import KeywordsListItem from './KeywordsListItem';
import { List } from '../../../components/Elements';
import KeywordRecommendations from './KeywordRecommendations';
import { useKeywordsByProject } from '../api/getKeyword';
import { useParams } from 'react-router-dom';
import AddKeyword from './AddKeyword'

const KeywordsList = () => {
  const { projectId, keywordId } = useParams();
  const { data: keywords, isLoading, error } = useKeywordsByProject(projectId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    return <span>There was an error</span>;
  }

  return (
    <List>
      <AddKeyword/>
      
      {keywords?.map((keyword, key) => {
        var active = false
        if(keyword._id == keywordId){
          active = true
        }
        return <KeywordsListItem key={key} keyword={keyword} projectId={projectId} active={active}/>;
      })}
      
      <KeywordRecommendations existingKeywords={keywords}/>
    </List>
  );
};

export default KeywordsList;
