import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteKeyword = (keywordId) => {
  return axios.delete(`/keywords/${keywordId}`);
};

export const useDeleteKeyword = (config) => {
  return useMutation({
    onMutate: async (deletedKeyword) => {
      await queryClient.cancelQueries(['keywords']);

      const previousKeywords = queryClient.getQueryData(['keywords'])

      queryClient.setQueryData(
        ['keywords'],
        previousKeywords?.filter((keyword) => keyword._id !== deletedKeyword._id)
      );

      return { previousKeywords };
    },
    onError: (_, __, context) => {
      if (context?.previousKeywords) {
        queryClient.setQueryData(['keywords'], context.previousKeywords);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['keywords']);
    },
    ...config,
    mutationFn: deleteKeyword,
  });
};