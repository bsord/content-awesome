import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import KeywordsListItemEditor from './KeywordsListItemEditor';
import { useNavigate } from 'react-router-dom'

const KeywordsListItem = (props) => {
  const navigate = useNavigate()
  const { keyword, projectId } = props;
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <KeywordsListItemEditor
          keyword={keyword}
          handleClose={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <ListItem onClick={()=>{
          navigate(`/projects/${projectId}/keywords/${keyword._id}`)
        }}>
          <Typography variant="h5">{keyword.word}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default KeywordsListItem;
