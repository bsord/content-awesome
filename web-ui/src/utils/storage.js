const storagePrefix = 'app_name_'

const storage = {
  auth: {
    getAuthenticatedUser: () => {
      return JSON.parse(localStorage.getItem(`${storagePrefix}auth`))
    },
    setAuthenticatedUser: (data) => {
      localStorage.setItem(`${storagePrefix}auth`, JSON.stringify(data))
    },
    clearAuthenticatedUser: () => {
      localStorage.removeItem(`${storagePrefix}auth`)
    },
    getToken: () => {
      return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`))
    },
    setToken: (token) => {
      window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token))
    },
    clearToken: () => {
      window.localStorage.removeItem(`${storagePrefix}token`)
    },
  },
}

export default storage
