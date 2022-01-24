import omit from 'lodash/omit';
import { RootState } from './../../app/store'
import { LoginResponse, LoginBody, EditProfileData } from './../../types/index'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RegisterResponse, RegisterBody } from '../../types/index'

/*eslint no-undef: "off"*/

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers: Headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Users', 'Posts', 'Groups'],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginBody>({
      query: (body) => ({
        url: 'login',
        body,
        method: 'POST',
      }),
      invalidatesTags: (result) =>
        result
          ? [
            { type: 'Users' as const, id: result.user.id },
            { type: 'Users', id: 'LIST' },
          ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    signup: builder.mutation<RegisterResponse, RegisterBody>({
      query: (body) => ({
        url: 'signup',
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query<LoginResponse['user'], number>({
      query: (id) => ({
        url: `users/${id}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [
            { type: 'Users' as const, id: result.id },
            { type: 'Users', id: 'LIST' },
          ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<LoginResponse['user'], EditProfileData & { id: number }>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: 'PATCH',
        body: omit(body, 'id')
      })
    })
  }),
})

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
  useUpdateUserMutation,
} = api
