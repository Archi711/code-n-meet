import { Center, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import useApiError from '../../hooks/useApiError'
import { useGetGroupsQuery } from '../../redux/services/api.groups'
import GroupShort from '../common/shorts/GroupShort'
import PaginationControl from '../common/UI/PaginationControl'

export default function Groups() {
  const [page, setPage] = useState(0)
  const { data, isLoading, error } = useGetGroupsQuery(page * 10)
  useApiError(error, {})

  return (
    <Stack as='section'>
      <Heading variant='h1'>Groups</Heading>
      {
        data?.length && data.length > 10 ? <PaginationControl value={page} valueSetter={setPage} /> : null
      }
      {
        isLoading ? <Spinner /> : null
      }
      {
        data ? data.map((group, id) => <GroupShort key={`group-short-${group.name}-${id}`} group={group} />) : <Center><Text>No groups found</Text></Center>
      }
    </Stack>
  )
}
