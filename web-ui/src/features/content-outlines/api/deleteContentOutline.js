import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export const deleteContentOutline = (contentOutlineId) => {
  return axios.delete(`/contentOutlines/${contentOutlineId}`);
};

export const useDeleteContentOutline = (config) => {
  return useMutation({
    onMutate: async (deletedContentOutline) => {
      await queryClient.cancelQueries(['contentOutlines']);

      const previousContentOutlines = queryClient.getQueryData(['contentOutlines'])

      queryClient.setQueryData(
        ['contentOutlines'],
        previousContentOutlines?.filter((contentOutline) => contentOutline._id !== deletedContentOutline._id)
      );

      return { previousContentOutlines };
    },
    onError: (_, __, context) => {
      if (context?.previousContentOutlines) {
        queryClient.setQueryData(['contentOutlines'], context.previousContentOutlines);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contentOutlines']);
    },
    ...config,
    mutationFn: deleteContentOutline,
  });
};