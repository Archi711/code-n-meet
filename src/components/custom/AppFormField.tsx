import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import { useField } from 'formik'
import AppInput, { InputType, SelectOptions } from './AppInput'

type AppFormFieldProps = {
  labelText: string
  helperText?: string
  name: string
  type: InputType
  placeholder?: string
  selectOptions?: SelectOptions
}

export default function AppFormField(props: AppFormFieldProps) {
  const [field, meta] = useField(props.name)
  const inputProps = {
    ...field,
    id: props.name,
    type: props.type,
    placeholder: props.placeholder,
    ...(props.selectOptions && { selectOptions: props.selectOptions })
  }

  return (
    <FormControl isInvalid={Boolean(meta.error) && meta.touched}>
      <FormLabel htmlFor={props.name}>{props.labelText}</FormLabel>
      <AppInput inputProps={inputProps} />
      {props.helperText ? (
        <FormHelperText>{props.helperText}</FormHelperText>
      ) : null}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  )
}
