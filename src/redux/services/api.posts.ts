import { PostBody, PostResponse } from './../../types/index'
import { api } from './api'

export const PostsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<
      PostResponse[],
      { id: number; for: 'user' | 'group' }
    >({
      query: (body) => ({
        url: `${body.for}s/${body.id}/posts`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    addPost: builder.mutation<PostResponse, PostBody>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
})

export const { useGetPostsQuery, useLazyGetPostsQuery, useAddPostMutation } =
  PostsApi
