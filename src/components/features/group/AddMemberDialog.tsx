import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialog,
} from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import useApiError from '../../../hooks/useApiError'
import { useAddToGroupMutation } from '../../../redux/services/api.groups'
import AppFormField from '../../custom/AppFormField'

type AMDialogProps = {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export default function AddMemberDialog(props: AMDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const params = useParams()
  if (!params.id) throw new Error('Wrong path!')
  const [trigger, { data, isLoading, error }] = useAddToGroupMutation()
  useApiError(error, {})
  const handleAddToGroup = async (
    values: { nick: string },
    helpers: FormikHelpers<{ nick: string }>
  ) => {
    await trigger({
      id: Number(params.id),
      body: {
        login: values.nick,
      },
    })
    helpers.setSubmitting(false)
  }

  useEffect(() => {
    if (data) {
      props.refetch()
      props.onClose()
    }
  }, [data])
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <Formik<{ nick: string }>
          onSubmit={handleAddToGroup}
          initialValues={{ nick: '' }}
        >
          <AlertDialogContent as={Form}>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Add member
            </AlertDialogHeader>

            <AlertDialogBody>
              <AppFormField
                name='nick'
                type='text'
                labelText='User nickname:'
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                disabled={isLoading}
                onClick={props.onClose}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                type='submit'
                colorScheme='orange'
                ml={3}
              >
                {`Add member!`}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </Formik>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
