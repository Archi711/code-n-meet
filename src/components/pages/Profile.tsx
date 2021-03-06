import {
  Badge,
  Button,
  Divider,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { useLazyGetUserQuery } from '../../redux/services/api'
import AppLink from '../custom/AppLink'
import GHProfileData from '../features/profile/GithubProfileData'
import Posts from '../features/profile/Posts'
import Groups from '../features/profile/Groups'

export default function Profile() {
  const params = useParams()
  const [userData, setUserData] = useState(
    useAppSelector((state) => state.auth.user)
  )
  const authUser = useAppSelector((state) => state.auth.user)
  const profileId = Number(params.id)
  const isOwn = profileId === authUser?.id

  const [triggerUD, { data: UDdata, isLoading: UDisLoading, error: UDerror }] =
    useLazyGetUserQuery()

  useEffect(() => {
    if (!UDdata && !UDisLoading && !UDerror) {
      triggerUD(profileId)
    }
  }, [])

  useEffect(() => {
    if (UDdata) {
      setUserData(UDdata)
    }
  }, [UDdata])

  return (
    <Grid templateColumns='repeat(4, 1fr)' gap='1em'>
      <GridItem
        colSpan={1}
        bg='whiteAlpha.50'
        borderRadius={'lg'}
        p={2}
        gap={4}
        display={'flex'}
        flexDirection={'column'}
      >
        {UDisLoading ? (
          <Spinner></Spinner>
        ) : (
          <Stack>
            <Text fontSize={'2xl'}>Profile data: </Text>
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
          </Stack>
        )}

        {userData?.connectToGithub && userData ? (
          <GHProfileData user={userData} />
        ) : null}
      </GridItem>
      <GridItem colSpan={3} display={'flex'} flexDirection={'column'} gap={4}>
        <Stack
          bg='whiteAlpha.50'
          borderRadius={'lg'}
          p={2}
          gap={4}
          display={'flex'}
        >
          <Groups isOwn={isOwn} userId={userData?.id} />
        </Stack>
        <Stack
          bg='whiteAlpha.50'
          borderRadius={'lg'}
          p={2}
          gap={4}
          display={'flex'}
        >
          <Posts isOwn={isOwn} userId={userData?.id} />
        </Stack>
      </GridItem>
    </Grid>
  )
}
