import { axios } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import storage from '@/utils/storage'

export const getAuthenticatedUser = () => {
  return axios.get('/auth/me')
}

export const useAuthenticatedUser = (config) => {
  return useQuery({
    ...config,
    queryKey: ['authenticated-user'],
    queryFn: getAuthenticatedUser,
    initialData: storage.auth.getAuthenticatedUser ?? null,
  })
}
