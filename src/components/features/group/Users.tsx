import { CloseIcon } from '@chakra-ui/icons'
import {
  Divider,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spacer,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useApiError from '../../../hooks/useApiError'
import { useRemoveUserFromGroupsMutation } from '../../../redux/services/api.groups'
import AppLink from '../../custom/AppLink'

type GroupUsersProps = {
  users: {
    id: number
    name: string
  }[]
  owner: {
    id: number
    name: string
  }
  isMember: boolean
  refetch: () => void
}

const UserLink = (props: {
  user: { id: number; name: string }
  owner?: boolean
  refetch: () => void
}) => {
  const { id } = useParams()
  const toast = useToast()
  if (!id) throw new Error('id error, reload page!')

  const [trigger, { data, isLoading, error }] =
    useRemoveUserFromGroupsMutation()
  useApiError(error, {})

  const handleClick = () => {
    trigger({ gid: Number(id), id: props.user.id })
  }

  useEffect(() => {
    if (data) {
      toast({
        title: 'User removed',
        status: 'success',
      })
    }
    props.refetch()
  }, [data])

  return (
    <LinkBox as={HStack}>
      <Text>
        <LinkOverlay as={AppLink} to={`/profile/${props.user.id}`}>
          {props.user.name || props.user.id}
        </LinkOverlay>
      </Text>
      <Spacer />
      {props.owner ? null : (
        <IconButton
          isLoading={isLoading}
          onClick={handleClick}
          aria-label='delete user'
        >
          <CloseIcon />
        </IconButton>
      )}
    </LinkBox>
  )
}

export default function GroupUsers(props: GroupUsersProps) {
  return (
    <Stack>
      <Heading size='lg' as='h3'>
        Users
      </Heading>
      <Stack>
        <Text fontSize='sm'>Owner</Text>
        <UserLink refetch={props.refetch} owner user={props.owner} />
        <Divider />
        {props.isMember ? (
          props.users.map((user, idx) =>
            user.id !== props.owner.id ? (
              <UserLink
                refetch={props.refetch}
                key={`userLink-${idx}-${user.id}`}
                user={user}
              />
            ) : null
          )
        ) : (
          <Text color='gray.500' fontStyle='italic' fontSize='sm'>
            Active users list is visible only for group members.
          </Text>
        )}
      </Stack>
    </Stack>
  )
}
