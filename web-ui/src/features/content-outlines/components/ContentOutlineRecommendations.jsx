import { useState, useEffect } from 'react'
import { Input, List } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { useProjectById } from '../../projects/api/getProject'
import { LinearProgress } from '../../../components/Elements'
import { useGenerateContentOutlines } from '../api/generateContentOutlines'
import { useContentTeaserById } from '../../content-teasers'
import { useParams
 } from 'react-router-dom'
import  ContentOutlineRecommendationsItem  from './ContentOutlineRecommendationsItem'
import { useKeywordById } from '../../keywords'

export const ContentOutlineRecommendations = ({existingContentOutlines}) => {
  const { projectId, keywordId,contentTeaserId } = useParams();
  
  const { data: project } = useProjectById(projectId);
  const { data: keyword, isPending, error } = useKeywordById(keywordId, !!project);
  const { data: teaser } = useContentTeaserById(contentTeaserId);

  if (isPending) {
    return <span>Loading</span>;
  }

  if (error) {
    console.log(error)
    return <span>There was an error</span>;
  }

  return (
    <ContentOutlineRecommendationsGenerator project={project} keyword={keyword} existingContentOutlines={existingContentOutlines} teaser={teaser}/>
  );

  
};

const ContentOutlineRecommendationsGenerator = ({project, keyword, existingContentOutlines, teaser}) => {
  console.log(teaser)
  const { data: contentOutline, mutate: generateContentOutlines, isPending, error } = useGenerateContentOutlines();
  useEffect(()=>{
    console.log(existingContentOutlines)
    if(existingContentOutlines.length == 0 & project.description != ''){
      generateContentOutlines({
         input: JSON.stringify({title:teaser.title, subtext:teaser.teaser})
      },
      {
        onSuccess: () => {
          console.log('generated contentOutline recommendations')
        },
      })
    }
  },[existingContentOutlines])
  const handleSubmit = (event) => {
    console.log(event)
    generateContentOutlines(
      {
        input: JSON.stringify({title:teaser.title, subtext:teaser.teaser})
      },
      {
        onSuccess: () => {
          console.log('generated contentOutline recommendations')
        },
      }
    )
    
  }

  if(error){
    console.log(error)
  }

  return (
    <div
      className='w-full p-2'
    >
      <Button onClick={(event) => {
        handleSubmit(event)
      }}>
        Generate again
      </Button>
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}

      
      {contentOutline && <ContentOutlineRecommendationsItem contentOutline={contentOutline} project_id={project._id}/>}
      

    </div>
  )
}

export default ContentOutlineRecommendations
