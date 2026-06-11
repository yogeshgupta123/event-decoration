export interface Vendor {
  id: string
  name: string
  email: string
  phone: string
  businessName: string
  category: VendorCategory
  subCategory: string
  description: string
  portfolio: PortfolioItem[]
  services: VendorService[]
  rating: number
  totalReviews: number
  totalBookings: number
  priceRange: 'budget' | 'mid' | 'premium' | 'luxury'
  location: string
  isVerified: boolean
  isAvailable: boolean
  avatar?: string
  coverImage?: string
}

export type VendorCategory =
  | 'decoration'
  | 'catering'
  | 'photography'
  | 'videography'
  | 'music'
  | 'lighting'
  | 'florist'
  | 'makeup'
  | 'venue'
  | 'transport'

export interface VendorService {
  id: string
  name: string
  description: string
  price: number
  unit: 'per_event' | 'per_hour' | 'per_person'
  images: string[]
}

export interface PortfolioItem {
  id: string
  title: string
  image: string
  category: string
  eventType: string
}