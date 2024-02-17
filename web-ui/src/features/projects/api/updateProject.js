import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateProject = (project) => {
  return axios.post(`/projects/${project._id}`, project);
};

export const useUpdateProject = (config) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    onMutate: async (updatedProject) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['projects'] });

      // Snapshot the previous value
      const previousProjects = queryClient.getQueryData(['projects']);

      // Optimistically update to the new value
      queryClient.setQueryData(['projects'], (old) => [...old, updatedProject]);

      // Return a context object with the snapshotted value
      return { previousProjects };
    },
    onError: (err, updatedProject, context) => {
      queryClient.setQueryData(['projects'], context.previousProjects);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    mutationFn: updateProject,
  });
};
