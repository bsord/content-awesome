import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import ProjectsListItemEditor from './ProjectsListItemEditor';

const ProjectListItem = (props) => {
  const { project } = props;
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <ProjectsListItemEditor
          project={project}
          handleClose={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <ListItem
          onClick={() => {
            setEditMode(true);
          }}
        >
          <Typography variant="h5">{project.title}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default ProjectListItem;
