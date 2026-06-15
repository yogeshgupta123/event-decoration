export interface ShopItem {
  id: number
  title: string
  category: string        // 'Flowers' | 'Cakes' | 'Plants' | etc
  subcategory: string
  price: number
  image: string
  rating: number
  description: string
  tags: string[]
}

export interface AddOn {
  id: number
  name: string
  price: number
  image: string
}