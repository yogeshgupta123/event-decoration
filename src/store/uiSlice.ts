import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Toast {
  id: number
  message: string
  type: 'success' | 'info' | 'error'
}

interface UiState {
  toasts: Toast[]
}

const initialState: UiState = {
  toasts: [],
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // ============================================
    // SHOW TOAST — naya notification list mein add karo
    // id = Date.now() — har toast ka unique number
    // ============================================
    showToast: (state, action: PayloadAction<{ message: string; type?: 'success' | 'info' | 'error' }>) => {
      state.toasts.push({
        id: Date.now(),
        message: action.payload.message,
        type: action.payload.type || 'success',
      })
    },

    // REMOVE — id se filter karke hata do
    removeToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload)
    },
  },
})

export const { showToast, removeToast } = uiSlice.actions
export default uiSlice.reducer