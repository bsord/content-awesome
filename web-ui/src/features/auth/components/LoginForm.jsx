import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrosoft, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Typography, Checkbox } from '../../../components/Elements'

import { useLogin } from '../api/login'

export const LoginForm = () => {
  const login = useLogin()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const credentials = {
      email: data.get('email'),
      password: data.get('password'),
    }
    login.mutate(credentials, {
      onSuccess: () => navigate('/projects'),
    })
  }

  return (
    <div className="w-full p-4">
      <div className="text-center">
        <Typography variant="h2" className="mb-4">
          Sign In
        </Typography>
        <Typography className="mb-3 font-normal" variant="lead">
          Enter your email and password to Sign In.
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-100 max-w-screen-lg">
        <div className="flex flex-col gap-2 mb-4">
          <Typography variant="h6">Email Address</Typography>
          <Input
            required
            id="email"
            placeholder="Email@domain.com"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <Typography variant="h6">Password</Typography>
          <Input
            required
            name="password"
            placeholder="********"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </div>

        <div className="flex items-center justify-between gap-2 mt-6">
          <Checkbox
            name="rememberme"
            id="rememberme"
            autoComplete="rememberme"
            title="Remember you for 30 days"
          >
            <Typography variant="h6" className="text-gray-700">
              Remember me
            </Typography>
          </Checkbox>
          <Link to={'/auth/register'} unstable_viewTransition className="underline">
            Forgot Password
          </Link>
        </div>

        <Button type="submit" disabled={login.isPending} className="mt-6">
          {login.isPending && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
          Sign In
        </Button>

        {login.error && (
          <Typography variant="paragraph" className="text-red-500  my-4">
            {login?.error?.response?.data?.message ?? 'Request failed, please try again later..'}
          </Typography>
        )}

        <div className="flex flex-col gap-2 my-4">
          <Button variant="secondary">
            <FontAwesomeIcon icon={faGoogle} /> Sign In with Google
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faMicrosoft} /> Sign In with Microsoft
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faApple} /> Sign In with Appple
          </Button>
        </div>

        <div className="text-center mt-6">
          <Typography variant="lead" className="text-gray-700">
            Dont have an account?
          </Typography>
          <Link to={'/auth/register'} unstable_viewTransition className="underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}
