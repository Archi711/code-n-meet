import * as Yup from 'yup'

export const LoginBodyValidation = Yup.object({
  login: Yup.string().required('Login jest wymagany'),
  password: Yup.string().required('Hasło jest wymagane'),
})

export const RegisterBodyValidation = Yup.object({
  login: Yup.string().required('Login jest wymagany'),
  password: Yup.string()
    .required('Hasło jest wymagane')
    .min(8, 'Hasło musi mieć co najmniej 8 znaków'),
  email: Yup.string()
    .email('Podaj poprawny email')
    .required('Poprawny email jest wymagany'),
})
