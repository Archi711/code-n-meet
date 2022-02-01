import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Text } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useRef } from 'react'
import AppFormField from '../../custom/AppFormField'
import { DeleteProfileBody } from '../../../types'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteUserMutation } from '../../../redux/services/api'
import useApiError from '../../../hooks/useApiError'
import { useAppDispatch } from '../../../app/hooks'
import { logout } from '../../../redux/features/authSlice'


type DeleteDialogProps = {
  isOpen: boolean
  onClose: () => void
}
export default function DeleteDialog(props: DeleteDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const params = useParams()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [trigger, { data, isLoading, error }] = useDeleteUserMutation()
  useApiError(error, {})
  const initialValues: DeleteProfileBody = {
    password: '',
    id: Number(params.id)
  }
  useEffect(() => {
    if (data) {
      dispatch(logout())
      navigate('/')
    }
  }, [data, dispatch])

  const onSubmit = async (values: DeleteProfileBody, helpers: FormikHelpers<DeleteProfileBody>) => {
    console.log(values)
    await trigger(values)
    helpers.setSubmitting(false)
  }
  return (
    <AlertDialog onClose={props.onClose} leastDestructiveRef={cancelRef} isOpen={props.isOpen}>
      <AlertDialogOverlay>
        <Formik<DeleteProfileBody> initialValues={initialValues} onSubmit={onSubmit}>
          <AlertDialogContent as={Form}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete account
            </AlertDialogHeader>
            <AlertDialogBody>
              <Text>Are you sure?</Text>
              <Text>Enter password to confirm:</Text>
              <AppFormField type='password' name='password' labelText='Password' />
            </AlertDialogBody>
            <AlertDialogFooter gap={4}>
              <Button ref={cancelRef} onClick={props.onClose}>Cancel</Button>
              <Button type='submit' colorScheme={'red'} isLoading={isLoading}>Delete account</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Formik>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
