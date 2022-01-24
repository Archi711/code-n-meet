import { Divider, Heading, LinkBox, LinkOverlay, Stack, Text } from '@chakra-ui/react';
import AppLink from '../../custom/AppLink';

type GroupUsersProps = {
  users: {
    id: number,
    name: string
  }[]
  owner: {
    id: number,
    name: string
  }
}

const UserLink = (props: { user: { id: number, name: string } }) => (
  <LinkBox>
    <Text>
      <LinkOverlay as={AppLink} to={`users/${props.user.id}`}>
        {props.user.name}
      </LinkOverlay>
    </Text>
  </LinkBox>
)

export default function GroupUsers(props: GroupUsersProps) {
  return <Stack><Heading size='lg' as='h3'>Users</Heading>
    <Stack>
      <Text fontSize='sm'>Owner</Text>
      <UserLink user={props.owner} />
      <Divider />
      {
        props.users.map((user, idx) => user.id !== props.owner.id ? <UserLink key={`userLink-${idx}-${user.id}`} user={user} /> : null)
      }
    </Stack>
  </Stack>
}
