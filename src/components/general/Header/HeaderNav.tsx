import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useAppSelector } from '../../../app/hooks'
import AppLink from '../../custom/AppLink'


const UserNav = () => (
  <>
    <Menu>
      <MenuButton rightIcon={<ChevronDownIcon />} as={Button}>Konto</MenuButton>
      <MenuList>
        <MenuItem><AppLink to='/profile/self'>Profil</AppLink></MenuItem>
        <MenuItem><AppLink to='/profile/self/settings'>Ustawienia</AppLink></MenuItem>
        <MenuItem><AppLink to='/logout'>Wyloguj</AppLink></MenuItem>
      </MenuList>
    </Menu>
  </>
)

const GuestNav = () => (
  <>
    <Button><AppLink to='/login'>Zaloguj</AppLink></Button>
    <Button><AppLink to='/signup'>Utwórz konto</AppLink></Button>
  </>
)

type HeaderNavProps = {

}
export default function HeaderNav(props: HeaderNavProps) {
  const user = useAppSelector(state => state.auth.user)

  return <Flex gap='1em'>
    {user ? <UserNav /> : <GuestNav />}
  </Flex>
}
