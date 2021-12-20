import { UserData } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResponse } from '../../types';

type AuthState = {
  token: string,
  user: UserData | null
}

const initialState: AuthState = {
  token: '',
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginResponse>) => {
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.token = initialState.token
      state.user = initialState.user
    }
  }
})


export const { login, logout } = authSlice.actions
