import { axios } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const updateKeyword = (keyword) => {
  return axios.post(`/keywords/${keyword._id}`, keyword);
};

export const useUpdateKeyword = (config) => {
  const queryClient = useQueryClient();

  return useMutation({
    ...config,
    onMutate: async (updatedKeyword) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['keywords'] });

      // Snapshot the previous value
      const previousKeywords = queryClient.getQueryData(['keywords']);

      // Optimistically update to the new value
      queryClient.setQueryData(['keywords'], (old) => [...old, updatedKeyword]);

      // Return a context object with the snapshotted value
      return { previousKeywords };
    },
    onError: (err, updatedKeyword, context) => {
      queryClient.setQueryData(['keywords'], context.previousKeywords);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['keywords'] });
    },
    mutationFn: updateKeyword,
  });
};
