import { useState } from 'react'
import { Input } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { LinearProgress } from '../../../components/Elements'
import { useCreateKeyword } from '../api/createKeyword'
import { useParams
 } from 'react-router-dom'

const KeywordRecommendationsItem = ({keyword}) => {
  const { projectId } = useParams();
  const { mutate: createKeyword, isPending, error } = useCreateKeyword()


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
          },
        }
      )
    }
  }

  return (
    <form
      className='w-full p-2 '
    >
      <div className=' flex flex-row w-full border-b pb-2 border-gray-300'>
        <div
          className="mb-0 flex flex-1"
        >
            {keyword}
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

export default KeywordRecommendationsItem
