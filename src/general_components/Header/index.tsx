import { Button } from '@chakra-ui/button'
import { Box, Center, Spacer } from '@chakra-ui/layout'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

export default function Header() {
  const { status } = useSession()
  return (
    <Center maxHeight='10vh' bg='cnm-gray.200' p={4}>
      <Image
        src='/logo.png'
        width='150'
        height='85'
        alt='code-n-meet logo blue'
      />
      <Spacer />
      {status !== 'authenticated' ? (
        <Button bg='cnm-primary.200' onClick={() => signIn()}>
          Sign in
        </Button>
      ) : (
        <Button onClick={() => signOut()}>Sign out</Button>
      )}
    </Center>
  )
}
