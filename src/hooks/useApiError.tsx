import { useToast } from '@chakra-ui/react'
import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import { StatusCodes } from 'http-status-codes'
import { useEffect } from 'react'

type ErrorMessage = { title: string; description: string }

export default function useApiError(
  error: FetchBaseQueryError | SerializedError | undefined,
  messages: Partial<
    Record<StatusCodes | FetchBaseQueryError['status'], ErrorMessage>
  >
) {
  const toast = useToast()
  useEffect(() => {
    if (error) {
      const toastId = Math.random()
      const toastMessage: ErrorMessage = ('originalStatus' in error &&
        messages[error?.originalStatus]) || {
        title: 'Unexpected error!',
        description:
          ('message' in error && error?.message) ||
          ('data' in error && (error?.data as string)) ||
          'An unexpected error has happened, try reloading page!',
      }

      toast({
        id: toastId,
        ...toastMessage,
        isClosable: true,
        duration: 6000,
        status: 'error',
        position: 'bottom-left',
      })
    }
  }, [error])
}
