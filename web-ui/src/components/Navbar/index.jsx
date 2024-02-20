
import { useAuthenticatedUser, useLogout } from '../../features/auth'

import {
  Card,
  Button,
} from '../Elements'

export const Navbar = () => {
  const logout = useLogout()
  const { data: user } = useAuthenticatedUser()

  return (
    <Card className="max-w-[40rem] items-center justify-center">
      <div className='flex flex-row items-center space-x-2 p-2'>
        <div className='justify-center items-center'>
          {user?.email && user.email}
        </div>
        <Button
        className="mt-0"
          onClick={() => {
            logout.mutate()
          }}
        >
          Logout
        </Button>

      </div>
    </Card>
  )
}
