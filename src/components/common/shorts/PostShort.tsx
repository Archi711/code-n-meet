import { Heading, HStack, LinkBox, LinkOverlay, Text } from '@chakra-ui/react'
import { PostResponse } from '../../../types'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { Link } from 'react-router-dom'
import AppLink from '../../custom/AppLink'

export default function PostShort({ post }: { post: PostResponse }) {
  return (
    <LinkBox
      as='article'
      p='5'
      borderWidth='1px'
      rounded='md'
      sx={{
        transition: '.1s all',
        '&:hover': {
          borderColor: 'rgba(255,255,255, .3)',
        },
      }}
    >
      <Heading size='md'>
        <LinkOverlay
          as={Link}
          to={`/groups/${post.Group.id}/posts/${post.id}`}
          href={`/groups/${post.Group.id}/posts/${post.id}`}
        >
          {post.title}
        </LinkOverlay>
      </Heading>
      <HStack>
        <HStack>
          <Text>from</Text>
          <AppLink color='yellow.200' to={`/groups/${post.Group.id}`}>
            {post.Group.name}
          </AppLink>
        </HStack>
        <HStack>
          <Text>from</Text>
          <AppLink color='blue.200' to={`/users/${post.User.id}`}>
            {post.User.name || post.User.id}
          </AppLink>
        </HStack>
      </HStack>
      <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
        {post.content.substring(0, 50).concat('...')}
      </ReactMarkdown>
    </LinkBox>
  )
}
