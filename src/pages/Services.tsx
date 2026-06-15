import { showToast } from '../store/uiSlice'
import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiChevronDown, FiHeart, FiMapPin, FiShoppingBag } from 'react-icons/fi'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/cartSlice'

const allPackages = [
  { id: 1, title: 'Royal Rose Terrace', category: 'Wedding', price: 154999, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400', badge: 'Best Seller' },
  { id: 2, title: 'Golden Candle Vale', category: 'Wedding', price: 124999, image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400', badge: null },
  { id: 3, title: 'Floral Mandap Setup', category: 'Wedding', price: 89999, image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400', badge: null },
  { id: 4, title: 'Vintage Mehendi Theme', category: 'Wedding', price: 64999, image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400', badge: 'Trending' },
  { id: 5, title: 'Balloon Wonderland', category: 'Birthday', price: 24999, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400', badge: null },
  { id: 6, title: 'Neon Glow Party', category: 'Birthday', price: 32999, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400', badge: null },
  { id: 7, title: 'Princess Theme Setup', category: 'Birthday', price: 45999, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400', badge: 'Premium' },
  { id: 8, title: 'Corporate Stage Backdrop', category: 'Corporate', price: 184999, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400', badge: null },
  { id: 9, title: 'Product Launch Setup', category: 'Corporate', price: 220000, image: 'https://images.unsplash.com/photo-1561128290-006fc5e4ce9b?w=400', badge: 'Premium' },
  { id: 10, title: 'Ring Ceremony Decor', category: 'Engagement', price: 99999, image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400', badge: null },
  { id: 11, title: 'Candlelight Proposal', category: 'Engagement', price: 49999, image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400', badge: 'Trending' },
  { id: 12, title: 'Ethereal Bloom Decor', category: 'Wedding', price: 118499, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400', badge: null },
]

const categories = ['Wedding', 'Birthday', 'Corporate', 'Engagement']
const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const Services = () => {
  const dispatch = useAppDispatch()

  // ============================================
  // useSearchParams — URL ke ?category=Wedding wala part padhega
  // jaise: /services?category=Wedding
  // ============================================
  const [searchParams] = useSearchParams()
  const categoryFromUrl = searchParams.get('category')
const searchQuery = (searchParams.get('search') || '').toLowerCase()
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFromUrl ? [categoryFromUrl] : []
  )
  const [maxPrice, setMaxPrice] = useState(250000)
  const [sortBy, setSortBy] = useState('featured')

  // ============================================
  // Agar URL change ho (mega menu se naya category click karo)
  // toh filter bhi update ho jaye
  // ============================================
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategories([categoryFromUrl])
    }
  }, [categoryFromUrl])

  const toggleCategory = (cat: string) => {
    if (selectedCategories.includes(cat)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== cat))
    } else {
      setSelectedCategories([...selectedCategories, cat])
    }
  }

 let filteredPackages = allPackages.filter((pkg) => {
  const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(pkg.category)
  const priceMatch = pkg.price <= maxPrice
  const searchMatch = !searchQuery || pkg.title.toLowerCase().includes(searchQuery)
  return categoryMatch && priceMatch && searchMatch
})

  if (sortBy === 'low-high') {
    filteredPackages = [...filteredPackages].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'high-low') {
    filteredPackages = [...filteredPackages].sort((a, b) => b.price - a.price)
  }

  return (
    <div className="bg-[#FDFAF4]">

      {/* PAGE HEADER */}
      <div className="bg-white border-b border-[#EDE0C4] py-10">
        <div className="container mx-auto px-6">
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A] mb-3">
            Home / Services / <span className="text-[#D9776B]">All Packages</span>
          </p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.2rem] md:text-[2.8rem] text-[#1A1208] font-semibold mb-2">
                Event Decoration Packages
              </h1>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
                Curated themes for every celebration, from intimate gatherings to grand events.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-white rounded-full border border-[#EDE0C4] px-4 py-2.5 self-start">
              <FiMapPin size={15} color="#C9A84C" />
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#5C4A1E]">Delhi NCR</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 sticky top-[140px]">

              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#1A1208] font-semibold tracking-[0.1em] uppercase mb-5 pb-4 border-b border-[#EDE0C4]">
                Refine Search
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-3">
                  Event Type
                </h4>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="accent-[#D9776B] w-4 h-4 cursor-pointer rounded"
                      />
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#5C4A1E] group-hover:text-[#D9776B] transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h4 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-3">
                  Max Budget
                </h4>
                <input
                  type="range"
                  min="20000"
                  max="250000"
                  step="5000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#D9776B]"
                />
                <div className="flex justify-between mt-2">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">₹20,000</span>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#D9776B] font-semibold">{formatPrice(maxPrice)}</span>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => { setSelectedCategories([]); setMaxPrice(250000) }}
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="w-full rounded-full border border-[#EDE0C4] text-[#5C4A1E] py-2.5 text-[0.75rem] tracking-[0.15em] uppercase hover:border-[#D9776B] hover:text-[#D9776B] transition-colors"
              >
                Clear All Filters
              </button>

            </div>
          </aside>

          {/* RIGHT — Results */}
          <div className="lg:col-span-3">

            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#5C4A1E]">
                <span className="font-semibold text-[#1A1208]">{filteredPackages.length}</span> packages found
              </p>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="appearance-none bg-white rounded-full border border-[#EDE0C4] pl-4 pr-9 py-2.5 text-[0.8rem] text-[#1A1208] outline-none cursor-pointer focus:border-[#C9A84C]"
                >
                  <option value="featured">Featured First</option>
                  <option value="low-high">Price: Low to High</option>
                  <option value="high-low">Price: High to Low</option>
                </select>
                <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none" />
              </div>
            </div>

            {/* GRID */}
            {filteredPackages.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-12 text-center">
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] mb-2">
                  No packages found
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPackages.map((pkg) => (
                  // ============================================
                  // POORA CARD AB EK LINK HAI — click karo toh detail page khulega
                  // ============================================
                  <Link
                    to={`/package/${pkg.id}`}
                    key={pkg.id}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-[200px] overflow-hidden">
                      <img
                        src={pkg.image}
                        alt={pkg.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {pkg.badge && (
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-3 left-3 bg-[#D9776B] text-white rounded-full text-[0.6rem] px-3 py-1.5 tracking-[0.15em] uppercase font-semibold">
                          {pkg.badge}
                        </span>
                      )}
                      {/* Wishlist — click se navigate na ho isliye stopPropagation */}
                      <button
                        onClick={(e) => e.preventDefault()}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center hover:bg-[#D9776B] hover:text-white transition-colors"
                      >
                        <FiHeart size={14} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#C9A84C] tracking-[0.2em] uppercase mb-1 font-semibold">
                        {pkg.category}
                      </p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-semibold mb-3">
                        {pkg.title}
                      </h3>
                      <div className="flex items-center justify-between pt-3 border-t border-[#EDE0C4]">
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1.05rem] text-[#1A1208] font-semibold">
                          {formatPrice(pkg.price)}
                        </span>
                        <button
                          onClick={(e) => {
                            // ============================================
                            // VERY IMPORTANT — ye click ko yahin rok do
                            // taaki parent Link navigate na kare!
                            // ============================================
                            e.preventDefault()
                            e.stopPropagation()
                            dispatch(addToCart({
                              id: pkg.id,
                              title: pkg.title,
                              category: pkg.category,
                              price: pkg.price,
                              image: pkg.image,
                            }))
                              dispatch(showToast({ message: `${pkg.title} added to cart! 🛒` }))

                          }}
                          style={{ fontFamily: "'Jost', sans-serif" }}
                          className="flex items-center gap-1.5 bg-[#1A1208] text-white rounded-full px-4 py-2 text-[0.68rem] tracking-[0.1em] uppercase font-medium hover:bg-[#C9A84C] transition-colors"
                        >
                          <FiShoppingBag size={12} /> Add
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Services