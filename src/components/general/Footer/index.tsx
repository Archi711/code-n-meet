import { HStack, Text } from '@chakra-ui/react'

export default function Footer() {
  return (
    <HStack p={4}>
      <Text fontSize='sm' color='gray.400'>
        ⚡ by Arkadiusz Chwedczuk - {new Date().getFullYear()}
      </Text>
    </HStack>
  )
}
