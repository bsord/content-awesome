import { useState, useEffect } from 'react'
import { Input } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { useProjectById } from '../../projects/api/getProject'
import { LinearProgress } from '../../../components/Elements'
import { useGenerateContentTeasers } from '../api/generateContentTeasers'
import { useParams
 } from 'react-router-dom'
import  ContentTeaserRecommendationsItem  from './ContentTeaserRecommendationsItem'
import { useKeywordById } from '../../keywords'

export const ContentTeaserRecommendations = ({existingContentTeasers}) => {
  const { projectId, keywordId } = useParams();
  
  const { data: project } = useProjectById(projectId);
  const { data: keyword, isPending, error } = useKeywordById(keywordId, !!project);

  if (isPending) {
    return <span>Loading</span>;
  }

  if (error) {
    console.log(error)
    return <span>There was an error</span>;
  }

  return (
    <ContentTeaserRecommendationsGenerator project={project} keyword={keyword} existingContentTeasers={existingContentTeasers} />
  );

  
};

const ContentTeaserRecommendationsGenerator = ({project, keyword, existingContentTeasers}) => {
  
  const { data: contentTeasers, mutate: generateContentTeasers, isPending, error } = useGenerateContentTeasers();
  useEffect(()=>{
    console.log(existingContentTeasers)
    if(existingContentTeasers.length == 0 & project.description != ''){
      generateContentTeasers({
        input: JSON.stringify({
          description: project.description,
          keyword: keyword
        })
      },
      {
        onSuccess: () => {
          console.log('generated contentTeaser recommendations')
        },
      })
    }
  },[existingContentTeasers])
  const handleSubmit = (event) => {
    console.log(event)
    generateContentTeasers(
      {
        input: JSON.stringify({description:project.description, keyword: keyword, existingContentTeasers:existingContentTeasers})
      },
      {
        onSuccess: () => {
          console.log('generated contentTeaser recommendations')
        },
      }
    )
    
  }

  return (
    <div
      className='w-full p-2'
    >
      <Button onClick={(event) => {
        handleSubmit(event)
      }}>
        Get more teasers
      </Button>
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
      {contentTeasers && contentTeasers.map((contentTeaser)=>{
        return(<div><ContentTeaserRecommendationsItem contentTeaser={contentTeaser} project_id={project._id}/></div>)
      })}
    </div>
  )
}

export default ContentTeaserRecommendations
