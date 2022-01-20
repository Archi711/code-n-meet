import { GroupResponse, GroupPrivacySP } from './../../types/index'
import { api } from './api'

export const groupsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserGroups: builder.query<
      GroupResponse[],
      { id: number; privacy: GroupPrivacySP; [key: string]: string | number }
    >({
      query: (params) => {
        const sp = new URLSearchParams()
        for (const key in params) {
          sp.append(key, params[key].toString())
        }
        return {
          url: `groups?${sp.toString()}`,
        }
      },
    }),
  }),
})

export const { useGetUserGroupsQuery, useLazyGetUserGroupsQuery } = groupsApi
