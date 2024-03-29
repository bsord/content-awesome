import { useState } from 'react'
import { Input } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { LinearProgress } from '../../../components/Elements'
import { useCreateContentTeaser } from '../api/createContentTeaser'
import { useParams
 } from 'react-router-dom'

const ContentTeaserRecommendationsItem = ({contentTeaser}) => {
  const { projectId, searchTermId } = useParams();
  const { mutate: createContentTeaser, isPending, error } = useCreateContentTeaser()

  console.log(contentTeaser)
  const handleSubmit = (event) => {
    event.preventDefault()
    if (contentTeaser !== '') {
      createContentTeaser(
        {
          project_id: projectId,
          searchTerm_id: searchTermId,
          title: contentTeaser.title,
          teaser: contentTeaser.teaserText
        },
        {
          onSuccess: () => {
            console.log('created contentTeaser')
          },
        }
      )
    }
  }

  return (
    <form
      className='w-full p-2 '
    >
      <div className=' flex flex-col w-full border-b pb-2 border-gray-300'>
        <div
          className="mb-0 flex flex-1 font-bold"
        >
            {contentTeaser.title}
        </div>
        <div
          className="mb-0 flex flex-1"
        >
            {contentTeaser.teaserText}
        </div>
        <div className='flex'>
          <button className="p-2 m-0 p-0 mt-0" type="submit" onClick={(event) => {
            handleSubmit(event)
          }}>
            +
          </button>
        </div>
      
      </div>
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
    </form>
  )
}

export default ContentTeaserRecommendationsItem
