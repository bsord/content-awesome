import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteSearchTerm = (searchTermId) => {
  return axios.delete(`/searchTerms/${searchTermId}`);
};

export const useDeleteSearchTerm = (config) => {
  return useMutation({
    onMutate: async (deletedSearchTerm) => {
      await queryClient.cancelQueries(['searchTerms']);

      const previousSearchTerms = queryClient.getQueryData(['searchTerms'])

      queryClient.setQueryData(
        ['searchTerms'],
        previousSearchTerms?.filter((searchTerm) => searchTerm._id !== deletedSearchTerm._id)
      );

      return { previousSearchTerms };
    },
    onError: (_, __, context) => {
      if (context?.previousSearchTerms) {
        queryClient.setQueryData(['searchTerms'], context.previousSearchTerms);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['searchTerms']);
    },
    ...config,
    mutationFn: deleteSearchTerm,
  });
};