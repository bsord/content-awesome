import { useState } from 'react'
import { Input } from '../../../components/Elements'

import { LinearProgress } from '../../../components/Elements'
import { useCreateProject } from '../api/createProject'

const AddProject = () => {
  const { mutate: createProject, isPending, error } = useCreateProject()

  const [title, setTitle] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title !== '') {
      createProject(
        {
          title: title,
        },
        {
          onSuccess: () => {
            console.log('created project')
            setTitle('')
          },
        }
      )
    }
  }

  const handleChange = (event) => {
    setTitle(event.currentTarget.value)
  }

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event)
      }}
    >
      <Input
        id="project"
        label="Project"
        name="project"
        autoComplete="project"
        autoFocus
        value={title}
        onChange={(e) => {
          handleChange(e)
        }}
      />
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
    </form>
  )
}

export default AddProject
