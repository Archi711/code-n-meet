import { GroupTypes } from './../types/index'
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

export const CreateGroupValidation = Yup.object({
  name: Yup.string().min(2).max(64).required(),
  description: Yup.string().max(1000).required(),
  type: Yup.string()
    .oneOf([...GroupTypes])
    .required(),
  isPrivate: Yup.bool(),
  repoLink: Yup.string(),
})

export const CreatePostValidation = Yup.object({
  title: Yup.string().min(3).max(255).required(),
  content: Yup.string().min(32).max(16000).required(),
})

export const EditProfileValidation = Yup.object({
  password: Yup.string()
    .strict()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    ),
  email: Yup.string().email(),
  name: Yup.string(),
  profileDescription: Yup.string(),
  githubNick: Yup.string(),
  connectWithGithub: Yup.bool()
})

export const DeleteProfileValidation = Yup.object({
  password: Yup.string().required(),
  id: Yup.number().required()
})
