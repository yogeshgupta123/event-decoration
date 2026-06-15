export interface Experience {
  id: number
  title: string
  category: string
  price: number
  image: string
  images: string[]
  duration: string
  location: string
  rating: number
  reviews: number
  bookedToday: number
  description: string
  highlights: string[]
}

export const experienceCategories = ['Romantic Dinners', 'Surprise Setups', 'Adventure Dates', 'Spa & Wellness', 'Private Screenings']

const baseExperiences = [
  { id: 1, title: 'Rooftop Candlelight Dinner for Two', category: 'Romantic Dinners', price: 4999, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500', duration: '2 hours', location: 'Pan India', rating: 4.9, bookedToday: 14 },
  { id: 2, title: 'Private Beachside Dinner', category: 'Romantic Dinners', price: 7999, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500', duration: '2.5 hours', location: 'Goa, Mumbai', rating: 4.9, bookedToday: 6 },
  { id: 3, title: 'Surprise Room Decoration', category: 'Surprise Setups', price: 2999, image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=500', duration: '1-2 hours', location: 'Pan India', rating: 4.8, bookedToday: 23 },
  { id: 4, title: 'Balloon Surprise Setup', category: 'Surprise Setups', price: 1999, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500', duration: '1 hour', location: 'Pan India', rating: 4.7, bookedToday: 31 },
  { id: 5, title: 'City Adventure Date', category: 'Adventure Dates', price: 3499, image: 'https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=500', duration: '4 hours', location: 'Delhi, Mumbai, Bangalore', rating: 4.6, bookedToday: 9 },
  { id: 6, title: 'Hot Air Balloon Ride', category: 'Adventure Dates', price: 12999, image: 'https://images.unsplash.com/photo-1521336575822-6da63fb45455?w=500', duration: '3 hours', location: 'Jaipur, Pushkar', rating: 4.9, bookedToday: 4 },
  { id: 7, title: 'Couple Spa Retreat', category: 'Spa & Wellness', price: 5999, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500', duration: '2 hours', location: 'Pan India', rating: 4.8, bookedToday: 11 },
  { id: 8, title: 'Solo Wellness Day Package', category: 'Spa & Wellness', price: 3999, image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500', duration: '3 hours', location: 'Pan India', rating: 4.7, bookedToday: 17 },
  { id: 9, title: 'Private Movie Screening', category: 'Private Screenings', price: 6999, image: 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=500', duration: '3 hours', location: 'Delhi NCR, Mumbai', rating: 4.8, bookedToday: 8 },
  { id: 10, title: 'Outdoor Cinema Date Night', category: 'Private Screenings', price: 4499, image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=500', duration: '2.5 hours', location: 'Pan India', rating: 4.7, bookedToday: 19 },
]

const categoryDescriptions: Record<string, string> = {
  'Romantic Dinners': 'An intimate dining experience curated just for two — beautiful setup, soft lighting, and a menu designed to impress.',
  'Surprise Setups': 'Come home to a beautifully decorated surprise — our team handles everything while you keep your partner busy.',
  'Adventure Dates': 'Step out of the ordinary with an experience built around excitement, exploration, and unforgettable memories.',
  'Spa & Wellness': 'Relax, rejuvenate, and reconnect with a premium wellness experience designed for total relaxation.',
  'Private Screenings': 'Your own private theatre experience — pick the movie, we set up the rest for a magical night in.',
}

const categoryHighlights: Record<string, string[]> = {
  'Romantic Dinners': ['Private table setup with decor', 'Curated menu with multiple courses', 'Candles & ambient lighting', 'Dedicated host on-site', 'Photography assistance'],
  'Surprise Setups': ['Complete room decoration', 'Balloons, flowers & fairy lights', 'Personalized banner/message', 'Setup completed before arrival', 'Quick cleanup option available'],
  'Adventure Dates': ['All activity bookings included', 'Professional guide/instructor', 'Safety equipment provided', 'Pickup & drop (select cities)', 'Photo memories included'],
  'Spa & Wellness': ['Full body relaxation session', 'Premium organic products used', 'Private treatment room', 'Herbal refreshments included', 'Certified therapists'],
  'Private Screenings': ['Private theatre/venue booking', 'Choice of movie & snacks', 'Decorated seating area', 'Sound & projection setup', 'Up to 2-4 guests included'],
}

// ============================================
// .map() se har item mein extra details add karo
// ============================================
export const experiences: Experience[] = baseExperiences.map((item) => ({
  ...item,
  images: [item.image, item.image],
  reviews: 30 + (item.id * 13) % 150,
  description: categoryDescriptions[item.category],
  highlights: categoryHighlights[item.category],
}))