import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser, registerUser } from '../services/authService'
import type { LoginCredentials, RegisterCredentials, User } from '../types/auth.types'

// ============================================
// STATE SHAPE — TypeScript ko batao data kaisa dikhega
// ============================================
interface AuthState {
  user: User | null
  token: string | null
  isLoggedIn: boolean
  loading: boolean      // API call chal rahi hai?
  error: string | null  // koi error aaya?
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'), // page refresh hone par bhi login rahe
  isLoggedIn: !!localStorage.getItem('token'), // !! matlab — value ko true/false mein convert karo
  loading: false,
  error: null,
}

// ============================================
// ASYNC THUNK — API call wala action
// createAsyncThunk automatically 3 states banata hai:
// pending (loading) → fulfilled (success) → rejected (error)
// ============================================
export const login = createAsyncThunk(
  'auth/login',                          // action ka naam
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const data = await loginUser(credentials)
      return data
    } catch (error: any) {
      // backend se jo error message aaya, wo use karo
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      const data = await registerUser(credentials)
      return data
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // LOGOUT — normal reducer, API call nahi hai isliye simple
    logout: (state) => {
      state.user = null
      state.token = null
      state.isLoggedIn = false
      localStorage.removeItem('token')
    },
    // ERROR clear karne ke liye — jab form dobara open karo
    clearError: (state) => {
      state.error = null
    },
  },

  // ============================================
  // EXTRA REDUCERS — async thunks ke 3 states handle karo
  // ============================================
  extraReducers: (builder) => {
    builder
      // ---- LOGIN ----
      .addCase(login.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.user = action.payload.user
        state.token = action.payload.token
        // token ko localStorage mein save karo — refresh ke baad bhi rahe
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      // ---- REGISTER ----
      .addCase(register.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.isLoggedIn = true
        state.user = action.payload.user
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer