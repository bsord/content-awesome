import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';


export const createKeyword = (data) => {
  return axios.post('/keywords', data);
};

export const createKeywordFn = async (data) => {
  const { keyword } = await createKeyword(data);
  return keyword;
};

export const useCreateKeyword = (config) => {
  return useMutation({
    onMutate: async (newKeyword) => {
      await queryClient.cancelQueries(['keywords']);

      const previousKeywords = queryClient.getQueryData(['keywords']);

      queryClient.setQueryData(['keywords'], [...(previousKeywords || []), newKeyword]);
      console.log(previousKeywords);
      return { previousKeywords };
    },
    onError: (_, __, context) => {
      if (context?.previousKeywords) {
        queryClient.setQueryData(['keywords'], context.previousKeywords);
      }
    },
    onSuccess: (keywords) => {
      console.log(keywords);
      queryClient.invalidateQueries(['keywords']);
    },
    ...config,
    mutationFn: createKeywordFn,
  });
};
