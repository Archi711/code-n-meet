import {
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  AlertDialog,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../../app/hooks'
import useApiError from '../../../hooks/useApiError'
import { useAddToGroupMutation } from '../../../redux/services/api.groups'

type JGDialogProps = {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}

export default function JoinGroupDialog(props: JGDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const params = useParams()
  const user = useAppSelector((state) => state.auth.user)
  if (!params.id) throw new Error('Wrong path!')
  const [trigger, { data, isLoading, error }] = useAddToGroupMutation()
  useApiError(error, {})
  const handleAddToGroup = () => {
    if (!user) throw new Error('Unauthorized, refresh page!')
    trigger({
      id: Number(params.id),
      body: {
        id: user.id,
      },
    })
  }

  useEffect(() => {
    if (data) {
      props.onClose()
      props.refetch()
    }
  }, [data])
  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Join group
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

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
              onClick={handleAddToGroup}
              colorScheme='orange'
              ml={3}
            >
              {`Join'em!`}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
