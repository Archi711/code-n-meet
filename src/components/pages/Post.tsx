import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Spacer,
  Spinner,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import useApiError from '../../hooks/useApiError'
import { useDeletePostMutation, useGetPostQuery } from '../../redux/services/api.posts'
import AppLink from '../custom/AppLink'
import NotFound from './NotFound'

export default function Post() {
  const params = useParams()
  const postId = params.postId
  const groupId = params.id
  const toast = useToast()
  const navigate = useNavigate()
  const { data: postData, isLoading: postIsLoading, error: postError } = useGetPostQuery(Number(postId), {
    skip: !isFinite(Number(postId)),
  })
  const [trigger, { data: deleteData, isLoading: deleteIsLoading, error: deleteError }] = useDeletePostMutation()

  useApiError(deleteError, {})
  useApiError(postError, {})
  const user = useAppSelector(state => state.auth.user)
  const editable = !!user && !!postData && (user.id === postData.User.id || user.id === postData.Group.User.id)

  useEffect(() => {
    if (deleteData) {
      navigate(`/groups/${groupId}`)
      toast({
        title: "Success",
        description: "Post deleted",
        status: "success"
      })
    }
  }, [deleteData])


  if (!postId || !groupId) return <NotFound />
  if (postIsLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  if (postData)
    return (
      <Stack>
        <Heading>{postData.title}</Heading>
        <Divider />
        <HStack as='header'>
          <Text>
            Author:{' '}
            <AppLink color='yellow.100' to={`/profile/${postData.User.id}`}>
              {postData.User.name || postData.User.id}
            </AppLink>
          </Text>
          <Text>
            Group:{' '}
            <AppLink color='blue.200' to={`/groups/${postData.Group.id}`}>
              {postData.Group.name}
            </AppLink>
          </Text>
          <Spacer />
          {
            editable && user ? (
              <>
                <Button colorScheme={'red'} isLoading={deleteIsLoading} onClick={() => trigger({
                  id: Number(postId),
                  idGroup: Number(groupId),
                  idUser: user.id
                })}>delete post</Button>
                <AppLink to={`post-creator`} state={{
                  title: postData.title,
                  content: postData.content,
                }}>
                  <Button colorScheme={'blue'}>Edit post</Button>
                </AppLink>
              </>
            )
              : null
          }
        </HStack>
        <Divider />
        <ReactMarkdown components={ChakraUIRenderer()}>
          {postData.content}
        </ReactMarkdown>
      </Stack>
    )
  else return <NotFound />
}
