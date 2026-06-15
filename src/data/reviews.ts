export interface Review {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
  photos: string[]
}

// ============================================
// SAMPLE REVIEWS — customer photos ke saath
// Real app mein ye API se aayenge
// ============================================
export const sampleReviews: Review[] = [
  { id: 1, name: 'Priya Sharma', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', rating: 5, date: '2 weeks ago', comment: 'Absolutely loved it! The setup was even better than the pictures. Highly recommend!', photos: ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300'] },
  { id: 2, name: 'Rahul Mehta', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', rating: 5, date: '1 month ago', comment: 'On-time delivery, beautiful quality. My wife was so surprised!', photos: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300'] },
  { id: 3, name: 'Sneha Kapoor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', rating: 4, date: '3 weeks ago', comment: 'Great experience overall, slight delay but the team made up for it with extra touches.', photos: ['https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=300', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=300'] },
  { id: 4, name: 'Arjun Verma', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', rating: 5, date: '5 days ago', comment: 'Premium quality, worth every rupee. Will book again for sure!', photos: ['https://images.unsplash.com/photo-1607344645866-009c320c5ab0?w=300'] },
  { id: 5, name: 'Ananya Roy', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100', rating: 5, date: '1 week ago', comment: 'The whole process was so smooth — from booking to delivery. Loved the personal touches!', photos: ['https://images.unsplash.com/photo-1530023367847-a683933f4172?w=300', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300'] },
  { id: 6, name: 'Karan Singh', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', rating: 4, date: '2 months ago', comment: 'Good value for money. Customer support was very responsive too.', photos: ['https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300'] },
]