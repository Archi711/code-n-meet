import {
  Badge,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { useParams } from 'react-router-dom'
import useApiError from '../../hooks/useApiError'
import { useGetGroupQuery } from '../../redux/services/api.groups'
import AppLink from '../custom/AppLink'
import ReactMarkdown from 'react-markdown'
import GroupPosts from '../features/group/Posts'
import GroupUsers from '../features/group/Users'

const badgeVariants: Record<string, string> = {
  LANGUAGE: 'green',
  COMMUNITY: 'blue',
  PROJECT: 'orange',
  COMPANY: 'gray',
}

export default function Group() {
  const params = useParams()
  const id = params.id
  const {
    data: dataG,
    isLoading: isLoadingG,
    error: errorG,
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
        <Stack
          direction={'row'}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
        >
          <Stack>
            <Heading>{dataG.name}</Heading>
            <HStack>
              <Badge colorScheme={badgeVariants[dataG.type]}>
                {dataG.type}
              </Badge>
              <Badge colorScheme={dataG.isPrivate ? 'whiteAlpha' : 'pink'}>
                {dataG.isPrivate ? 'Private' : 'Public'}
              </Badge>
              <Badge colorScheme='yellow'>
                Active users: {dataG.Users.length}
              </Badge>
            </HStack>
          </Stack>
          <AppLink to='post-creator'>
            <Button colorScheme='yellow'>add post</Button>
          </AppLink>
        </Stack>
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
