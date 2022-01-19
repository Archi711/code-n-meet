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
//import { useLazyGetPostsQuery } from '../../redux/services/api.posts'
import AppLink from '../custom/AppLink'
import GHProfileData from '../features/profile/GithubProfileData'

export default function Profile() {
  const params = useParams()
  const [userData, setUserData] = useState(
    useAppSelector((state) => state.auth.user)
  )
  const authUser = useAppSelector((state) => state.auth.user)
  const profileId = Number(params.id)
  const isOwn = profileId === authUser?.id

  const [triggerUP, { data: UDdata, isLoading: UDisLoading, error: UDerror }] =
    useLazyGetUserQuery()

  //const [triggerUD, {data: UPdata, isLoading: UPisLoading, error: UPerror}] = useLazyGetPostsQuery()

  useEffect(() => {
    if (!userData && !UDdata && !UDisLoading && !UDerror) {
      triggerUP(profileId)
    }
  }, [])

  useEffect(() => {
    if (UDdata) {
      setUserData(UDdata)
      //triggerUD()
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
      <GridItem colSpan={3}>
        <Stack
          bg='whiteAlpha.50'
          borderRadius={'lg'}
          p={2}
          gap={4}
          display={'flex'}
        >
          <Text fontSize={'2xl'}>{isOwn ? 'Your posts:' : 'Posts:'} </Text>
        </Stack>
      </GridItem>
    </Grid>
  )
}
