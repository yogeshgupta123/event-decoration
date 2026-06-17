import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import cartReducer from './cartSlice'
import uiReducer from './uiSlice'
import themeReducer from './themeSlice'

import wishlistReducer from './wishlistSlice'
import recentlyViewedReducer from './recentlyViewedSlice.ts'
// reducer mein: recentlyViewed: recentlyViewedReducer,

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
 recentlyViewed: recentlyViewedReducer,
 theme: themeReducer,    
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch