import { Button, Center, Stack, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { EditProfileData } from '../../types/index'
import AppFormField from '../custom/AppFormField'
import { useEffect } from 'react'

export default function ProfileSettings() {
  const navigate = useNavigate()
  const { id } = useParams()
  const userData = useAppSelector((state) => state.auth.user)
  useEffect(() => {
    if (!userData)
      navigate('/login', {
        state: {
          from: `/profile/${id}/settings`,
          message: 'You must log in to access this page',
        },
      })
  }, [])

  const initialValues: EditProfileData = {
    email: userData?.email || '',
    password: '********',
    name: userData?.name || '',
    profileDescription: userData?.profileDescription || '',
    githubNick: userData?.githubNick || '',
    connectToGithub: userData?.connectToGithub || false,
  }
  return (
    <Stack>
      <Center>
        <Formik<EditProfileData>
          initialValues={initialValues}
          onSubmit={(values, helpers) => {
            console.dir(values)
            helpers.setSubmitting(false)
          }}
        >
          <Stack as={Form}>
            <Stack>
              <Text>account data</Text>
              <AppFormField name='email' labelText='email' type='email' />
              <AppFormField
                name='password'
                labelText='password'
                type='password'
              />
              <Button type='button' variant='solid' colorScheme='red'>
                delete account
              </Button>
            </Stack>
            <Stack>
              <Text>personal data</Text>
              <AppFormField name='name' labelText='name' type='text' />
              <AppFormField
                name='profileDescription'
                labelText='profile description'
                type='textarea'
              />
            </Stack>
            <Stack>
              <Text>github data</Text>
              <AppFormField
                name='githubNick'
                labelText='github nick'
                type='text'
              />
              <AppFormField
                name='connectToGithub'
                labelText='connect with Github'
                type='checkbox'
              />
            </Stack>
            <Button type='submit' variant='solid' colorScheme='blue'>
              save changes
            </Button>
          </Stack>
        </Formik>
      </Center>
    </Stack>
  )
}
