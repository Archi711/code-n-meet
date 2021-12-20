import * as Yup from 'yup'

export const LoginBodyValidation = Yup.object({
  login: Yup.string().required('Login jest wymagany'),
  password: Yup.string().required('Hasło jest wymagane')
})
