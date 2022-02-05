import {
  Stack,
  Heading,
  HStack,
  Badge,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import useApiError from '../../../hooks/useApiError'
import { useDeleteGroupMutation } from '../../../redux/services/api.groups'
import { GroupResponse } from '../../../types'
import AppLink from '../../custom/AppLink'
import AddMemberDialog from './AddMemberDialog'
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
  const navigate = useNavigate()
  const toast = useToast()
  const params = useParams()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isAMOpen,
    onOpen: onAMOpen,
    onClose: onAMClose,
  } = useDisclosure()
  const [trigger, { data, isLoading, error }] = useDeleteGroupMutation()
  useApiError(error, {})
  const AddPostOptionButtons = {
    guest: <AddPostOptionButton to='/signup' label='sign up to add post' />,
    outsider: <Button onClick={onOpen}>Join group</Button>,
    member: <AddPostOptionButton to='post-creator' label='add post' />,
  }

  useEffect(() => {
    if (data) {
      toast({
        status: 'success',
        title: "Success!",
        description: "Group deleted!"
      })
      navigate('/')
    }
  }, [data])

  const isOwner = group.User.id === user?.id
  const addPostOption = user
    ? group?.Users.map((u) => u.id).includes(user.id)
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
      <HStack>
        {AddPostOptionButtons[addPostOption]}
        {isOwner ? (
          <>
            <Button disabled={isLoading} colorScheme={'teal'} onClick={onAMOpen}>add member</Button>
            <AddMemberDialog
              refetch={refetch}
              onClose={onAMClose}
              isOpen={isAMOpen}
            />
            <Button
              disabled={isLoading}
              onClick={() => navigate('group-creator', {
                state: {
                  group
                }
              })}
              colorScheme={'orange'}>edit group data</Button>
            <Button
              isLoading={isLoading}
              onClick={() => trigger({ id: Number(params.id) })}
              colorScheme='red'>delete group</Button>
          </>
        ) : null}
        <JoinGroupDialog refetch={refetch} isOpen={isOpen} onClose={onClose} />
      </HStack>
    </Stack>
  )
}
