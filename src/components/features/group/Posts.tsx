import { Button, Center, Heading, Spinner, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import useApiError from '../../../hooks/useApiError'
import { useGetPostsForQuery } from '../../../redux/services/api.posts'
import PostShort from '../../common/shorts/PostShort'
import AppLink from '../../custom/AppLink'

export default function GroupPosts() {
  const params = useParams()
  const { data, isLoading, error } = useGetPostsForQuery({
    id: Number(params.id),
    for: 'group',
  })
  useApiError(error, {
    404: {
      title: 'No posts found',
      description: '',
    },
  })

  if (isLoading)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  else
    return (
      <Stack>
        <Heading size='lg' as='h3'>
          Posts
        </Heading>
        <Stack>
          {data && data.length ? (
            data.map((post, idx) => (
              <PostShort
                post={post}
                key={`post-group-short-${idx}-${post.id}`}
              />
            ))
          ) : (
            <Stack>
              <Text>Nobody posted!</Text>

              <AppLink to={`post-creator`}>
                <Button variant='outline'>add post</Button>
              </AppLink>
            </Stack>
          )}
        </Stack>
      </Stack>
    )
}
