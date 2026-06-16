import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface WishlistItem {
  id: number
  title: string
  category: string
  price: number
  image: string
  type: 'package' | 'shop' | 'experience'
}

interface WishlistState {
  items: WishlistItem[]
}

const loadWishlist = (): WishlistItem[] => {
  const saved = localStorage.getItem('wishlist')
  return saved ? JSON.parse(saved) : []
}

const saveWishlist = (items: WishlistItem[]) => {
  localStorage.setItem('wishlist', JSON.stringify(items))
}

const initialState: WishlistState = {
  items: loadWishlist(),
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // ============================================
    // TOGGLE — agar already hai toh hata do, warna add karo
    // Heart icon click karne pe yahi call hoga
    // ============================================
    toggleWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find((i) => i.id === action.payload.id)
      if (exists) {
        state.items = state.items.filter((i) => i.id !== action.payload.id)
      } else {
        state.items.push(action.payload)
      }
      saveWishlist(state.items)
    },

    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload)
      saveWishlist(state.items)
    },
  },
})

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer