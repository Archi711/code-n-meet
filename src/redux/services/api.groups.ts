import { GroupResponse, GroupPrivacySP, GroupCreateBody } from './../../types/index'
import { api } from './api'

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserGroups: builder.query<
      GroupResponse[],
      { id: number; privacy: GroupPrivacySP;[key: string]: string | number }
    >({
      query: (params) => {
        const sp = new URLSearchParams()
        for (const key in params) {
          sp.append(key, params[key].toString())
        }
        return {
          url: `users/${params.id}/groups?${sp.toString()}`,
        }
      },
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Groups' as const, id })),
            { type: 'Groups', id: 'LIST' },
          ]
          : [{ type: 'Groups', id: 'LIST' }],
    }),
    createGroup: builder.mutation<{ id: number }, GroupCreateBody>({
      query: (body) => ({
        url: `groups`,
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Groups", id: "LIST" }]
    }),
    getGroup: builder.query<GroupResponse, { id: number }>({
      query: ({ id }) => ({
        url: `groups/${id}`,
      }),
      providesTags: (result) =>
        result
          ? [{ type: 'Groups' as const, id: result.id }]
          : [{ type: 'Groups', id: 'LIST' }],
    }),
    getGroups: builder.query<GroupResponse[], number | undefined>({
      query: (skip) => ({
        url: `groups?${skip ? `skip=${skip}` : ''}`
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Groups' as const, id })),
            { type: 'Groups', id: 'LIST' },
          ]
          : [{ type: 'Groups', id: 'LIST' }],
    }),
  }),
})

export const { useGetUserGroupsQuery, useLazyGetUserGroupsQuery, useCreateGroupMutation, useGetGroupQuery, useLazyGetGroupQuery, useGetGroupsQuery } = groupsApi
