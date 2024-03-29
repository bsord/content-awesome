import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';


export const createContentOutline = (data) => {
  return axios.post('/contentOutlines', data);
};

export const createContentOutlineFn = async (data) => {
  const { contentOutline } = await createContentOutline(data);
  return contentOutline;
};

export const useCreateContentOutline = (config) => {
  return useMutation({
    onMutate: async (newContentOutline) => {
      await queryClient.cancelQueries(['contentOutlines']);

      const previousContentOutlines = queryClient.getQueryData(['contentOutlines']);

      queryClient.setQueryData(['contentOutlines'], [...(previousContentOutlines || []), newContentOutline]);
      console.log(previousContentOutlines);
      return { previousContentOutlines };
    },
    onError: (_, __, context) => {
      if (context?.previousContentOutlines) {
        queryClient.setQueryData(['contentOutlines'], context.previousContentOutlines);
      }
    },
    onSuccess: (contentOutlines) => {
      console.log(contentOutlines);
      queryClient.invalidateQueries(['contentOutlines']);
    },
    ...config,
    mutationFn: createContentOutlineFn,
  });
};
