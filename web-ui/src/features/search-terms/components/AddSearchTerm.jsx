import { useState } from 'react'
import { Input } from '../../../components/Elements'

import { LinearProgress } from '../../../components/Elements'
import { useCreateSearchTerm } from '../api/createSearchTerm'
import { useParams
 } from 'react-router-dom'
 
const AddSearchTerm = ({keywordId}) => {
  const { projectId } = useParams();
  const { mutate: createSearchTerm, isPending, error } = useCreateSearchTerm()

  const [searchTerm, setSearchTerm] = useState('')
  
  const handleSubmit = (event) => {
    
    event.preventDefault()
    if (searchTerm !== '') {
      createSearchTerm(
        {
          term: searchTerm,
          project_id: projectId,
          keyword_id: keywordId
        },
        {
          onSuccess: () => {
            console.log('created searchTerm')
            setSearchTerm('')
          },
        }
      )
    }
  }

  const handleChange = (event) => {
    setSearchTerm(event.currentTarget.value)
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
        placeholder="Add a searchTerm"
        id="searchTerm"
        label="searchTerm"
        name="searchTerm"
        autoComplete="searchTerm"
        autoFocus
        value={searchTerm}
        onChange={(e) => {
          handleChange(e)
        }}
      />
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
    </form>
  )
}

export default AddSearchTerm
