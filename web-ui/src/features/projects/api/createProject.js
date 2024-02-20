import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const generateProjectTitle = (data) => {
  return axios.post('/ai/generate_project_title', data);
};

export const createProject = (data) => {
  return axios.post('/projects', data);
};

export const createProjectFn = async (data) => {
  //override title
  const generatedTitle = await generateProjectTitle({input:data.description})
  data = {...data, title: generatedTitle.data}
  const { project } = await createProject(data);
  return project;
};

export const useCreateProject = (config) => {
  return useMutation({
    onMutate: async (newProject) => {
      await queryClient.cancelQueries(['projects']);

      const previousProjects = queryClient.getQueryData(['projects']);

      queryClient.setQueryData(['projects'], [...(previousProjects || []), newProject]);
      console.log(previousProjects);
      return { previousProjects };
    },
    onError: (_, __, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
    },
    onSuccess: (projects) => {
      console.log(projects);
      queryClient.invalidateQueries(['projects']);
    },
    ...config,
    mutationFn: createProjectFn,
  });
};
