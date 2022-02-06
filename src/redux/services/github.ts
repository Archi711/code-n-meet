import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GHProfileResponse } from './../../types/index'

export const githubApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.github.com',
  }),
  reducerPath: 'GHapi',
  endpoints: (builder) => ({
    getProfileData: builder.query<GHProfileResponse, { nick: string }>({
      query: ({ nick }) => ({
        url: `users/${nick}`,
        method: 'GET',
      }),
    }),
  }),
})

export const { useLazyGetProfileDataQuery } = githubApi
