import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateContentOutline = (contentOutline) => {
  return axios.post(`/contentOutlines/${contentOutline._id}`, contentOutline);
};

export const useUpdateContentOutline = (config) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    onMutate: async (updatedContentOutline) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['contentOutlines'] });

      // Snapshot the previous value
      const previousContentOutlines = queryClient.getQueryData(['contentOutlines']);

      // Optimistically update to the new value
      queryClient.setQueryData(['contentOutlines'], (old) => [...old, updatedContentOutline]);

      // Return a context object with the snapshotted value
      return { previousContentOutlines };
    },
    onError: (err, updatedContentOutline, context) => {
      queryClient.setQueryData(['contentOutlines'], context.previousContentOutlines);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contentOutlines'] });
    },
    mutationFn: updateContentOutline,
  });
};
