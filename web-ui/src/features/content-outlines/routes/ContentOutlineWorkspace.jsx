import { ContentOutlinesView } from '../components/ContentOutlinesView';
import { useParams } from 'react-router-dom';
import { useContentOutlineById } from '../api/getContentOutline';

export const ContentOutlineWorkspace = () => {
  const { contentOutlineId } = useParams();
  const { data: contentOutline, isLoading, error } = useContentOutlineById(contentOutlineId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    console.log(error)
    return <span>There was an error</span>;
  }

  return (
    <div>
      
      <div>
        <ContentOutlinesView/>
      </div>
    </div>
  );

  
};
