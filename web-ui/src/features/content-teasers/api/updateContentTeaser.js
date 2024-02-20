import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateContentTeaser = (contentTeaser) => {
  return axios.post(`/contentTeasers/${contentTeaser._id}`, contentTeaser);
};

export const useUpdateContentTeaser = (config) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    onMutate: async (updatedContentTeaser) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['contentTeasers'] });

      // Snapshot the previous value
      const previousContentTeasers = queryClient.getQueryData(['contentTeasers']);

      // Optimistically update to the new value
      queryClient.setQueryData(['contentTeasers'], (old) => [...old, updatedContentTeaser]);

      // Return a context object with the snapshotted value
      return { previousContentTeasers };
    },
    onError: (err, updatedContentTeaser, context) => {
      queryClient.setQueryData(['contentTeasers'], context.previousContentTeasers);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['contentTeasers'] });
    },
    mutationFn: updateContentTeaser,
  });
};
