import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import ProjectsListItemEditor from './ProjectsListItemEditor';
import { useNavigate } from 'react-router-dom'

const ProjectListItem = (props) => {
  const navigate = useNavigate()
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
            navigate(`/projects/${project._id}`)
            //setEditMode(true);
          }}
        >
          <Typography variant="h5">{project.title}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default ProjectListItem;
