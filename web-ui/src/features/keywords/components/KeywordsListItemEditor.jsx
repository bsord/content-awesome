import { useState } from 'react';
import { Input, Button } from '../../../components/Elements';

import { LinearProgress } from '../../../components/Elements';
import { useDeleteKeyword } from '../api/deleteKeyword';
import { useUpdateKeyword } from '../api/updateKeyword';

const KeywordsListItemEditor = ({ keyword, handleClose }) => {
  const { mutate: deleteKeyword, isPending: isDeletePending, error: deleteError } = useDeleteKeyword();
  const { mutate: updateKeyword, isPending: isUpdatePending, error: updateError } = useUpdateKeyword();

  const [_keyword, setKeyword] = useState(keyword);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_keyword.word !== '') {
      updateKeyword(_keyword, {
        onSuccess: () => {
          console.log('updated keyword');
          handleClose();
        },
      });
    }
  };

  const handleTextChange = (event) => {
    setKeyword({
      ..._keyword,
      word: event.currentTarget.value,
    });
  };

  const handleDelete = () => {
    deleteKeyword(keyword._id, {
      onSuccess: () => {
        console.log('created keyword');
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
      if (_keyword.title !== '') {
        updateKeyword(_keyword);
      }
      setKeyword(keyword);
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
        id="keyword"
        label="Keyword"
        name="keyword"
        autoComplete="keyword"
        autoFocus
        multiline="true"
        value={_keyword.title}
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

export default KeywordsListItemEditor;
