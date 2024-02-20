import { useState } from 'react'
import { Input } from '../../../components/Elements'

import { LinearProgress } from '../../../components/Elements'
import { useCreateProject } from '../api/createProject'
import { useNavigate } from 'react-router-dom'

const AddProject = () => {
  const { mutate: createProject, isPending, error } = useCreateProject()

  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    if (description !== '') {
      createProject(
        {
          title: 'placeholder',
          description: description
        },
        {
          onSuccess: (project) => {
            console.log('created project')
            setDescription('')
            navigate(`/projects/${project._id}`)
          },
        }
      )
    }
  }

  const handleChange = (event) => {
    setDescription(event.currentTarget.value)
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
        placeholder="breif description of your business"
        id="project"
        label="Project"
        name="project"
        autoComplete="project"
        autoFocus
        value={description}
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
