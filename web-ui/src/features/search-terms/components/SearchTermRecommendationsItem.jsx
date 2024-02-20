import { useState } from 'react'
import { Input } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { LinearProgress } from '../../../components/Elements'
import { useCreateSearchTerm } from '../api/createSearchTerm'
import { useParams
 } from 'react-router-dom'

const SearchTermRecommendationsItem = ({searchTerm}) => {
  const { projectId, keywordId } = useParams();
  const { mutate: createSearchTerm, isPending, error } = useCreateSearchTerm()


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
            {searchTerm}
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

export default SearchTermRecommendationsItem
