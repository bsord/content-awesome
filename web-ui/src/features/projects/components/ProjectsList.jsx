import ProjectListItem from './ProjectsListItem';
import { List } from '../../../components/Elements';

import { useProjects } from '../api/getProject';

const ProjectsList = () => {
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    return <span>There was an error</span>;
  }

  return (
    <List>
      {projects?.map((project, key) => {
        return <ProjectListItem key={key} project={project} />;
      })}
    </List>
  );
};

export default ProjectsList;
