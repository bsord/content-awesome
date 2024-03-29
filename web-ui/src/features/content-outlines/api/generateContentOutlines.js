import { axios } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

export const generateContentOutlines = (data) => {
  console.log(data)
  return axios.post(`/ai/generate_content_outline`,data);
};

export const generateContentOutlinesFn = async (data) => {
  const response = await generateContentOutlines(data);
  console.log(response)
  const contentOutline = response.data.outline
  console.log(contentOutline)
  return contentOutline;
};

export const useGenerateContentOutlines = (config) => {
  return useMutation({
    ...config,
    mutationFn: generateContentOutlinesFn,
  });
};