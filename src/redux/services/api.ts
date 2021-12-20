import { LoginResponse, LoginBody } from './../../types/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterResponse, RegisterBody } from '../../types/index'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (body) => ({
        url: 'login',
        body,
        method: 'POST',
      }),
    }),
    signup: builder.mutation<RegisterResponse, RegisterBody>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation, useSignupMutation } = api
