import { axios } from '@/lib/axios'
import { useMutation } from '@tanstack/react-query'
import { queryClient } from '@/lib/react-query'
import { getAuthenticatedUser } from './getAuthenticatedUser'
import storage from '@/utils/storage'

export const loginWithEmailAndPassword = (data) => {
  return axios.post('/auth/login', data)
}

async function saveTokenFromResponse(data) {
  const { token } = data
  storage.auth.setToken(token)
  return token
}

export const loginFn = async (data) => {
  const response = await loginWithEmailAndPassword(data)
  await saveTokenFromResponse(response)
  const user = await getAuthenticatedUser()
  storage.auth.setAuthenticatedUser(user)
  return user
}

export const useLogin = (config) => {
  return useMutation({
    onSuccess: (user) => {
      queryClient.setQueryData('authenticated-user', user)
    },
    ...config,
    mutationFn: loginFn,
  })
}
