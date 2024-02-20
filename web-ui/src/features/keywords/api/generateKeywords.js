import { axios } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const generateKeywords = (data) => {
  console.log(data)
  return axios.post(`/ai/generate_keywords`,data);
};

export const generateKeywordsFn = async (data) => {
  const response = await generateKeywords(data);
  return response.data;
};

export const useGenerateKeywords = (config) => {
  return useMutation({
    ...config,
    mutationFn: generateKeywordsFn,
  });
};