import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import ContentTeasersListItemEditor from './ContentTeasersListItemEditor';
import { useNavigate } from 'react-router-dom'

const ContentTeasersListItem = (props) => {
  const navigate = useNavigate()
  const { contentTeaser } = props;
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {editMode ? (
        <ContentTeasersListItemEditor
          contentTeaser={contentTeaser}
          handleClose={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <ListItem>
          <Typography variant="h5">{contentTeaser.term}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default ContentTeasersListItem;
