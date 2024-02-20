import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateSearchTerm = (searchTerm) => {
  return axios.post(`/searchTerms/${searchTerm._id}`, searchTerm);
};

export const useUpdateSearchTerm = (config) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    onMutate: async (updatedSearchTerm) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['searchTerms'] });

      // Snapshot the previous value
      const previousSearchTerms = queryClient.getQueryData(['searchTerms']);

      // Optimistically update to the new value
      queryClient.setQueryData(['searchTerms'], (old) => [...old, updatedSearchTerm]);

      // Return a context object with the snapshotted value
      return { previousSearchTerms };
    },
    onError: (err, updatedSearchTerm, context) => {
      queryClient.setQueryData(['searchTerms'], context.previousSearchTerms);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['searchTerms'] });
    },
    mutationFn: updateSearchTerm,
  });
};
