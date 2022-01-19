import { CheckIcon } from '@chakra-ui/icons'
import { Center, Flex, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { logout } from '../../redux/features/authSlice'
import AppLink from '../custom/AppLink'

export default function Logout() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <Center>
      <Flex
        border='1px solid #4e4e4e'
        alignItems={'center'}
        borderRadius={'12px'}
        p='2em'
        flexDirection={'column'}
        gap='1em'
      >
        <CheckIcon />
        <Text color={'GrayText'} fontSize='sm'>
          Logged out, see you soon!
        </Text>
        <AppLink to='/'>Go to home</AppLink>
      </Flex>
    </Center>
  )
}
