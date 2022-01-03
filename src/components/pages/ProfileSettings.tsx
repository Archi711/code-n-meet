import { Center, Stack } from '@chakra-ui/react'
import { Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../app/hooks'
export default function ProfileSettings() {
  const navigate = useNavigate()
  const userData = useAppSelector((state) => state.auth.user)
  if (!userData)
    navigate('/login', {
      state: {
        from: '/profile/self/settings',
        message: 'You must log in to access this page',
      },
    })
  return (
    <Stack>
      <Center>
        <Stack as={Form}></Stack>
      </Center>
    </Stack>
  )
}
