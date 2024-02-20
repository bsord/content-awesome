import { useState, useEffect } from 'react'
import { Input } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { useProjectById } from '../../projects/api/getProject'
import { LinearProgress } from '../../../components/Elements'
import { useGenerateKeywords } from '../api/generateKeywords'
import { useParams
 } from 'react-router-dom'
import  KeywordRecommendationsItem  from './KeywordRecommendationsItem'

export const KeywordRecommendations = ({existingKeywords}) => {
  const { projectId } = useParams();
  const { data: project, isLoading, error } = useProjectById(projectId);

  if (isLoading) {
    return <span>Loading</span>;
  }

  if (error) {
    console.log(error)
    return <span>There was an error</span>;
  }

  return (
    <KeywordRecommendationsGenerator existingKeywords={existingKeywords} project={project}/>
  );

  
};

const KeywordRecommendationsGenerator = ({project,existingKeywords}) => {
  
  const { data: keywords, mutate: generateKeywords, isPending, error } = useGenerateKeywords();
  useEffect(()=>{
    console.log(existingKeywords)
    if(existingKeywords.length == 0 & project.description != ''){
      generateKeywords({
        input: project.description
      },
      {
        onSuccess: () => {
          console.log('generated keyword recommendations')
        },
      })
    }
  },[existingKeywords])
  const handleSubmit = (event) => {
    console.log(event)
    generateKeywords(
      {
        input: JSON.stringify({description:project.description, existingKeywords:existingKeywords, alwaysGenerateUniqueWords:true})
      },
      {
        onSuccess: () => {
          console.log('generated keyword recommendations')
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
        Get more keywords
      </Button>
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
      {keywords && keywords.map((keyword)=>{
        return(<div><KeywordRecommendationsItem keyword={keyword} project_id={project._id}/></div>)
      })}
    </div>
  )
}

export default KeywordRecommendations
