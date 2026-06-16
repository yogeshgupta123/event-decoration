export interface DecorCard {
  id: number
  title: string
  price: number
  image: string
}

export interface DecorSlider {
  key: string
  heading: string
  emoji: string
  viewAllLink: string
  items: DecorCard[]
}

// ============================================
// HELPER — repeated images se quick cards banao
// ============================================
const makeCards = (titles: string[], basePrice: number, images: string[]): DecorCard[] =>
  titles.map((title, i) => ({
    id: Math.floor(Math.random() * 100000) + i,
    title,
    price: basePrice + i * 1500,
    image: images[i % images.length],
  }))

export const decorSliders: DecorSlider[] = [
  {
    key: 'birthday',
    heading: 'Birthday Decoration',
    emoji: '🎂',
    viewAllLink: '/services?category=Birthday',
    items: makeCards(
      ['Golden Balloon Theme', 'Pastel Birthday Setup', 'Neon Glow Party', 'Floral Birthday Arch', 'Disco Theme Decor', 'Royal Birthday Setup'],
      14999,
      ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400']
    ),
  },
  {
    key: 'anniversary',
    heading: 'Anniversary Decoration',
    emoji: '💍',
    viewAllLink: '/services?category=Wedding',
    items: makeCards(
      ['Golden Anniversary Setup', 'Rose Petal Romance', 'Candle & Fairy Lights', 'Photo Memory Wall', 'Elegant Table Setup', 'Couple Throne Decor'],
      17999,
      ['https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400', 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400']
    ),
  },
  {
    key: 'kids',
    heading: 'Kids Birthday Decoration',
    emoji: '🎈',
    viewAllLink: '/services?category=Birthday',
    items: makeCards(
      ['Unicorn Theme Party', 'Superhero Setup', 'Princess Castle Decor', 'Jungle Safari Theme', 'Space Adventure Party', 'Cartoon Character Decor'],
      9999,
      ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400']
    ),
  },
  {
    key: 'romanticCouple',
    heading: 'Romantic Couple Celebration',
    emoji: '❤️',
    viewAllLink: '/experiences?category=Romantic Dinners',
    items: makeCards(
      ['Rooftop Romance Setup', 'Private Beach Decor', 'Candlelight Room', 'Rose Petal Path', 'Heart Balloon Arch', 'Starlight Picnic Setup'],
      12999,
      ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400']
    ),
  },
  {
    key: 'candleDinner',
    heading: 'Dinner & Candlelight Setup',
    emoji: '🕯️',
    viewAllLink: '/experiences?category=Romantic Dinners',
    items: makeCards(
      ['Rooftop Candlelight Dinner', 'Private Beachside Dinner', 'Indoor Candle Dinner', 'Garden Candlelight Setup', 'Terrace Dinner Decor', 'Pool Side Dinner Setup'],
      15999,
      ['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400', 'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400']
    ),
  },
  {
    key: 'proposal',
    heading: 'Romantic Proposal Setup',
    emoji: '💎',
    viewAllLink: '/experiences?category=Romantic Dinners',
    items: makeCards(
      ['Rose Petal Proposal', 'Fairy Light Proposal Setup', 'Beach Proposal Decor', 'Rooftop Proposal Theme', 'Candle Heart Proposal', 'Balloon Ring Proposal'],
      11999,
      ['https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400', 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400', 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400']
    ),
  },
  {
    key: 'babyWelcome',
    heading: 'Baby Welcome Decoration',
    emoji: '👶',
    viewAllLink: '/services',
    items: makeCards(
      ['Welcome Baby Balloon Arch', 'Baby Shower Theme Decor', 'Pink & Blue Welcome Setup', 'Cute Teddy Theme Decor', 'Baby Naming Ceremony Setup', 'Floral Baby Welcome'],
      8999,
      ['https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400', 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400']
    ),
  },
  {
    key: 'festivals',
    heading: 'Indian Festivals Decoration',
    emoji: '🪔',
    viewAllLink: '/services',
    items: makeCards(
      ['Diwali Diya Decor', 'Holi Color Theme Setup', 'Ganesh Chaturthi Decor', 'Navratri Theme Setup', 'Raksha Bandhan Decor', 'Karva Chauth Setup', 'Eid Celebration Decor', 'Christmas Theme Decor', 'New Year Party Setup', 'Lohri Bonfire Decor', 'Janmashtami Setup', 'Onam Festival Decor'],
      7999,
      ['https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400', 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400']
    ),
  },
]