import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import uiReducer from './uiSlice'
import wishlistReducer from './wishlistSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
    
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch