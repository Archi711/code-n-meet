import { Box, Button, Center, Flex } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../redux/features/authSlice'
import { useLoginMutation } from '../../redux/services/api'
import { LoginBody } from '../../types'
import { LoginBodyValidation } from '../../validations'
import AppFormField from '../custom/AppFormField'

const initialValues: LoginBody = {
  login: '',
  password: '',
}

export default function Login() {
  const [trigger, { data, isLoading }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSubmit = (
    values: LoginBody,
    helpers: FormikHelpers<LoginBody>
  ) => {
    trigger(values)
  }
  useEffect(() => {
    if (data) {
      dispatch(login(data))
      navigate(`/profile/${data.user.id}`)
    }
  }, [data, dispatch, navigate])

  return (
    <Center>
      <Box
        w='container.sm'
        border='1px solid #4e4e4e'
        borderRadius={'12px'}
        p='2em'
      >
        <Formik
          validationSchema={LoginBodyValidation}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Flex as={Form} flexDirection={'column'} gap='1em'>
            <AppFormField labelText='Login' name='login' type='text' />
            <AppFormField labelText='Hasło' name='password' type='password' />
            <Button isLoading={isLoading} bgColor='orange.300' type='submit'>
              Zaloguj
            </Button>
          </Flex>
        </Formik>
      </Box>
    </Center>
  )
}
