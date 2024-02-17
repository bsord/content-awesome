import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrosoft, faGoogle, faApple } from '@fortawesome/free-brands-svg-icons'
import { useRegister } from '../api/register'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import { Link, useNavigate } from 'react-router-dom'
import { Button, Input, Typography, Checkbox } from '@/components/Elements'

export const RegisterForm = () => {
  const register = useRegister()
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const registration = {
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
    }

    register.mutate(registration, {
      onSuccess: () => navigate('/notes'),
    })
  }

  return (
    <div className="w-full p-4">
      <div className="text-center">
        <Typography variant="h2" className="mb-4">
          Register
        </Typography>
        <Typography className="mb-3 font-normal" variant="lead">
          Enter your email, name, and password to Sign Up.
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

        <div className="flex flex-col gap-2 mb-4 relative">
          <Typography variant="h6">Display Name</Typography>
          <Input id="name" placeholder="John Doe" name="name" autoComplete="name" />
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

        <div className="flex flex-col gap-4 mb-4">
          <Checkbox
            required
            name="termsandconditions"
            id="termsandconditions"
            autoComplete="termsandconditions"
            title="Terms and conditions are required"
          >
            <Typography variant="h6" className="text-gray-700">
              I agree to the
            </Typography>
            <Link to={'/auth/login'} unstable_viewTransition className="underline">
              Terms and Conditions
            </Link>
          </Checkbox>
          <Checkbox
            name="newsletter"
            id="newsletter"
            autoComplete="newsletter"
            title="You can change this setting later"
          >
            <Typography variant="h6" className="text-gray-700">
              Subscribe to the newsletter
            </Typography>
          </Checkbox>
        </div>

        <Button type="submit" disabled={register.isPending}>
          {register.isPending && <FontAwesomeIcon icon={faSpinner} className="animate-spin" />}
          Register
        </Button>

        {register.error && (
          <Typography variant="paragraph" className="text-red-500  my-4">
            {register?.error?.response?.data?.message ?? 'Request failed, please try again later..'}
          </Typography>
        )}

        {register.isPending && <div>loading...</div>}

        <div className="flex flex-col gap-2 my-4">
          <Button variant="secondary">
            <FontAwesomeIcon icon={faGoogle} />
            Sign Up with Google
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faMicrosoft} /> Sign Up with Microsoft
          </Button>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faApple} />
            Sign Up with Appple
          </Button>
        </div>

        <div className="text-center mt-6">
          <Typography variant="lead" className="text-gray-700">
            Already have an account?
          </Typography>
          <Link to={'/auth/login'} unstable_viewTransition className="underline">
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}
