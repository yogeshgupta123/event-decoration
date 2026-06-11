import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // yahan baad mein slices aayengi
  },
})

// ye 2 lines TypeScript ke liye hain - abhi mat samjho, baad mein samjhaunga
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch