import {
  Center,
  Divider,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useLazyGetProfileDataQuery } from '../../../redux/services/github'
import { UserData } from '../../../types'

const DataCell = (
  props: React.PropsWithChildren<{
    title: React.ReactNode
  }>
) => {
  if (!props.children) return null

  return (
    <Stack>
      <Text fontSize={'sm'} color='gray.400'>
        {props.title}
      </Text>
      <Text>{props.children}</Text>
    </Stack>
  )
}

export default function GHProfileData({ user }: { user: UserData }) {
  const [trigger, { data, isLoading }] = useLazyGetProfileDataQuery()

  useEffect(() => {
    if (user?.connectToGithub && user.githubNick && !data && !isLoading) {
      trigger({ nick: user.githubNick })
    }
  }, [])

  useEffect(() => {
    if (data) {
      console.log(data)
    }
  }, [data])

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }
  return (
    <Stack>
      <Text fontSize={'2xl'} alignSelf={'start'}>
        Github data:
      </Text>
      <Divider />
      <Image
        sx={{
          rounded: 'lg',
          w: '50%',
        }}
        fallbackSrc='https://via.placeholder.com/150'
        src={data?.avatar_url.toString()}
      />
      <DataCell title='Profile url'>
        {data?.html_url && (
          <Link isExternal href={`${data?.html_url}` || ''}>
            {data?.url}
          </Link>
        )}
      </DataCell>
      <DataCell title='Name'>{data?.name}</DataCell>
      <DataCell title='Location'>{data?.location}</DataCell>
      <DataCell title='Company'>{data?.company}</DataCell>
      <DataCell title='Blog'>
        {data?.blog && (
          <Link isExternal href={`https://${data?.blog}` || ''}>
            {data?.blog}
          </Link>
        )}
      </DataCell>
      <DataCell title='Bio'>{data?.bio}</DataCell>
    </Stack>
  )
}
