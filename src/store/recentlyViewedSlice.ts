import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface RecentItem {
  id: number
  title: string
  price: number
  image: string
  path: string
}

interface RecentState {
  items: RecentItem[]
}

const loadRecent = (): RecentItem[] => {
  const saved = localStorage.getItem('recentlyViewed')
  return saved ? JSON.parse(saved) : []
}

const saveRecent = (items: RecentItem[]) => {
  localStorage.setItem('recentlyViewed', JSON.stringify(items))
}

const initialState: RecentState = { items: loadRecent() }

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState,
  reducers: {
    // ============================================
    // ADD — naya item top pe, duplicate hatao, max 4 rakho
    // ============================================
    addRecentlyViewed: (state, action: PayloadAction<RecentItem>) => {
      state.items = state.items.filter((i) => i.id !== action.payload.id)
      state.items.unshift(action.payload)
      state.items = state.items.slice(0, 4)
      saveRecent(state.items)
    },
  },
})

export const { addRecentlyViewed } = recentlyViewedSlice.actions
export default recentlyViewedSlice.reducer