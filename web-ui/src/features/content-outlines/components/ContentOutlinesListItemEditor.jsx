import { useState } from 'react';
import { Input, Button } from '../../../components/Elements';

import { LinearProgress } from '../../../components/Elements';
import { useDeleteContentOutline } from '../api/deleteContentOutline';
import { useUpdateContentOutline } from '../api/updateContentOutline';

const ContentOutlinesListItemEditor = ({ contentOutline, handleClose }) => {
  const { mutate: deleteContentOutline, isPending: isDeletePending, error: deleteError } = useDeleteContentOutline();
  const { mutate: updateContentOutline, isPending: isUpdatePending, error: updateError } = useUpdateContentOutline();

  const [_contentOutline, setContentOutline] = useState(contentOutline);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_contentOutline.term !== '') {
      updateContentOutline(_contentOutline, {
        onSuccess: () => {
          console.log('updated contentOutline');
          handleClose();
        },
      });
    }
  };

  const handleTextChange = (event) => {
    setContentOutline({
      ..._contentOutline,
      term: event.currentTarget.value,
    });
  };

  const handleDelete = () => {
    deleteContentOutline(contentOutline._id, {
      onSuccess: () => {
        console.log('created contentOutline');
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
      if (_contentOutline.title !== '') {
        updateContentOutline(_contentOutline);
      }
      setContentOutline(contentOutline);
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
        id="contentOutline"
        label="ContentOutline"
        name="contentOutline"
        autoComplete="contentOutline"
        autoFocus
        multiline="true"
        value={_contentOutline.title}
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

export default ContentOutlinesListItemEditor;
