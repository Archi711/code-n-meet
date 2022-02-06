import { ChevronDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../app/hooks'
import AppLink from '../../custom/AppLink'

const UserNav = ({ id }: { id: number }) => {
  return (
    <Flex gap={4} direction={'row'}>
      <AppLink to='/groups'>
        <Button>Groups</Button>
      </AppLink>
      <Menu>
        <MenuButton rightIcon={<ChevronDownIcon />} as={Button}>
          Account
        </MenuButton>
        <MenuList>
          <AppLink to={`/profile/${id}`}>
            <MenuItem>Profile</MenuItem>
          </AppLink>

          <AppLink to={`/profile/${id}/settings`}>
            <MenuItem>Settings</MenuItem>
          </AppLink>

          <AppLink to='/logout'>
            <MenuItem>Log out</MenuItem>
          </AppLink>
        </MenuList>
      </Menu>
    </Flex>
  )
}

const GuestNav = () => (
  <>
    <AppLink to='/login'>
      <Button>Log in</Button>
    </AppLink>

    <AppLink to='/signup'>
      <Button>Sign up</Button>
    </AppLink>
  </>
)

export default function HeaderNav() {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <Flex gap='1em'>
      <AppLink to='/about'>
        <Button>About</Button>
      </AppLink>
      {user ? <UserNav id={user.id} /> : <GuestNav />}
    </Flex>
  )
}
