import { axios } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const generateContentTeasers = (data) => {
  console.log(data)
  return axios.post(`/ai/generate_search_terms`,data);
};

export const generateContentTeasersFn = async (data) => {
  const response = await generateContentTeasers(data);
  console.log(response)
  const contentTeasers = response.data.googleSearchWithTitles.map(item => {
    return  item.blogTeaser.title
  })
  console.log(contentTeasers)
  return contentTeasers;
};

export const useGenerateContentTeasers = (config) => {
  return useMutation({
    ...config,
    mutationFn: generateContentTeasersFn,
  });
};