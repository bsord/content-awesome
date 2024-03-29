import { useParams } from 'react-router-dom';
import { useProjectById } from '../api/getProject';
import {KeywordsRoutes} from '../../keywords'
import { Card,Typography } from '../../../components/Elements'
import { SearchTermsRoutes } from '../../search-terms';
import { ContentTeasersRoutes } from '../../content-teasers'

export const ProjectWorkspace = () => {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProjectById(projectId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    console.log(error)
    return <span>There was an error</span>;
  }

  return (
    <div>
      <Card className="border border-b-2 mb-4">
      <div className='flex flex-col space-x-2 p-2'>
        <div className=''>
          <Typography variant="h4" className="ml-2">{project.title}</Typography>
        </div>
        
        {
        project.description&&
          <Typography>{project.description}</Typography>
        }

      </div>
    </Card>
      <div className='flex flex-cols'>
        <KeywordsRoutes />
        </div>
      
    </div>
  );

  
};
