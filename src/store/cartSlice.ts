import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { CartItem } from '../types/cart.types'

interface CartState {
  items: CartItem[]
}

// ============================================
// localStorage se purana cart load karo (refresh ke baad bhi rahe)
// ============================================
const loadCart = (): CartItem[] => {
  const saved = localStorage.getItem('cart')
  return saved ? JSON.parse(saved) : []
}

const initialState: CartState = {
  items: loadCart(),
}

// ============================================
// HELPER — har baar localStorage update karo
// ============================================
const saveCart = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // ============================================
    // ADD TO CART
    // Agar item already hai → quantity +1
    // Warna naya item add karo with quantity 1
    // ============================================
    addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existing = state.items.find((item) => item.id === action.payload.id)

      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }

      saveCart(state.items)
    },

    // REMOVE — item ko poori tarah hata do
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
      saveCart(state.items)
    },

    // QUANTITY INCREASE
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) item.quantity += 1
      saveCart(state.items)
    },

    // QUANTITY DECREASE — agar 1 hai toh remove kar do
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload)
        }
      }
      saveCart(state.items)
    },

    // CLEAR — pura cart khali karo
    clearCart: (state) => {
      state.items = []
      saveCart(state.items)
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer