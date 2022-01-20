import { Stack, Divider, Spinner, Center, Button, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import useApiError from '../../../hooks/useApiError'
import { useLazyGetPostsQuery } from '../../../redux/services/api.posts'
import AppLink from '../../custom/AppLink'
import PostShort from '../../common/shorts/PostShort'

type PostsProps = {
  isOwn: boolean
  userId: number | undefined
}

export default function Posts({ isOwn, userId }: PostsProps) {
  const [triggerUP, { data: UPdata, isLoading: UPisLoading, error: UPerror }] =
    useLazyGetPostsQuery()

  useEffect(() => {
    if (userId) {
      triggerUP({
        id: userId,
        for: 'user',
      })
    }
  }, [userId])
  useApiError(UPerror, {
    404: {
      title: '',
      description: 'No posts found',
    },
  })
  return (
    <Stack>
      <Stack>
        <Text fontSize={'2xl'}>{isOwn ? 'Your posts:' : 'Posts:'} </Text>
        <Divider />
      </Stack>
      {UPisLoading ? (
        <Spinner />
      ) : UPdata?.length ? (
        UPdata?.map((post, idx) => (
          <PostShort
            post={post}
            key={`post-${post.id}-user-${isOwn ? 'self' : 'other'}-${idx}`}
          />
        ))
      ) : (
        <Center gap={4} flexDirection={'column'}>
          <Text fontSize='2xl'>No posts found</Text>
          {isOwn ? (
            <AppLink to='/post-creator'>
              <Button variant={'outline'}>create first post!</Button>
            </AppLink>
          ) : null}
        </Center>
      )}
    </Stack>
  )
}
