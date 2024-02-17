import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import { useAuthenticatedUser, useLogout } from '../../features/auth'
import { Link, NavLink } from 'react-router-dom'
import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Button,
} from '../Elements'

export const Sidebar = () => {
  const logout = useLogout()
  const { data: user } = useAuthenticatedUser()

  return (
    <Card className="h-screen w-full max-w-[20rem] p-4 shadow-sm bg-white border border-blue-gray-100 justify-between rounded-none">
      <div>
        <div className=" p-2 text-center">
          <Typography variant="h6" color="blue-gray">
            Content Awesome
          </Typography>
        </div>
        <List>
          <Link to={'/dashboard'}>
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Dashboard
            </ListItem>
          </Link>
          <NavLink
            to={'/projects'}
            className={({ isActive, isPending }) =>
              isPending ? 'bg-gray-400' : isActive ? 'bg-gray-500' : ''
            }
          >
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Projects
            </ListItem>
          </NavLink>
          <Link to={'/notifications'}>
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Notifications
              <ListItemSuffix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemSuffix>
            </ListItem>
          </Link>
        </List>
      </div>

      <div>
        <List>
          <Link to={'/notes'}>
            <ListItem>
              <ListItemPrefix>
                <FontAwesomeIcon icon={faGoogle} />
              </ListItemPrefix>
              Settings
            </ListItem>
          </Link>
          <ListItem>
            {user?.email && user.email}
            <Button
              onClick={() => {
                logout.mutate()
              }}
            >
              Logout
            </Button>
          </ListItem>
        </List>
      </div>
    </Card>
  )
}
