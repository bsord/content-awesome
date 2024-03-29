import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import ContentOutlinesListItemEditor from './ContentOutlinesListItemEditor';
import { useNavigate } from 'react-router-dom'

const ContentOutlinesListItem = (props) => {
  const navigate = useNavigate()
  const { contentOutline } = props;
  const [editMode, setEditMode] = useState(false);
  console.log(contentOutline)
  return (
    <>
      {editMode ? (
        <ContentOutlinesListItemEditor
          contentOutline={contentOutline}
          handleClose={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <ListItem className="flex flex-col">
          <Typography variant="h5">{contentOutline.title}</Typography>
          <Typography >{contentOutline.teaser}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default ContentOutlinesListItem;
