import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteProject = (projectId) => {
  return axios.delete(`/projects/${projectId}`);
};

export const useDeleteProject = (config) => {
  return useMutation({
    onMutate: async (deletedProject) => {
      await queryClient.cancelQueries(['projects']);

      const previousProjects = queryClient.getQueryData(['projects'])

      queryClient.setQueryData(
        ['projects'],
        previousProjects?.filter((project) => project._id !== deletedProject._id)
      );

      return { previousProjects };
    },
    onError: (_, __, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    },
    ...config,
    mutationFn: deleteProject,
  });
};