import { useState } from 'react'
import { Input } from '../../../components/Elements'

import { LinearProgress } from '../../../components/Elements'
import { useCreateContentOutline } from '../api/createContentOutline'
import { useParams
 } from 'react-router-dom'
 
const AddContentOutline = ({keywordId}) => {
  const { projectId } = useParams();
  const { mutate: createContentOutline, isPending, error } = useCreateContentOutline()

  const [contentOutline, setContentOutline] = useState('')
  
  const handleSubmit = (event) => {
    
    event.preventDefault()
    if (contentOutline !== '') {
      createContentOutline(
        {
          term: contentOutline,
          project_id: projectId,
          keyword_id: keywordId
        },
        {
          onSuccess: () => {
            console.log('created contentOutline')
            setContentOutline('')
          },
        }
      )
    }
  }

  const handleChange = (event) => {
    setContentOutline(event.currentTarget.value)
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event)
      }}
      className='w-full p-2'
    >
      <Input
        className="h-18"
        placeholder="Add a contentOutline"
        id="contentOutline"
        label="contentOutline"
        name="contentOutline"
        autoComplete="contentOutline"
        autoFocus
        value={contentOutline}
        onChange={(e) => {
          handleChange(e)
        }}
      />
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
    </form>
  )
}

export default AddContentOutline
