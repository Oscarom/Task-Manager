import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AuthUser = { email: string }

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true
      state.error = null
    },
    loginSuccess(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
      state.isAuthenticated = false
      state.user = null
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.isLoading = false
      state.error = null
    },
    rehydrateAuth(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.isAuthenticated = true
      state.isLoading = false
      state.error = null
    },
  },
})

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  rehydrateAuth,
} = authSlice.actions
export default authSlice.reducer
