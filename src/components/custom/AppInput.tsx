import {
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Input,
} from '@chakra-ui/react'
import { SwitchControl } from 'formik-chakra-ui'
import { FieldInputProps } from 'formik'

export type InputType =
  | 'number'
  | 'text'
  | 'password'
  | 'email'
  | 'textarea'
  | 'checkbox'

export type InputProps = {
  type?: InputType
  name: string
} & FieldInputProps<any>

export const AppNumberInput = (props: InputProps) => {
  return (
    <NumberInput {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  )
}

export const AppTextFieldInput = (props: InputProps) => <Textarea {...props} />

export const AppCheckboxInput = (props: InputProps) => (
  <SwitchControl {...props} />
)

export default function AppInput({ inputProps }: { inputProps: InputProps }) {
  if (inputProps.type === 'number') return <AppNumberInput {...inputProps} />
  if (inputProps.type === 'textarea')
    return <AppTextFieldInput {...inputProps} />
  if (inputProps.type === 'checkbox')
    return <AppCheckboxInput {...inputProps} />
  else return <Input {...inputProps} />
}
