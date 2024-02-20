import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteContentTeaser = (contentTeaserId) => {
  return axios.delete(`/contentTeasers/${contentTeaserId}`);
};

export const useDeleteContentTeaser = (config) => {
  return useMutation({
    onMutate: async (deletedContentTeaser) => {
      await queryClient.cancelQueries(['contentTeasers']);

      const previousContentTeasers = queryClient.getQueryData(['contentTeasers'])

      queryClient.setQueryData(
        ['contentTeasers'],
        previousContentTeasers?.filter((contentTeaser) => contentTeaser._id !== deletedContentTeaser._id)
      );

      return { previousContentTeasers };
    },
    onError: (_, __, context) => {
      if (context?.previousContentTeasers) {
        queryClient.setQueryData(['contentTeasers'], context.previousContentTeasers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contentTeasers']);
    },
    ...config,
    mutationFn: deleteContentTeaser,
  });
};