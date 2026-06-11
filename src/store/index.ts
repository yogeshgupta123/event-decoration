import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer ,
    // yahan baad mein slices aayengi
  },
})

// ye 2 lines TypeScript ke liye hain - abhi mat samjho, baad mein samjhaunga
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch