import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getContentTeasers = () => {
  return axios.get(`/contentTeasers`);
};

export const getContentTeasersFn = async () => {
  const {data} = await getContentTeasers();
  console.log(data)
  return data;
};

export const useContentTeasers = (config) => {
  return useQuery({
    ...config,
    queryKey: ['contentTeasers'],
    queryFn: getContentTeasersFn,
  });
};

export const getContentTeaserById = (id) => {
  console.log(id)
  return axios.get(`/contentTeasers/${id}`);
};

export const getContentTeaserByIdFn = async ({queryKey}) => {
  const [_,contentTeaserId] = queryKey
  const {data} = await getContentTeaserById(contentTeaserId);
  console.log(data)
  return data;
};

export const useContentTeaserById = (contentTeaserId) => {
  return useQuery({
    queryKey: ['contentTeasers', contentTeaserId],
    queryFn: getContentTeaserByIdFn,
  });
};

export const getContentTeasersByProject = (project_id) => {
  return axios.get(`/contentTeasers`,{
    params: {
      project_id: project_id
    }
  });
};

export const getContentTeasersByProjectFn = async ({queryKey}) => {
  const [_,projectId] = queryKey
  const {data} = await getContentTeasersByProject(projectId);
  console.log(data)
  return data;
};

export const useContentTeasersByProject = (projectId) => {
  return useQuery({
    queryKey: ['contentTeasers', projectId],
    queryFn: getContentTeasersByProjectFn,
  });
};

export const getContentTeasersBySearchTerm = (searchTerm_id) => {
  return axios.get(`/contentTeasers`,{
    params: {
      searchTerm_id: searchTerm_id
    }
  });
};

export const getContentTeasersBySearchTermFn = async ({queryKey}) => {
  const [_,searchTermId] = queryKey
  const {data} = await getContentTeasersBySearchTerm(searchTermId);
  console.log(data)
  return data;
};

export const useContentTeasersBySearchTerm = (searchTermId) => {
  return useQuery({
    queryKey: ['contentTeasers', searchTermId],
    queryFn: getContentTeasersBySearchTermFn,
  });
};