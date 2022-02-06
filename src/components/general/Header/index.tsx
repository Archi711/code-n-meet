import { Button, Flex, Spacer } from '@chakra-ui/react'
import AppLink from '../../custom/AppLink'
import HeaderNav from './HeaderNav'
import Logo from '../../../assets/logo.svg'

export default function AppHeader() {
  return (
    <Flex as='header' p='1em'>
      <AppLink to='/'>
        <Button><img src={Logo} style={{ width: '100%', height: '100%' }} /> </Button>
      </AppLink>
      <Spacer />
      <HeaderNav />
    </Flex>
  )
}
