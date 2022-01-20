import { Stack, Divider, Spinner, Center, Button, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import useApiError from '../../../hooks/useApiError'
import { useLazyGetUserGroupsQuery } from '../../../redux/services/api.groups'
import GroupShort from '../../common/shorts/GroupShort'
import AppLink from '../../custom/AppLink'

type GroupsProps = {
  isOwn: boolean
  userId: number | undefined
}

export default function Groups({ isOwn, userId }: GroupsProps) {
  const [triggerUG, { data: UGdata, isLoading: UGisLoading, error: UGerror }] =
    useLazyGetUserGroupsQuery()
  useApiError(UGerror, {
    404: {
      title: '',
      description: 'No groups found',
    },
  })

  useEffect(() => {
    if (userId) {
      triggerUG({
        id: userId,
        privacy: isOwn ? 'all' : 'public',
      })
    }
  }, [userId])

  return (
    <Stack>
      <Stack>
        <Text fontSize={'2xl'}>{isOwn ? 'Your groups:' : 'Groups:'} </Text>
        <Divider />
      </Stack>
      {UGisLoading ? (
        <Spinner />
      ) : UGdata?.length ? (
        UGdata?.map((group, idx) => (
          <GroupShort
            group={group}
            key={`group-${group.id}-user-${isOwn ? 'self' : 'other'}-${idx}`}
          />
        ))
      ) : (
        <Center gap={4} flexDirection={'column'}>
          <Text fontSize='2xl'>No groups found</Text>
          {isOwn ? (
            <AppLink to='/group-creator'>
              <Button variant={'outline'}>create group!</Button>
            </AppLink>
          ) : null}
        </Center>
      )}
    </Stack>
  )
}
