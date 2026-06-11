export interface Booking {
  id: string
  userId: string
  vendorId: string
  eventType: 'wedding' | 'birthday' | 'corporate' | 'engagement' | 'other'
  eventDate: string
  eventTime: string
  venue: string
  guestCount: number
  totalAmount: number
  advanceAmount: number
  remainingAmount: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  services: BookingService[]
  specialRequests?: string
  createdAt: string
}

export interface BookingService {
  id: string
  name: string
  price: number
  quantity: number
}

export interface CreateBookingPayload {
  vendorId: string
  eventType: string
  eventDate: string
  eventTime: string
  venue: string
  guestCount: number
  services: BookingService[]
  specialRequests?: string
}