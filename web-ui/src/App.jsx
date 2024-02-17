import { Navigate } from 'react-router-dom'
import { Error } from './components/Error'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Landing, NotFound } from './features/misc'
import { AppProvider } from './providers/App'
import { useAuthenticatedUser } from './features/auth/api/getAuthenticatedUser'
import { AuthRoutes } from './features/auth'
import { ProjectsRoutes } from './features/projects'

const ProtectedRoute = ({ children }) => {
  const { data: user } = useAuthenticatedUser()
  if (!user) {
    return <Navigate to="/" replace />
  }

  return children
}

const router = createBrowserRouter([
  {
    path: '/projects/*',
    element: (
      <ProtectedRoute>
        <ProjectsRoutes />
      </ProtectedRoute>
    ),
    errorElement: <Error />,
  },
  {
    path: '/',
    element: <Landing />,
    errorElement: <Error />,
  },
  {
    path: '/auth/*',
    element: <AuthRoutes />,
    errorElement: <Error />,
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <Error />,
  },
])

const App = () => {
  console.log('app')
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  )
}

export default App
