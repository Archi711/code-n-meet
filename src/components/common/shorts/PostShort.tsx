import { Text, VStack } from '@chakra-ui/react'
import { PostResponse } from '../../../types'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'

export default function PostShort({ post }: { post: PostResponse }) {
  return (
    <VStack>
      <Text>{post.title}</Text>
      <ReactMarkdown components={ChakraUIRenderer()} skipHtml>
        {post.content.substring(50).concat('...')}
      </ReactMarkdown>
    </VStack>
  )
}
