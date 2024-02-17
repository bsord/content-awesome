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
