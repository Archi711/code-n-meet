import { Center, Flex, Text } from '@chakra-ui/react';
import AppLink from '../custom/AppLink';

export default function NotFound() {

  return <Center pt='30vh'>
    <Flex flexDirection={'column'} gap='1em' alignItems={'center'}>
      <Text fontSize={'md'} color={'GrayText'}>Nie znaleziono strony</Text>
      <AppLink sx={{ fontWeight: 700 }} to='/'>Wróć do strony głównej</AppLink>
    </Flex>
  </Center>
}
