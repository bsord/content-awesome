import { useState } from 'react'
import { Input } from '../../../components/Elements'

import { LinearProgress } from '../../../components/Elements'
import { useCreateKeyword } from '../api/createKeyword'
import { useParams
 } from 'react-router-dom'
const AddKeyword = () => {
  const { projectId } = useParams();
  const { mutate: createKeyword, isPending, error } = useCreateKeyword()

  const [keyword, setKeyword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (keyword !== '') {
      createKeyword(
        {
          word: keyword,
          project_id: projectId
        },
        {
          onSuccess: () => {
            console.log('created keyword')
            setKeyword('')
          },
        }
      )
    }
  }

  const handleChange = (event) => {
    setKeyword(event.currentTarget.value)
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
        placeholder="Add a keyword"
        id="keyword"
        label="keyword"
        name="keyword"
        autoComplete="keyword"
        autoFocus
        value={keyword}
        onChange={(e) => {
          handleChange(e)
        }}
      />
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
    </form>
  )
}

export default AddKeyword
