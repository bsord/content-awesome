import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';


export const createSearchTerm = (data) => {
  return axios.post('/searchTerms', data);
};

export const createSearchTermFn = async (data) => {
  const { searchTerm } = await createSearchTerm(data);
  return searchTerm;
};

export const useCreateSearchTerm = (config) => {
  return useMutation({
    onMutate: async (newSearchTerm) => {
      await queryClient.cancelQueries(['searchTerms']);

      const previousSearchTerms = queryClient.getQueryData(['searchTerms']);

      queryClient.setQueryData(['searchTerms'], [...(previousSearchTerms || []), newSearchTerm]);
      console.log(previousSearchTerms);
      return { previousSearchTerms };
    },
    onError: (_, __, context) => {
      if (context?.previousSearchTerms) {
        queryClient.setQueryData(['searchTerms'], context.previousSearchTerms);
      }
    },
    onSuccess: (searchTerms) => {
      console.log(searchTerms);
      queryClient.invalidateQueries(['searchTerms']);
    },
    ...config,
    mutationFn: createSearchTermFn,
  });
};
