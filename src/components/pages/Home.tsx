import { Center, Heading, Spinner, Stack } from '@chakra-ui/react'
import useApiError from '../../hooks/useApiError'
import { useGetPostsQuery } from '../../redux/services/api.posts'
import PostShort from '../common/shorts/PostShort'

export default function Home() {
  const { data, isFetching, error } = useGetPostsQuery(undefined)
  useApiError(error, {
    404: {
      title: '',
      description: 'No posts found',
    },
  })

  if (isFetching)
    return (
      <Center>
        <Spinner />
      </Center>
    )
  return (
    <Stack>
      <Heading>Newest posts:</Heading>
      {data?.map((post, idx) => (
        <PostShort post={post} key={`home-short-post-${post.id}-${idx}`} />
      ))}
    </Stack>
  )
}
