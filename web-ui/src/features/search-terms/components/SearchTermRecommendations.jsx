import { useState, useEffect } from 'react'
import { Input } from '../../../components/Elements'
import { Button } from '../../../components/Elements'
import { useProjectById } from '../../projects/api/getProject'
import { LinearProgress } from '../../../components/Elements'
import { useGenerateSearchTerms } from '../api/generateSearchTerms'
import { useParams
 } from 'react-router-dom'
import  SearchTermRecommendationsItem  from '../components/SearchTermRecommendationsItem'
import { useKeywordById } from '../../keywords'

export const SearchTermRecommendations = ({existingSearchTerms}) => {
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
    <SearchTermRecommendationsGenerator project={project} keyword={keyword} existingSearchTerms={existingSearchTerms} />
  );

  
};

const SearchTermRecommendationsGenerator = ({project, keyword, existingSearchTerms}) => {
  
  const { data: searchTerms, mutate: generateSearchTerms, isPending, error } = useGenerateSearchTerms();
  useEffect(()=>{
    console.log(existingSearchTerms)
    if(existingSearchTerms.length == 0 & project.description != ''){
      generateSearchTerms({
        input: JSON.stringify({
          description: project.description,
          keyword: keyword
        })
      },
      {
        onSuccess: () => {
          console.log('generated searchTerm recommendations')
        },
      })
    }
  },[existingSearchTerms])
  const handleSubmit = (event) => {
    console.log(event)
    generateSearchTerms(
      {
        input: JSON.stringify({description:project.description, keyword: keyword, existingSearchTerms:existingSearchTerms})
      },
      {
        onSuccess: () => {
          console.log('generated searchTerm recommendations')
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
        Get more search queries
      </Button>
      {isPending && <LinearProgress />}
      {error && <span>There was an error</span>}
      {searchTerms && searchTerms.map((searchTerm)=>{
        return(<div><SearchTermRecommendationsItem searchTerm={searchTerm} project_id={project._id}/></div>)
      })}
    </div>
  )
}

export default SearchTermRecommendations
