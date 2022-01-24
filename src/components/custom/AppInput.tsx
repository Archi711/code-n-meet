import {
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Input,
} from '@chakra-ui/react'
import { SelectControl, SwitchControl } from 'formik-chakra-ui'
import { FieldInputProps } from 'formik'
import omit from 'lodash/omit'

export type InputType =
  | 'number'
  | 'text'
  | 'password'
  | 'email'
  | 'textarea'
  | 'checkbox'
  | 'select'

export type InputProps = {
  type?: InputType
  name: string
  selectOptions?: SelectOptions
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

export type SelectOptions = { label: string, value: any }[]
export const stringsToSelectOptions = (strings: string[]): SelectOptions => strings.map(s => ({ label: s, value: s }))
export const AppSelectInput = ({ selectOptions, ...props }: InputProps) => <SelectControl {...omit(props, 'selectOptions')}>
  {
    selectOptions?.map((option, id) => (<option key={`select-option-${props.name}-${id}-${option.label.toLowerCase()}`} value={option.value}>{option.label}</option>))
  }
</SelectControl>

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
  if (inputProps.type === 'select') return <AppSelectInput {...inputProps} />
  else return <Input {...inputProps} />
}
