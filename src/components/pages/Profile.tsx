import {
  Badge,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Text,
} from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import AppLink from '../custom/AppLink'

export default function Profile() {
  const params = useParams()
  const userData = useAppSelector((state) => state.auth.user)
  const profileId = Number(params.id)
  const isOwn = profileId === userData?.id

  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={2}>
      <GridItem colSpan={1} border='1px solid #ccc' borderRadius={6} p={2}>
        <Text fontSize={24}>Profile data: </Text>
        <Divider />
        <HStack>
          <Badge>Name:</Badge>
          <Text>{userData?.name}</Text>
        </HStack>
        <Divider />
        <HStack>
          <Badge>GithubNick:</Badge>
          <Text>{userData?.githubNick}</Text>
        </HStack>
        <Divider />
        <HStack>
          <Badge>Description:</Badge>
          <Text>{userData?.profileDescription}</Text>
        </HStack>
        <Divider />
        {isOwn ? (
          <AppLink to={`/profile/${profileId}/settings`}>
            <Button>Edit</Button>
          </AppLink>
        ) : null}
      </GridItem>
      <GridItem colSpan={3}></GridItem>
    </Grid>
  )
}
