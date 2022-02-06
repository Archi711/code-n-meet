import { Flex, Heading, Text } from '@chakra-ui/react'

export default function About() {
  return (
    <Flex p={4} flexDirection={'column'}>
      <Heading>About</Heading>
      <Text>{`
        Code'n'meet is a social platform 
        tailored for people who want to 
        connect with others, talk about code, publish own posts, 
        find people to build great things with!
      
      `}</Text>
    </Flex>
  )
}
