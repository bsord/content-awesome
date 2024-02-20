import { useParams } from 'react-router-dom';
import { useProjectById } from '../api/getProject';
import {KeywordsRoutes} from '../../keywords'

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
      <div>Title: {project.title}</div>

      {
        project.description? 
        <div>Description: {project.description}</div>
        :
        <div>no description</div>
      }
      <div>
        <KeywordsRoutes />
      </div>
    </div>
  );

  
};
