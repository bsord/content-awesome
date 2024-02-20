import { axios } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const generateSearchTerms = (data) => {
  console.log(data)
  return axios.post(`/ai/generate_search_terms`,data);
};

export const generateSearchTermsFn = async (data) => {
  const response = await generateSearchTerms(data);
  console.log(response)
  const searchTerms = response.data.googleSearchWithTitles.map(item => {
    return  item.googleSearch.searchQuery
  })
  console.log(searchTerms)
  return searchTerms;
};

export const useGenerateSearchTerms = (config) => {
  return useMutation({
    ...config,
    mutationFn: generateSearchTermsFn,
  });
};