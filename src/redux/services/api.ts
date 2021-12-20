import { LoginResponse, LoginBody } from './../../types/index';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: body => ({
        url: 'login',
        body,
        method: "POST"
      })
    })
  })
})

export const { useLoginMutation } = api
