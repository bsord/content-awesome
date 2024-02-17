import { axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { getAuthenticatedUser } from './getAuthenticatedUser'
import storage from '@/utils/storage'

export const registerWithEmailAndPassword = (data) => {
  return axios.post('/auth/register', data)
}

async function saveTokenFromResponse(data) {
  const { token } = data
  storage.auth.setToken(token)
  return token
}

export const registerFn = async (data) => {
  const response = await registerWithEmailAndPassword(data)
  await saveTokenFromResponse(response)
  const user = await getAuthenticatedUser()
  storage.auth.setAuthenticatedUser(user)
  return user
}

export const useRegister = (config) => {
  return useMutation({
    onSuccess: (user) => {
      queryClient.setQueryData('authenticated-user', user)
    },
    ...config,
    mutationFn: registerFn,
  })
}
