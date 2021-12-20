import { FormControl, FormLabel, Input, FormHelperText, FormErrorMessage } from '@chakra-ui/react';
import { useField } from 'formik';

type AppFormFieldProps = {
  labelText: string
  helperText?: string,
  name: string,
  type: 'number' | 'text' | 'password' | 'email'
}

export default function AppFormField(props: AppFormFieldProps) {
  const [field, meta] = useField(props.name)
  return (
    <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
      <FormLabel htmlFor={props.name}>{props.labelText}</FormLabel>
      <Input {...field} id={props.name} type={props.type} />
      {
        props.helperText ? <FormHelperText>{props.helperText}</FormHelperText> : null
      }
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}
