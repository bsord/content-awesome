import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import SearchTermsListItemEditor from './SearchTermsListItemEditor';
import { useNavigate,useLocation } from 'react-router-dom'

const SearchTermsListItem = (props) => {
  const navigate = useNavigate()
  
  const { searchTerm, active } = props;
  const [editMode, setEditMode] = useState(false);

  var classes = ""
  if (active) {
    classes = "bg-gray-400"
  }
  return (
    <>
      {editMode ? (
        <SearchTermsListItemEditor
          searchTerm={searchTerm}
          handleClose={() => {
            setEditMode(false);
          }}
        />
      ) : (
        <ListItem  onClick={()=>{
          console.log('searchtermid', searchTerm._id)
          navigate(`../searchterms/${searchTerm._id}`, { replace: true })
        }}  className={classes}>
          <Typography variant="h5">{searchTerm.term}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default SearchTermsListItem;
