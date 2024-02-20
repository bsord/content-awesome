import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const generateKeywords = (data) => {
  return axios.post('/ai/generate_keywords', data);
};

export const getKeywords = () => {
  return axios.get(`/keywords`);
};

export const getKeywordsFn = async () => {
  const {data} = await getKeywords();
  console.log(data)
  return data;
};

export const useKeywords = (config) => {
  return useQuery({
    ...config,
    queryKey: ['keywords'],
    queryFn: getKeywordsFn,
  });
};

export const getKeywordById = (id) => {
  console.log(id)
  return axios.get(`/keywords/${id}`);
};

export const getKeywordByIdFn = async ({queryKey}) => {
  const [_,keywordId] = queryKey
  const {data} = await getKeywordById(keywordId);
  console.log(data)
  return data;
};

export const useKeywordById = (keywordId, enabled) => {
  return useQuery({
    queryKey: ['keywords', keywordId],
    queryFn: getKeywordByIdFn,
    enabled: enabled
  });
};

export const getKeywordsByProject = (project_id) => {
  return axios.get(`/keywords`,{
    params: {
      project_id: project_id
    }
  });
};

export const getKeywordsByProjectFn = async ({queryKey}) => {
  const [_,projectId] = queryKey
  const {data} = await getKeywordsByProject(projectId);
  console.log(data)
  return data;
};

export const useKeywordsByProject = (projectId) => {
  return useQuery({
    queryKey: ['keywords', projectId],
    queryFn: getKeywordsByProjectFn,
  });
};