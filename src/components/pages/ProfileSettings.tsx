import { Button, Center, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
import { EditProfileData } from '../../types/index'
import AppFormField from '../custom/AppFormField'
import React, { useEffect } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { MdSupervisorAccount } from 'react-icons/md'

const DataGroupCell = (
  props: React.PropsWithChildren<{
    title: React.ReactNode
    titleIcon?: React.ReactNode
  }>
) => {
  return (
    <SimpleGrid
      columns={[1, 1, 2]}
      gap='1em'
      bg='whiteAlpha.50'
      p='1em'
      rounded={'md'}
    >
      <GroupHeader>
        {props.titleIcon}
        {props.title}
      </GroupHeader>

      <Stack>{props.children}</Stack>
    </SimpleGrid>
  )
}

const GroupHeader = (props: React.PropsWithChildren<{}>) => (
  <Text
    fontSize='3xl'
    fontFamily={'mono'}
    display={'flex'}
    alignItems={'center'}
    gap='.5em'
  >
    {props.children}
  </Text>
)

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
          <Stack as={Form} w='container.md' gap='1em'>
            <DataGroupCell
              title='account data'
              titleIcon={<MdSupervisorAccount />}
            >
              <AppFormField name='email' labelText='email' type='email' />
              <AppFormField
                name='password'
                labelText='password'
                type='password'
              />
              <Button type='button' variant='solid' colorScheme='red'>
                delete account
              </Button>
            </DataGroupCell>
            <DataGroupCell
              titleIcon={<BsFillPersonFill />}
              title='personal data'
            >
              <AppFormField name='name' labelText='name' type='text' />
              <AppFormField
                name='profileDescription'
                labelText='profile description'
                type='textarea'
              />
            </DataGroupCell>
            <DataGroupCell titleIcon={<AiFillGithub />} title='github data'>
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
            </DataGroupCell>
            <SimpleGrid columns={2} gap='1em'>
              <Button
                size='lg'
                type='button'
                variant='solid'
                colorScheme='gray'
                onClick={() => navigate(`/profile/${id}`)}
              >
                go back
              </Button>
              <Button
                size='lg'
                type='submit'
                variant='solid'
                colorScheme='blue'
              >
                save changes
              </Button>
            </SimpleGrid>
          </Stack>
        </Formik>
      </Center>
    </Stack>
  )
}
