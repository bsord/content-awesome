import { axios } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export const getProjects = () => {
  return axios.get(`/projects`);
};

export const getProjectsFn = async () => {
  const {data} = await getProjects();
  console.log(data)
  return data;
};

export const useProjects = (config) => {
  return useQuery({
    ...config,
    queryKey: ['projects'],
    queryFn: getProjectsFn,
  });
};

export const getProjectById = (id) => {
  console.log(id)
  return axios.get(`/projects/${id}`);
};

export const getProjectByIdFn = async ({queryKey}) => {
  const [_,projectId] = queryKey
  const {data} = await getProjectById(projectId);
  console.log(data)
  return data;
};

export const useProjectById = (projectId) => {
  return useQuery({
    queryKey: ['projects', projectId],
    queryFn: getProjectByIdFn,
  });
};