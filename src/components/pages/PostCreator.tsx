import {
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { Form, Formik, FormikHelpers } from 'formik'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useNavigate, useParams } from 'react-router-dom'
import useApiError from '../../hooks/useApiError'
import { useAddPostMutation } from '../../redux/services/api.posts'
import { PostBody } from '../../types'
import { CreatePostValidation } from '../../validations'
import AppFormField from '../custom/AppFormField'
import NotFound from './NotFound'

export default function PostCreator() {
  const params = useParams()
  const navigate = useNavigate()
  const [trigger, { data, isLoading, error }] = useAddPostMutation()
  useApiError(error, {})

  useEffect(() => {
    if (data) {
      navigate(`/groups/${params.id}/posts/${data.id}`)
    }
  }, [data])
  if (!params.id) return <NotFound />
  const handleSubmit = (values: PostBody, helpers: FormikHelpers<PostBody>) => {
    trigger(values)
    helpers.setSubmitting(false)
  }
  return (
    <Stack>
      <Heading>Create post</Heading>
      <Formik<PostBody>
        initialValues={{
          content: '',
          idGroup: Number(params.id),
          title: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={CreatePostValidation}
      >
        {({ values }) => (
          <Grid
            as={Form}
            templateColumns={['repeat(1, 1fr)', null, 'repeat(3, 1fr)']}
          >
            <GridItem colSpan={2}>
              <Tabs>
                <TabList>
                  <Tab>Editor</Tab>
                  <Tab>Preview</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Stack>
                      <AppFormField
                        name='title'
                        type='text'
                        labelText='title'
                      />
                      <AppFormField
                        name='content'
                        type='textarea'
                        labelText='content'
                      />
                      <HStack>
                        <Button
                          isLoading={isLoading}
                          type='submit'
                          colorScheme={'green'}
                        >
                          add post
                        </Button>
                      </HStack>
                    </Stack>
                  </TabPanel>
                  <TabPanel>
                    <ReactMarkdown components={ChakraUIRenderer()}>
                      {values.content}
                    </ReactMarkdown>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
            <GridItem>
              <Stack p={'1em'}>
                <Text>
                  Use{' '}
                  <Link
                    sx={{
                      color: 'yellow.200',
                    }}
                    isExternal
                    href='https://www.markdownguide.org/cheat-sheet/'
                  >
                    markdown
                  </Link>{' '}
                  to write post.
                </Text>
                <Divider />
                <Text py='1rem' fontSize='larger' color='gray.500'>
                  Post title will be shown in short description in your groups!
                </Text>
                <Text as='span'>
                  Post should be at least{' '}
                  <Text display={'inline'} color='blue.200'>
                    32
                  </Text>{' '}
                  characters long.
                </Text>
              </Stack>
              <Divider />
              <Text>{values.content.length} / 16000 characters</Text>
            </GridItem>
          </Grid>
        )}
      </Formik>
    </Stack>
  )
}
