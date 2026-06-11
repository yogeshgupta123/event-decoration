import { createSlice } from '@reduxjs/toolkit'

// TypeScript - data kaisa dikhega ye batao
interface AuthState {
  isLoggedIn: boolean
  userName: string | null
  token: string | null
}

// shuru mein kya hoga
const initialState: AuthState = {
  isLoggedIn: false,
  userName: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login hone par
    login: (state, action) => {
      state.isLoggedIn = true
      state.userName = action.payload.userName
      state.token = action.payload.token
    },
    // logout hone par
    logout: (state) => {
      state.isLoggedIn = false
      state.userName = null
      state.token = null
    },
  },
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer