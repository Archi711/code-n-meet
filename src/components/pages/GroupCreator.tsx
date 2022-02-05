import { Button, Divider, Stack, Text } from '@chakra-ui/react'
import { Form, Formik, FormikHelpers } from 'formik'
import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import useApiError from '../../hooks/useApiError'
import { useCreateGroupMutation, useEditGroupMutation } from '../../redux/services/api.groups'
import { GroupCreateBody, GroupTypes } from '../../types'
import { CreateGroupValidation } from '../../validations'
import AppFormField from '../custom/AppFormField'
import { stringsToSelectOptions } from '../custom/AppInput'
import omit from 'lodash/omit'

const emptyValues: GroupCreateBody = {
  name: '',
  description: '',
  isPrivate: false,
  type: 'COMMUNITY',
  repoLink: '',
}

export default function GroupCreator() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const gid = params.id
  const initialValues = (location.state && (location.state as any)?.group) || emptyValues
  const isUpdate = !!(location.state && (location.state as any)?.group)
  const [triggerCreate, { data: createData, isLoading: createIsLoading, error: createError }] = useCreateGroupMutation()
  const [triggerUpdate, { data: updateData, isLoading: updateIsLoading, error: updateError }] = useEditGroupMutation()
  useApiError(createError, {})
  useApiError(updateError, {})
  const handleSubmit = async (values: GroupCreateBody, helpers: FormikHelpers<GroupCreateBody>) => {
    isUpdate ? await triggerUpdate({ ...omit(values, ['User', 'Users']), gid: Number(gid) }) : await triggerCreate(values)
    helpers.setSubmitting(false)
  }
  useEffect(() => {
    if (createData || updateData) {
      const id = createData?.id || updateData?.id
      navigate(`/groups/${id}`)
    }
  }, [createData, updateData])
  if (!gid && isUpdate) return <Navigate to='/' />
  return (
    <Formik<GroupCreateBody>
      validationSchema={CreateGroupValidation}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(form) => (
        <Stack
          as={Form}
          sx={{
            p: '1em',
            rounded: '1em',
            bg: 'whiteAlpha.50',
          }}
        >
          <Stack>
            <Text fontSize='2xl'>{isUpdate ? 'Edit' : 'Create a'} group</Text>
            <Divider />
          </Stack>
          <AppFormField name='name' type='text' labelText='group name' />
          <AppFormField
            name='description'
            type='textarea'
            labelText='group description'
          />
          <AppFormField
            name='isPrivate'
            type='checkbox'
            labelText='private group?'
          />
          <AppFormField
            name='type'
            selectOptions={stringsToSelectOptions([...GroupTypes])}
            type='select'
            labelText='group type'
          />
          {form.values.type === 'PROJECT' ? (
            <AppFormField name='repoLink' type='text' labelText='repoLink' />
          ) : null}
          <Button type='submit' isLoading={createIsLoading || updateIsLoading}>
            {isUpdate ? 'edit' : 'create'} group
          </Button>
        </Stack>
      )}
    </Formik>
  )
}
