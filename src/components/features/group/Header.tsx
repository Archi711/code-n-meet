import {
  Stack,
  Heading,
  HStack,
  Badge,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { useAppSelector } from '../../../app/hooks'
import { GroupResponse } from '../../../types'
import AppLink from '../../custom/AppLink'
import JoinGroupDialog from './JoinGroupDialog'

type GroupHeaderProps = {
  group: GroupResponse
  refetch: () => void
}
const badgeVariants: Record<string, string> = {
  LANGUAGE: 'green',
  COMMUNITY: 'blue',
  PROJECT: 'orange',
  COMPANY: 'gray',
}
const AddPostOptionButton = ({ to, label }: { to: string; label: string }) => (
  <AppLink to={to}>
    <Button colorScheme='yellow'>{label}</Button>
  </AppLink>
)

export default function GroupHeader({ group, refetch }: GroupHeaderProps) {
  const user = useAppSelector((state) => state.auth.user)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const AddPostOptionButtons = {
    guest: <AddPostOptionButton to='/signup' label='sign up to add post' />,
    outsider: <Button onClick={onOpen}>Join group</Button>,
    member: <AddPostOptionButton to='post-creator' label='add post' />,
  }

  const addPostOption = user
    ? group?.Users.includes({
        id: user.id,
        name: user.name,
      })
      ? 'member'
      : 'outsider'
    : 'guest'
  return (
    <Stack
      direction={'row'}
      alignItems={'flex-start'}
      justifyContent={'space-between'}
    >
      <Stack>
        <Heading>{group.name}</Heading>
        <HStack>
          <Badge colorScheme={badgeVariants[group.type]}>{group.type}</Badge>
          <Badge colorScheme={group.isPrivate ? 'whiteAlpha' : 'pink'}>
            {group.isPrivate ? 'Private' : 'Public'}
          </Badge>
          <Badge colorScheme='yellow'>Active users: {group.Users.length}</Badge>
        </HStack>
      </Stack>
      {AddPostOptionButtons[addPostOption]}
      <JoinGroupDialog refetch={refetch} isOpen={isOpen} onClose={onClose} />
    </Stack>
  )
}
