import { useState } from 'react';
import { Input, Button } from '../../../components/Elements';

import { LinearProgress } from '../../../components/Elements';
import { useDeleteSearchTerm } from '../api/deleteSearchTerm';
import { useUpdateSearchTerm } from '../api/updateSearchTerm';

const SearchTermsListItemEditor = ({ searchTerm, handleClose }) => {
  const { mutate: deleteSearchTerm, isPending: isDeletePending, error: deleteError } = useDeleteSearchTerm();
  const { mutate: updateSearchTerm, isPending: isUpdatePending, error: updateError } = useUpdateSearchTerm();

  const [_searchTerm, setSearchTerm] = useState(searchTerm);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_searchTerm.term !== '') {
      updateSearchTerm(_searchTerm, {
        onSuccess: () => {
          console.log('updated searchTerm');
          handleClose();
        },
      });
    }
  };

  const handleTextChange = (event) => {
    setSearchTerm({
      ..._searchTerm,
      term: event.currentTarget.value,
    });
  };

  const handleDelete = () => {
    deleteSearchTerm(searchTerm._id, {
      onSuccess: () => {
        console.log('created searchTerm');
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
      if (_searchTerm.title !== '') {
        updateSearchTerm(_searchTerm);
      }
      setSearchTerm(searchTerm);
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
        id="searchTerm"
        label="SearchTerm"
        name="searchTerm"
        autoComplete="searchTerm"
        autoFocus
        multiline="true"
        value={_searchTerm.title}
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

export default SearchTermsListItemEditor;
