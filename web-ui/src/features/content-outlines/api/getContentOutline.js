import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getContentOutlines = () => {
  return axios.get(`/contentOutlines`);
};

export const getContentOutlinesFn = async () => {
  const {data} = await getContentOutlines();
  console.log(data)
  return data;
};

export const useContentOutlines = (config) => {
  return useQuery({
    ...config,
    queryKey: ['contentOutlines'],
    queryFn: getContentOutlinesFn,
  });
};

export const getContentOutlineById = (id) => {
  console.log(id)
  return axios.get(`/contentOutlines/${id}`);
};

export const getContentOutlineByIdFn = async ({queryKey}) => {
  const [_,contentOutlineId] = queryKey
  const {data} = await getContentOutlineById(contentOutlineId);
  console.log(data)
  return data;
};

export const useContentOutlineById = (contentOutlineId) => {
  return useQuery({
    queryKey: ['contentOutlines', contentOutlineId],
    queryFn: getContentOutlineByIdFn,
  });
};

export const getContentOutlinesByProject = (project_id) => {
  return axios.get(`/contentOutlines`,{
    params: {
      project_id: project_id
    }
  });
};

export const getContentOutlinesByProjectFn = async ({queryKey}) => {
  const [_,projectId] = queryKey
  const {data} = await getContentOutlinesByProject(projectId);
  console.log(data)
  return data;
};

export const useContentOutlinesByProject = (projectId) => {
  return useQuery({
    queryKey: ['contentOutlines', projectId],
    queryFn: getContentOutlinesByProjectFn,
  });
};

export const getContentOutlinesBySearchTerm = (searchTerm_id) => {
  return axios.get(`/contentOutlines`,{
    params: {
      searchTerm_id: searchTerm_id
    }
  });
};

export const getContentOutlinesBySearchTermFn = async ({queryKey}) => {
  const [_,searchTermId] = queryKey
  const {data} = await getContentOutlinesBySearchTerm(searchTermId);
  console.log(data)
  return data;
};

export const useContentOutlinesBySearchTerm = (searchTermId) => {
  return useQuery({
    queryKey: ['contentOutlines', searchTermId],
    queryFn: getContentOutlinesBySearchTermFn,
  });
};