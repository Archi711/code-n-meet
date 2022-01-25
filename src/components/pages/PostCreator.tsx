import {
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  HStack,
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
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'
import { PostBody } from '../../types'
import { CreatePostValidation } from '../../validations'
import AppFormField from '../custom/AppFormField'
import AppLink from '../custom/AppLink'
import NotFound from './NotFound'

export default function PostCreator() {
  const params = useParams()
  if (!params.id) return <NotFound />
  const handleSubmit = (values: PostBody, helpers: FormikHelpers<PostBody>) => {
    console.log(values)
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
                        <Button type='submit' colorScheme={'green'}>
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
                  <AppLink
                    sx={{
                      color: 'yellow.200',
                    }}
                    to='https://www.markdownguide.org/cheat-sheet/'
                  >
                    markdown
                  </AppLink>{' '}
                  to write post.
                  <Divider />
                </Text>
                <Text py='1rem' fontSize='larger' color='gray.500'>
                  Post title will be shown in short description in your groups!
                </Text>
                <Text>
                  Post should be at least{' '}
                  <Text display={'inline'} color='blue.200'>
                    32
                  </Text>{' '}
                  characters long.
                </Text>
                <Divider />
                <Text>{values.content.length} / 16000 characters</Text>
              </Stack>
            </GridItem>
          </Grid>
        )}
      </Formik>
    </Stack>
  )
}
