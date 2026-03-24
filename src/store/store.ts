import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import authReducer, {
  loginSuccess,
  logout,
} from '../features/auth/authSlice.ts'
import { AUTH_STORAGE_KEY } from '../features/auth/authStorage.ts'

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  actionCreator: loginSuccess,
  effect: (action) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(action.payload))
  },
})

listenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
  },
})

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
