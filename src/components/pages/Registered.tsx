import { CheckIcon } from '@chakra-ui/icons'
import { Center, Text, VStack } from '@chakra-ui/react'
import AppLink from '../custom/AppLink'

export default function Registered() {


  return (
    <Center mt='10vh'>
      <VStack sx={{
        gap: '1em',
        p: '2em',
        borderRadius: '.5em',
        border: '1px solid salmon',
      }}>
        <CheckIcon color={'slateblue'} w={12} h={12} />
        <Text color='ButtonShadow' fontSize={24}>
          Successfully registered!
        </Text>
        <AppLink to='/login'>Go to login page</AppLink>
      </VStack>

    </Center>
  )
}
