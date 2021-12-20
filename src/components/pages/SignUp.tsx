import { Button, Center, Stack } from '@chakra-ui/react'
import { Formik, Form, FormikHelpers } from 'formik'
import { RegisterBody } from '../../types/index'
import AppFormField from '../custom/AppFormField'
import { RegisterBodyValidation } from '../../validations/index'
import { useSignupMutation } from '../../redux/services/api'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const initialValues: RegisterBody = {
  login: '',
  password: '',
  email: '',
}

export default function SignUp() {
  const navigate = useNavigate()
  const [trigger, { data, isLoading }] = useSignupMutation()
  const handleSubmit = (
    values: RegisterBody,
    helpers: FormikHelpers<RegisterBody>
  ) => {
    console.dir(values)
    trigger(values)
  }
  useEffect(() => {
    if (data) {
      navigate('/registered')
    }
  }, [data, navigate])
  return (
    <Center pt='20vh'>
      <Formik<RegisterBody>
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterBodyValidation}
      >
        <Stack
          sx={{
            border: '1px solid',
            transition: '0.1s all',
            '&:hover': {
              borderColor: 'green.300',
            },
            p: '1em',
            borderRadius: '12px',
          }}
          as={Form}
          noValidate
        >
          <AppFormField labelText='Login' name='login' type='text' />
          <AppFormField labelText='Hasło' name='password' type='password' />
          <AppFormField labelText='Email' name='email' type='email' />
          <Button isLoading={isLoading} bg='green.300' type='submit'>
            Załóż konto
          </Button>
        </Stack>
      </Formik>
    </Center>
  )
}
