import AddProject from './AddProject';
import ProjectsList from './ProjectsList';
import { Typography } from '../../../components/Elements';

export const ProjectsView = () => {
  return (
    <div className="max-w-md">
      <div className="mt-6 flex flex-col items-center">
        <Typography variant="h3">Projects</Typography>

        <AddProject />
        <ProjectsList />
      </div>
    </div>
  );
};
