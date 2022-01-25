import {
  Center,
  Divider,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import useApiError from '../../hooks/useApiError'
import { useGetPostQuery } from '../../redux/services/api.posts'
import AppLink from '../custom/AppLink'
import NotFound from './NotFound'

export default function Post() {
  const params = useParams()
  const postId = params.postId
  const { data, isLoading, error } = useGetPostQuery(Number(postId), {
    skip: !isFinite(Number(postId)),
  })
  useApiError(error, {})
  if (!postId) return <NotFound />
  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (data)
    return (
      <Stack>
        <Heading>{data.title}</Heading>
        <Divider />
        <HStack as='header'>
          <Text>
            Author:{' '}
            <AppLink color='yellow.100' to={`/profile/${data.User.id}`}>
              {data.User.name}
            </AppLink>
          </Text>
          <Text>
            Group:{' '}
            <AppLink color='blue.200' to={`/groups/${data.Group.id}`}>
              {data.Group.name}
            </AppLink>
          </Text>
        </HStack>
        <Divider />
        <ReactMarkdown components={ChakraUIRenderer()}>
          {data.content}
        </ReactMarkdown>
      </Stack>
    )
  else return <NotFound />
}
