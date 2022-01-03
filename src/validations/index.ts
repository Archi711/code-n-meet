import * as Yup from 'yup'

export const LoginBodyValidation = Yup.object({
  login: Yup.string().strict().required(),
  password: Yup.string().strict().required(),
})

export const RegisterBodyValidation = Yup.object({
  login: Yup.string()
    .matches(
      /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
      'Username must contain only alphanumeric characters, underscore or dot - min 8 - max 20 characters'
    )
    .min(8)
    .max(20)
    .required()
    .trim()
    .strict(),
  password: Yup.string()
    .strict()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  email: Yup.string().email().required(),
})
