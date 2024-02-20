import { useState } from 'react';
import { Input, Button } from '../../../components/Elements';

import { LinearProgress } from '../../../components/Elements';
import { useDeleteContentTeaser } from '../api/deleteContentTeaser';
import { useUpdateContentTeaser } from '../api/updateContentTeaser';

const ContentTeasersListItemEditor = ({ contentTeaser, handleClose }) => {
  const { mutate: deleteContentTeaser, isPending: isDeletePending, error: deleteError } = useDeleteContentTeaser();
  const { mutate: updateContentTeaser, isPending: isUpdatePending, error: updateError } = useUpdateContentTeaser();

  const [_contentTeaser, setContentTeaser] = useState(contentTeaser);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_contentTeaser.term !== '') {
      updateContentTeaser(_contentTeaser, {
        onSuccess: () => {
          console.log('updated contentTeaser');
          handleClose();
        },
      });
    }
  };

  const handleTextChange = (event) => {
    setContentTeaser({
      ..._contentTeaser,
      term: event.currentTarget.value,
    });
  };

  const handleDelete = () => {
    deleteContentTeaser(contentTeaser._id, {
      onSuccess: () => {
        console.log('created contentTeaser');
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
      if (_contentTeaser.title !== '') {
        updateContentTeaser(_contentTeaser);
      }
      setContentTeaser(contentTeaser);
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
        id="contentTeaser"
        label="ContentTeaser"
        name="contentTeaser"
        autoComplete="contentTeaser"
        autoFocus
        multiline="true"
        value={_contentTeaser.title}
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

export default ContentTeasersListItemEditor;
