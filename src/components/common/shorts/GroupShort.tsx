import { Heading, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { GroupResponse } from '../../../types'

type GroupShortProps = {
  group: GroupResponse
}

export default function GroupShort({ group }: GroupShortProps) {
  return <LinkBox as='article' p='5' borderWidth='1px' rounded='md'>
    <Text fontSize='sm'>{group.type}</Text>
    <Heading size='md'>
      <LinkOverlay as={Link} to={`/groups/${group.id}`} href={`/groups/${group.id}`}>
        {group.name}</LinkOverlay></Heading>
    <Text color='whiteAlpha.700'>{group.description?.substring(0, 50).concat('...')}</Text>
  </LinkBox>
}
