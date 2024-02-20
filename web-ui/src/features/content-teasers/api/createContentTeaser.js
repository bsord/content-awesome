import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';


export const createContentTeaser = (data) => {
  return axios.post('/contentTeasers', data);
};

export const createContentTeaserFn = async (data) => {
  const { contentTeaser } = await createContentTeaser(data);
  return contentTeaser;
};

export const useCreateContentTeaser = (config) => {
  return useMutation({
    onMutate: async (newContentTeaser) => {
      await queryClient.cancelQueries(['contentTeasers']);

      const previousContentTeasers = queryClient.getQueryData(['contentTeasers']);

      queryClient.setQueryData(['contentTeasers'], [...(previousContentTeasers || []), newContentTeaser]);
      console.log(previousContentTeasers);
      return { previousContentTeasers };
    },
    onError: (_, __, context) => {
      if (context?.previousContentTeasers) {
        queryClient.setQueryData(['contentTeasers'], context.previousContentTeasers);
      }
    },
    onSuccess: (contentTeasers) => {
      console.log(contentTeasers);
      queryClient.invalidateQueries(['contentTeasers']);
    },
    ...config,
    mutationFn: createContentTeaserFn,
  });
};
