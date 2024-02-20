import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getSearchTerms = () => {
  return axios.get(`/searchTerms`);
};

export const getSearchTermsFn = async () => {
  const {data} = await getSearchTerms();
  console.log(data)
  return data;
};

export const useSearchTerms = (config) => {
  return useQuery({
    ...config,
    queryKey: ['searchTerms'],
    queryFn: getSearchTermsFn,
  });
};

export const getSearchTermById = (id) => {
  console.log(id)
  return axios.get(`/searchTerms/${id}`);
};

export const getSearchTermByIdFn = async ({queryKey}) => {
  const [_,searchTermId] = queryKey
  const {data} = await getSearchTermById(searchTermId);
  console.log(data)
  return data;
};

export const useSearchTermById = (searchTermId) => {
  return useQuery({
    queryKey: ['searchTerms', searchTermId],
    queryFn: getSearchTermByIdFn,
  });
};

export const getSearchTermsByProject = (project_id) => {
  return axios.get(`/searchTerms`,{
    params: {
      project_id: project_id
    }
  });
};

export const getSearchTermsByProjectFn = async ({queryKey}) => {
  const [_,projectId] = queryKey
  const {data} = await getSearchTermsByProject(projectId);
  console.log(data)
  return data;
};

export const useSearchTermsByProject = (projectId) => {
  return useQuery({
    queryKey: ['searchTerms', projectId],
    queryFn: getSearchTermsByProjectFn,
  });
};

export const getSearchTermsByKeyword = (project_id) => {
  return axios.get(`/searchTerms`,{
    params: {
      keyword_id: project_id
    }
  });
};

export const getSearchTermsByKeywordFn = async ({queryKey}) => {
  const [_,keywordId] = queryKey
  const {data} = await getSearchTermsByKeyword(keywordId);
  console.log(data)
  return data;
};

export const useSearchTermsByKeyword = (keywordId) => {
  return useQuery({
    queryKey: ['searchTerms', keywordId],
    queryFn: getSearchTermsByKeywordFn,
  });
};