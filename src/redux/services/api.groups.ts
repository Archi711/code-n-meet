import {
  GroupResponse,
  GroupPrivacySP,
  GroupCreateBody,
} from './../../types/index'
import { api } from './api'
import omit from 'lodash/omit';

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
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],
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
        url: `groups?${skip ? `skip=${skip}` : ''}`,
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Groups' as const, id })),
            { type: 'Groups', id: 'LIST' },
          ]
          : [{ type: 'Groups', id: 'LIST' }],
    }),
    addToGroup: builder.mutation<
      { success: boolean },
      { id?: number; body: { login?: string; id?: number } }
    >({
      query: (body) => ({
        url: `groups/${body.id}/addUserToGroup`,
        method: 'POST',
        body: body.body,
      }),
    }),
    removeUserFromGroups: builder.mutation<
      { success: boolean },
      { gid: number; id: number }
    >({
      query: ({ gid, id }) => ({
        url: `groups/${gid}/removeUserFromGroup`,
        method: 'POST',
        body: {
          id,
        },
      }),
    }),
    editGroup: builder.mutation<GroupResponse, Partial<GroupCreateBody> & { gid: number }>({
      query: (body) => ({
        url: `groups/${body.gid}`,
        method: "PATCH",
        body: omit(body, 'gid')
      }),
      invalidatesTags: (_, __, { gid }) => [{ type: 'Groups', id: gid }],
    }),
    deleteGroup: builder.mutation<{ success: boolean }, { id: number }>({
      query: body => ({
        url: `groups/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: 'Groups', id: 'LIST' }],

    })
  }),
})

export const {
  useGetUserGroupsQuery,
  useLazyGetUserGroupsQuery,
  useCreateGroupMutation,
  useGetGroupQuery,
  useLazyGetGroupQuery,
  useGetGroupsQuery,
  useAddToGroupMutation,
  useRemoveUserFromGroupsMutation,
  useEditGroupMutation,
  useDeleteGroupMutation
} = groupsApi
