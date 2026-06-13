import { useState } from 'react'
import { FiChevronDown, FiStar, FiMapPin, FiCheckCircle } from 'react-icons/fi'

const allVendors = [
  { id: 1, name: 'Aura Event Studio', category: 'Decorator', location: 'Delhi', rating: 4.9, reviews: 124, priceLevel: 'Luxury', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400', verified: true },
  { id: 2, name: 'Crystal Moments', category: 'Florist', location: 'Mumbai', rating: 4.8, reviews: 98, priceLevel: 'Premium', image: 'https://images.unsplash.com/photo-1561128290-006fc5e4ce9b?w=400', verified: true },
  { id: 3, name: 'Velvet Palace Catering', category: 'Caterer', location: 'Bangalore', rating: 5.0, reviews: 210, priceLevel: 'Luxury', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', verified: true },
  { id: 4, name: 'Grand Hoop Events', category: 'Event Planner', location: 'Jaipur', rating: 4.7, reviews: 87, priceLevel: 'Mid', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400', verified: false },
  { id: 5, name: 'Lens & Light Studio', category: 'Photographer', location: 'Delhi', rating: 4.9, reviews: 156, priceLevel: 'Premium', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', verified: true },
  { id: 6, name: 'Bloom & Petal Co.', category: 'Florist', location: 'Pune', rating: 4.6, reviews: 64, priceLevel: 'Budget', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400', verified: false },
  { id: 7, name: 'Spotlight DJ & Music', category: 'Entertainment', location: 'Mumbai', rating: 4.8, reviews: 132, priceLevel: 'Mid', image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400', verified: true },
  { id: 8, name: 'Royal Décor House', category: 'Decorator', location: 'Jaipur', rating: 4.9, reviews: 178, priceLevel: 'Luxury', image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?w=400', verified: true },
  { id: 9, name: 'Sweet Bites Bakery', category: 'Caterer', location: 'Delhi', rating: 4.5, reviews: 45, priceLevel: 'Budget', image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400', verified: false },
]

const categories = ['Decorator', 'Florist', 'Caterer', 'Photographer', 'Event Planner', 'Entertainment']
const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Jaipur', 'Pune']

const Vendors = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('rating')

  const toggleFilter = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void
  ) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((v) => v !== value))
    } else {
      setSelected([...selected, value])
    }
  }

  let filteredVendors = allVendors.filter((vendor) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(vendor.category)
    const locationMatch = selectedLocations.length === 0 || selectedLocations.includes(vendor.location)
    return categoryMatch && locationMatch
  })

  if (sortBy === 'rating') {
    filteredVendors = [...filteredVendors].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'reviews') {
    filteredVendors = [...filteredVendors].sort((a, b) => b.reviews - a.reviews)
  }

  return (
    <div className="bg-[#FDFAF4]">

      {/* HEADER */}
      <div className="bg-white border-b border-[#EDE0C4] py-10">
        <div className="container mx-auto px-6">
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A] mb-3">
            Home / <span className="text-[#D9776B]">Vendors</span>
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.2rem] md:text-[2.8rem] text-[#1A1208] font-semibold mb-2">
            Find Your Perfect Vendor
          </h1>
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
            From decorators to photographers — verified professionals for every celebration.
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT SIDEBAR */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-6 sticky top-[140px]">

              <h3 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#1A1208] font-semibold tracking-[0.1em] uppercase mb-5 pb-4 border-b border-[#EDE0C4]">
                Filter Vendors
              </h3>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-3">
                  Category
                </h4>
                <div className="space-y-2.5">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(cat, selectedCategories, setSelectedCategories)}
                        className="accent-[#D9776B] w-4 h-4 cursor-pointer rounded"
                      />
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#5C4A1E] group-hover:text-[#D9776B] transition-colors">
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <h4 style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-3">
                  Location
                </h4>
                <div className="space-y-2.5">
                  {locations.map((loc) => (
                    <label key={loc} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={() => toggleFilter(loc, selectedLocations, setSelectedLocations)}
                        className="accent-[#D9776B] w-4 h-4 cursor-pointer rounded"
                      />
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#5C4A1E] group-hover:text-[#D9776B] transition-colors">
                        {loc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear */}
              <button
                onClick={() => { setSelectedCategories([]); setSelectedLocations([]) }}
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
                <span className="font-semibold text-[#1A1208]">{filteredVendors.length}</span> vendors found
              </p>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="appearance-none bg-white rounded-full border border-[#EDE0C4] pl-4 pr-9 py-2.5 text-[0.8rem] text-[#1A1208] outline-none cursor-pointer focus:border-[#C9A84C]"
                >
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
                <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C9A84C] pointer-events-none" />
              </div>
            </div>

            {/* GRID */}
            {filteredVendors.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-12 text-center">
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] mb-2">
                  No vendors found
                </p>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A]">
                  Try adjusting your filters to see more results.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVendors.map((vendor) => (
                  <div
                    key={vendor.id}
                    className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-[180px] overflow-hidden">
                      <img
                        src={vendor.image}
                        alt={vendor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {vendor.verified && (
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-3 left-3 bg-white rounded-full flex items-center gap-1.5 px-2.5 py-1.5 text-[0.62rem] text-[#1A1208] font-semibold uppercase tracking-[0.1em]">
                          <FiCheckCircle size={11} color="#C9A84C" />
                          Verified
                        </span>
                      )}
                      <span style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-3 right-3 bg-[#1A1208] text-white rounded-full flex items-center gap-1 px-2.5 py-1.5 text-[0.7rem] font-semibold">
                        <FiStar size={11} fill="#C9A84C" color="#C9A84C" />
                        {vendor.rating}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#D9776B] tracking-[0.2em] uppercase mb-1 font-semibold">
                        {vendor.category} · {vendor.priceLevel}
                      </p>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-semibold mb-2">
                        {vendor.name}
                      </h3>

                      <div className="flex items-center justify-between pt-3 border-t border-[#EDE0C4]">
                        <div className="flex items-center gap-1.5 text-[#9E8A6A]">
                          <FiMapPin size={13} />
                          <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem]">{vendor.location}</span>
                        </div>
                        <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A]">
                          {vendor.reviews} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Vendors