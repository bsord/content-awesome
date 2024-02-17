import { useState } from 'react';
import { Input, Button } from '../../../components/Elements';

import { LinearProgress } from '../../../components/Elements';
import { useDeleteProject } from '../api/deleteProject';
import { useUpdateProject } from '../api/updateProject';

const ProjectsListItemEditor = ({ project, handleClose }) => {
  const { mutate: deleteProject, isPending: isDeletePending, error: deleteError } = useDeleteProject();
  const { mutate: updateProject, isPending: isUpdatePending, error: updateError } = useUpdateProject();

  const [_project, setProject] = useState(project);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_project.title !== '') {
      updateProject(_project, {
        onSuccess: () => {
          console.log('updated project');
          handleClose();
        },
      });
    }
  };

  const handleTextChange = (event) => {
    setProject({
      ..._project,
      title: event.currentTarget.value,
    });
  };

  const handleDelete = () => {
    deleteProject(project._id, {
      onSuccess: () => {
        console.log('created project');
        handleClose();
      },
    });
  };

  const handleOnBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      handleClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      if (_project.title !== '') {
        updateProject(_project);
      }
      setProject(project);
      handleClose();
    }
  };

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
      onBlur={(event) => {
        handleOnBlur(event);
      }}
    >
      <Input
        margin="normal"
        id="project"
        label="Project"
        name="project"
        autoComplete="project"
        autoFocus
        multiline="true"
        value={_project.title}
        onKeyDown={(e) => {
          handleKeyDown(e);
        }}
        onChange={(e) => {
          handleTextChange(e);
        }}
      />
      <Button
        onClick={() => {
          handleDelete();
        }}
      >
        x
      </Button>
      {isDeletePending || (isUpdatePending && <LinearProgress />)}
      {deleteError || (updateError && <span>failed to delete</span>)}
    </form>
  );
};

export default ProjectsListItemEditor;
