import { useState } from 'react'
import { Input } from '../../../components/Elements'

import { LinearProgress } from '../../../components/Elements'
import { useCreateContentTeaser } from '../api/createContentTeaser'
import { useParams
 } from 'react-router-dom'
 
const AddContentTeaser = ({keywordId}) => {
  const { projectId } = useParams();
  const { mutate: createContentTeaser, isPending, error } = useCreateContentTeaser()

  const [contentTeaser, setContentTeaser] = useState('')
  
  const handleSubmit = (event) => {
    
    event.preventDefault()
    if (contentTeaser !== '') {
      createContentTeaser(
        {
          term: contentTeaser,
          project_id: projectId,
          keyword_id: keywordId
        },
        {
          onSuccess: () => {
            console.log('created contentTeaser')
            setContentTeaser('')
          },
        }
      )
    }
  }

  const handleChange = (event) => {
    setContentTeaser(event.currentTarget.value)
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
        placeholder="Add a contentTeaser"
        id="contentTeaser"
        label="contentTeaser"
        name="contentTeaser"
        autoComplete="contentTeaser"
        autoFocus
        value={contentTeaser}
        onChange={(e) => {
          handleChange(e)
        }}
      />
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
    </form>
  )
}

export default AddContentTeaser
