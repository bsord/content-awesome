import { ContentTeasersView } from '../components/ContentTeasersView';
import { useParams } from 'react-router-dom';
import { useContentTeaserById } from '../api/getContentTeaser';

export const ContentTeaserWorkspace = () => {
  const { contentTeaserId } = useParams();
  const { data: contentTeaser, isLoading, error } = useContentTeaserById(contentTeaserId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    console.log(error)
    return <span>There was an error</span>;
  }

  return (
    <div>
      <div>Word: {contentTeaser.term}</div>
      <div>
        <ContentTeasersView/>
      </div>
    </div>
  );

  
};
