import { Center, Grid, GridItem, Spinner, Stack, Text } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { useParams } from 'react-router-dom'
import useApiError from '../../hooks/useApiError'
import { useGetGroupQuery } from '../../redux/services/api.groups'
import AppLink from '../custom/AppLink'
import ReactMarkdown from 'react-markdown'
import GroupPosts from '../features/group/Posts'
import GroupUsers from '../features/group/Users'
import GroupHeader from '../features/group/Header'

export default function Group() {
  const params = useParams()
  const id = params.id
  const {
    data: dataG,
    isLoading: isLoadingG,
    error: errorG,
    refetch,
  } = useGetGroupQuery({ id: Number(id) })
  useApiError(errorG, {
    404: {
      title: 'Group not found',
      description: 'Try again later',
    },
  })

  if (!dataG && isLoadingG) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  } else if (!dataG) {
    return (
      <Center>
        <Text>No data found!</Text>
        <AppLink to='/'>go to home</AppLink>
      </Center>
    )
  } else
    return (
      <Stack>
        {dataG ? <GroupHeader refetch={refetch} group={dataG} /> : null}
        {dataG.description ? (
          <ReactMarkdown components={ChakraUIRenderer()}>
            {dataG.description}
          </ReactMarkdown>
        ) : null}
        <Grid templateColumns={'repeat(3, 1fr)'} gap={4} bg='whiteAlpha.50'>
          <GridItem colSpan={2} p={4}>
            <GroupPosts />
          </GridItem>
          <GridItem p={4}>
            <GroupUsers owner={dataG.User} users={dataG.Users} />
          </GridItem>
        </Grid>
      </Stack>
    )
}
