import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import ContentTeasersListItemEditor from './ContentTeasersListItemEditor';
import { useNavigate } from 'react-router-dom'

const ContentTeasersListItem = (props) => {
  const navigate = useNavigate()
  const { contentTeaser, active } = props;
  const [editMode, setEditMode] = useState(false);
  console.log(contentTeaser)

  var classes = "flex flex-col"
  if (active) {
    classes = "flex flex-col bg-gray-400"
  }
  
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
        <ListItem onClick={()=>{
          console.log('contentTeaser', contentTeaser._id)
          navigate(`../contentTeaser/${contentTeaser._id}`, { replace: true })
        }} className={classes}>
          <Typography variant="h5">{contentTeaser.title}</Typography>
          <Typography >{contentTeaser.teaser}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default ContentTeasersListItem;
