import { Button, Divider, Stack, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useApiError from '../../hooks/useApiError';
import { useCreateGroupMutation } from '../../redux/services/api.groups';
import { GroupCreateBody, GroupTypes } from '../../types';
import { CreateGroupValidation } from '../../validations';
import AppFormField from '../custom/AppFormField';
import { stringsToSelectOptions } from '../custom/AppInput';

const emptyValues: GroupCreateBody = {
  name: '',
  description: '',
  isPrivate: false,
  type: 'COMMUNITY',
  repoLink: ''
}

export default function GroupCreator() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialValues = (location?.state as any)?.group || emptyValues
  const [trigger, { data, isLoading, error }] = useCreateGroupMutation()
  useApiError(error, {})
  const handleSubmit = (values: GroupCreateBody) => {
    trigger(values)
  }
  useEffect(() => {
    if (data) {
      navigate(`groups/${data.id}`)
    }
  }, [data])
  return (
    <Formik<GroupCreateBody> validationSchema={CreateGroupValidation} initialValues={initialValues} onSubmit={handleSubmit}>
      {
        (form) => (<Stack as={Form} sx={{
          p: '1em',
          rounded: '1em',
          bg: 'whiteAlpha.50'
        }}>
          <Stack>
            <Text fontSize='2xl'>Create a group</Text>
            <Divider />
          </Stack>
          <AppFormField name='name' type='text' labelText='group name' />
          <AppFormField name='description' type='textarea' labelText='group description' />
          <AppFormField name='isPrivate' type='checkbox' labelText='private group?' />
          <AppFormField name='type' selectOptions={stringsToSelectOptions([...GroupTypes])} type='select' labelText='group type' />
          {
            form.values.type === 'PROJECT' ? <AppFormField name='repoLink' type='text' labelText='repoLink' /> : null
          }
          <Button type='submit' isLoading={isLoading}>create group</Button>
        </Stack>)
      }

    </Formik>
  )
}
