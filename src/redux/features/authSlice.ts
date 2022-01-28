import { UserData, LoginResponse } from './../../types/index';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    },
    updateUserData: (state, action: PayloadAction<LoginResponse['user']>) => {
      state.user = action.payload
    }
  }
})


export const { login, logout, updateUserData } = authSlice.actions
