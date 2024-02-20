import { useState } from 'react';
import { ListItem, Typography } from '../../../components/Elements';
import SearchTermsListItemEditor from './SearchTermsListItemEditor';
import { useNavigate } from 'react-router-dom'

const SearchTermsListItem = (props) => {
  const navigate = useNavigate()
  const { searchTerm } = props;
  const [editMode, setEditMode] = useState(false);

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
          navigate(`searchterms/${searchTerm._id}`)
        }}>
          <Typography variant="h5">{searchTerm.term}</Typography>
        </ListItem>
      )}
    </>
  );
};

export default SearchTermsListItem;
