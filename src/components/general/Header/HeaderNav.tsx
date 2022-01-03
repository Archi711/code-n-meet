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

const UserNav = () => (
  <>
    <Menu>
      <MenuButton rightIcon={<ChevronDownIcon />} as={Button}>
        Konto
      </MenuButton>
      <MenuList>
        <AppLink to='/profile/self'>
          <MenuItem>Profile</MenuItem>
        </AppLink>

        <AppLink to='/profile/self/settings'>
          <MenuItem>Settings</MenuItem>
        </AppLink>

        <AppLink to='/logout'>
          <MenuItem>Log out</MenuItem>
        </AppLink>
      </MenuList>
    </Menu>
  </>
)

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

type HeaderNavProps = {}
export default function HeaderNav(props: HeaderNavProps) {
  const user = useAppSelector((state) => state.auth.user)

  return <Flex gap='1em'>{user ? <UserNav /> : <GuestNav />}</Flex>
}
