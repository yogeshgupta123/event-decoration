export interface AddOn {
  id: number
  name: string
  price: number
  image: string
}

export interface ShopItem {
  id: number
  title: string
  category: string
  subcategory: string
  price: number
  rating: number
  reviews: number
  image: string
  images: string[]
  description: string
  addOns: AddOn[]
}

// ============================================
// RAW DATA — basic info
// ============================================
const baseItems = [
  { id: 101, title: 'Red Rose Bouquet', category: 'Flowers', subcategory: 'Bouquets', price: 1299, rating: 4.8, image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400' },
  { id: 102, title: 'Mixed Flower Basket', category: 'Flowers', subcategory: 'Arrangements', price: 1899, rating: 4.7, image: 'https://images.unsplash.com/photo-1487070183336-b863922373d4?w=400' },
  { id: 103, title: 'Lily Elegance Vase', category: 'Flowers', subcategory: 'Arrangements', price: 2199, rating: 4.9, image: 'https://images.unsplash.com/photo-1469259943454-aa100abba9a8?w=400' },
  { id: 104, title: 'Orchid Charm', category: 'Flowers', subcategory: 'Exotic', price: 2999, rating: 4.8, image: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=400' },

  { id: 201, title: 'Chocolate Truffle Cake', category: 'Cakes', subcategory: 'By Flavor', price: 899, rating: 4.9, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
  { id: 202, title: 'Red Velvet Delight', category: 'Cakes', subcategory: 'By Flavor', price: 1099, rating: 4.8, image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400' },
  { id: 203, title: 'Photo Cake Special', category: 'Cakes', subcategory: 'By Type', price: 1299, rating: 4.7, image: 'https://images.unsplash.com/photo-1535141192574-5e97c1df8c66?w=400' },
  { id: 204, title: 'Designer Pinata Cake', category: 'Cakes', subcategory: 'By Type', price: 1599, rating: 4.9, image: 'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400' },

  { id: 301, title: 'Money Plant in Ceramic Pot', category: 'Plants', subcategory: 'Indoor', price: 599, rating: 4.6, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400' },
  { id: 302, title: 'Peace Lily Plant', category: 'Plants', subcategory: 'Indoor', price: 799, rating: 4.7, image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400' },
  { id: 303, title: 'Bonsai Tree', category: 'Plants', subcategory: 'Gift Plants', price: 1499, rating: 4.8, image: 'https://images.unsplash.com/photo-1611171711912-aa4b3e0b34cf?w=400' },
  { id: 304, title: 'Succulent Garden Set', category: 'Plants', subcategory: 'Indoor', price: 899, rating: 4.7, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400' },

  { id: 401, title: 'Custom Photo Frame', category: 'Personalised', subcategory: 'Photo Gifts', price: 799, rating: 4.7, image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400' },
  { id: 402, title: 'Engraved Name Necklace', category: 'Personalised', subcategory: 'Engraved', price: 1299, rating: 4.8, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400' },
  { id: 403, title: 'Personalized Photo Mug', category: 'Personalised', subcategory: 'Photo Gifts', price: 449, rating: 4.6, image: 'https://images.unsplash.com/photo-1572119865084-43c285814d63?w=400' },
  { id: 404, title: 'Custom Print Hoodie', category: 'Personalised', subcategory: 'Custom Prints', price: 1899, rating: 4.7, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400' },

  { id: 501, title: 'Ferrero Rocher Box (24pc)', category: 'Chocolates', subcategory: 'Premium', price: 1599, rating: 4.9, image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400' },
  { id: 502, title: 'Belgian Chocolate Hamper', category: 'Chocolates', subcategory: 'Premium', price: 2499, rating: 4.8, image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?w=400' },
  { id: 503, title: 'Personalized Photo Chocolate', category: 'Chocolates', subcategory: 'Customized', price: 999, rating: 4.7, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400' },
  { id: 504, title: 'Dark Chocolate Sugar-Free Box', category: 'Chocolates', subcategory: 'Sugar Free', price: 799, rating: 4.6, image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?w=400' },

  { id: 601, title: 'Luxury Celebration Hamper', category: 'Hampers', subcategory: 'Gift Hampers', price: 3499, rating: 4.9, image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab0?w=400' },
  { id: 602, title: 'Diwali Special Hamper', category: 'Hampers', subcategory: 'Festive', price: 2299, rating: 4.8, image: 'https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=400' },
  { id: 603, title: 'Corporate Welcome Kit', category: 'Hampers', subcategory: 'Corporate', price: 1899, rating: 4.7, image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400' },
  { id: 604, title: 'Spa & Relaxation Hamper', category: 'Hampers', subcategory: 'Gift Hampers', price: 2799, rating: 4.8, image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400' },

  { id: 701, title: 'Birthday Balloon Arch Kit', category: 'Balloon', subcategory: 'Balloon Decor', price: 1499, rating: 4.7, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400' },
  { id: 702, title: 'LED Balloon Bouquet', category: 'Balloon', subcategory: 'Balloon Decor', price: 999, rating: 4.6, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400' },
  { id: 703, title: 'Number Foil Balloons Set', category: 'Balloon', subcategory: 'Balloon Decor', price: 599, rating: 4.5, image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400' },

  { id: 801, title: 'Premium Watch Gift Box', category: 'Luxury', subcategory: 'Exclusive Gifts', price: 8999, rating: 4.9, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400' },
  { id: 802, title: 'Designer Perfume Set', category: 'Luxury', subcategory: 'Exclusive Gifts', price: 5499, rating: 4.8, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400' },
  { id: 803, title: 'Crystal Decor Showpiece', category: 'Luxury', subcategory: 'Premium Setups', price: 4299, rating: 4.7, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=400' },
]

export const allCategories = ['Flowers', 'Cakes', 'Plants', 'Personalised', 'Chocolates', 'Hampers', 'Balloon', 'Luxury']

// ============================================
// CATEGORY KE HISAAB SE DESCRIPTION
// ============================================
const categoryDescriptions: Record<string, string> = {
  Flowers: 'Fresh, hand-picked blooms arranged by expert florists. Delivered same-day with a complimentary care card to keep them fresh longer.',
  Cakes: 'Freshly baked using premium ingredients and customized just for your celebration. Available in eggless and sugar-free options too.',
  Plants: 'Healthy, nursery-fresh plants delivered in elegant pots — a gift that keeps growing with every passing day.',
  Personalised: 'Crafted exclusively for you — add a name, photo, or message to make this gift truly one of a kind.',
  Chocolates: 'Indulgent, premium chocolates sourced from the finest brands — perfect for sharing or self-indulgence.',
  Hampers: 'A curated mix of treats, all beautifully packaged together — the perfect all-in-one gifting solution.',
  Balloon: 'Vibrant, high-quality balloons that instantly transform any space into a celebration-ready setting.',
  Luxury: 'Premium, exclusive items handpicked for those who appreciate the finer things in life.',
}

// ============================================
// ADD-ONS — har product ke saath suggest honge
// ============================================
const commonAddOns: AddOn[] = [
  { id: 9001, name: 'Greeting Card', price: 99, image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab0?w=200' },
  { id: 9002, name: 'Teddy Bear', price: 349, image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=200' },
  { id: 9003, name: 'Premium Chocolate Box', price: 499, image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=200' },
  { id: 9004, name: 'Balloon Bouquet', price: 299, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200' },
  { id: 9005, name: 'Scented Candles Set', price: 249, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=200' },
]

// ============================================
// FINAL DATA — .map() se har item mein extra fields jod do
// (description, images, addOns, reviews)
// ============================================
export const shopItems: ShopItem[] = baseItems.map((item) => ({
  ...item,
  reviews: 40 + (item.id % 137),
  images: [item.image, item.image],
  description: categoryDescriptions[item.category],
  addOns: commonAddOns,
}))