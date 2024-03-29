import { useState } from 'react'
import { Input } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { LinearProgress } from '../../../components/Elements'
import { useCreateContentOutline } from '../api/createContentOutline'
import { useParams
 } from 'react-router-dom'
import { Typography } from '../../../components/Elements'
const ContentOutlineRecommendationsItem = ({contentOutline}) => {
  const { projectId, searchTermId } = useParams();
  const { mutate: createContentOutline, isPending, error } = useCreateContentOutline()

  console.log(contentOutline)
  const handleSubmit = (event) => {
    event.preventDefault()
    if (contentOutline !== '') {
      createContentOutline(
        {
          project_id: projectId,
          searchTerm_id: searchTermId,
          title: contentOutline.title,
          teaser: contentOutline.teaserText
        },
        {
          onSuccess: () => {
            console.log('created contentOutline')
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
        <div className='space-y-4'>
          <div>
            <Typography variant={"h6"}>Overview:</Typography>
            <div
              className=""
            >
                {contentOutline.overview}
            </div>
          </div>
          <div>

          <Typography variant={"h6"}>Table of Contents:</Typography>
            {contentOutline.tableOfContents && <TableOfContents toc={contentOutline.tableOfContents}/>}
          </div>
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


const TableOfContents = ({toc}) => {

  return (
    <div>
      <ul className='list-disc ml-6'>
        {toc.map((item,key) =>{
          return (
            <div key={key}>
              <li className='font-bold'>{item.title}</li>
              {item.points && <Points points={item.points}/>}
            </div>
          )
        })}
      </ul>
    </div>
  )

}

const Points = ({points}) => {

  return (
    <ul className='list-[square] ml-6'>
      {points.map((point,key) =>{
        return (
          <li key={key}>{point.text}</li>
        )
      })}
    </ul>
  )

}
export default ContentOutlineRecommendationsItem
