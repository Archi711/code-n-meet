import { api } from './../redux/services/api'
import { authSlice } from './../redux/features/authSlice'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { githubApi } from '../redux/services/github'

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [githubApi.reducerPath]: githubApi.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, githubApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
