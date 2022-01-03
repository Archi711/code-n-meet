import { Button, Flex, Spacer } from '@chakra-ui/react'
import AppLink from '../../custom/AppLink'
import HeaderNav from './HeaderNav'

export default function AppHeader() {
  return (
    <Flex as='header' p='1em'>
      <AppLink to='/'>
        <Button>LOGO</Button>
      </AppLink>
      <Spacer />
      <HeaderNav />
    </Flex>
  )
}
