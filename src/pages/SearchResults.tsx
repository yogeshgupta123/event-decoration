import { useSearchParams, Link } from 'react-router-dom'
import { FiSearch, FiStar } from 'react-icons/fi'
import { shopItems } from '../data/shopItems'
import { experiences } from '../data/experiences'
import FadeIn from '../components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '../components/animations/StaggerContainer'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const decorationPackages = [
  { id: 1, title: 'Royal Rose Terrace', category: 'Wedding', price: 154999, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400' },
  { id: 2, title: 'Golden Candle Vale', category: 'Wedding', price: 124999, image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400' },
  { id: 3, title: 'Balloon Wonderland', category: 'Birthday', price: 24999, image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400' },
  { id: 4, title: 'Corporate Stage Backdrop', category: 'Corporate', price: 184999, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400' },
  { id: 5, title: 'Ring Ceremony Decor', category: 'Engagement', price: 99999, image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400' },
]

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const query = (searchParams.get('q') || '').toLowerCase()

  // ============================================
  // TEEN ALAG DATA SOURCES MEIN SE SEARCH —
  // decoration + gifts + experiences, sabme dhundo
  // ============================================
  const matchedPackages = query ? decorationPackages.filter((p) => p.title.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)) : []
  const matchedShop = query ? shopItems.filter((s) => s.title.toLowerCase().includes(query) || s.category.toLowerCase().includes(query)) : []
  const matchedExperiences = query ? experiences.filter((e) => e.title.toLowerCase().includes(query) || e.category.toLowerCase().includes(query)) : []

  const totalResults = matchedPackages.length + matchedShop.length + matchedExperiences.length

  return (
    <div className="bg-[#FDFAF4] min-h-[60vh]">
      <div className="bg-white border-b border-[#EDE0C4] py-10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 mb-2">
            <FiSearch size={18} color="#C9A84C" />
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#9E8A6A]">Search Results</p>
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold">
            "{query}" <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1rem] text-[#9E8A6A] font-normal">({totalResults} results)</span>
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {totalResults === 0 ? (
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-[0_4px_16px_rgba(26,18,8,0.06)] p-12 text-center">
              <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.5rem] text-[#1A1208] mb-2">No results found for "{query}"</p>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#9E8A6A] mb-6">Try different keywords, or explore our popular categories.</p>
              <div className="flex gap-3 justify-center flex-wrap">
                <Link to="/services" style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#1A1208] text-white rounded-full px-6 py-3 text-[0.72rem] uppercase tracking-wider hover:bg-[#C9A84C] transition-colors">Decoration Packages</Link>
                <Link to="/shop" style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#1A1208] text-white rounded-full px-6 py-3 text-[0.72rem] uppercase tracking-wider hover:bg-[#C9A84C] transition-colors">Gift Shop</Link>
                <Link to="/experiences" style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#1A1208] text-white rounded-full px-6 py-3 text-[0.72rem] uppercase tracking-wider hover:bg-[#C9A84C] transition-colors">Experiences</Link>
              </div>
            </div>
          </FadeIn>
        ) : (
          <div className="space-y-12">

            {matchedPackages.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.5rem] text-[#1A1208] font-semibold mb-5">🎨 Decoration Packages ({matchedPackages.length})</h2>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {matchedPackages.map((pkg) => (
                    <StaggerItem key={pkg.id}>
                      <Link to={`/package/${pkg.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300">
                        <div className="h-[150px] overflow-hidden"><img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                        <div className="p-4">
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1.05rem] text-[#1A1208] font-semibold leading-snug mb-1">{pkg.title}</p>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#C9A84C] font-semibold">{formatPrice(pkg.price)}</p>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

            {matchedExperiences.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.5rem] text-[#1A1208] font-semibold mb-5">✨ Experiences ({matchedExperiences.length})</h2>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {matchedExperiences.map((exp) => (
                    <StaggerItem key={exp.id}>
                      <Link to={`/experience/${exp.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300">
                        <div className="h-[150px] overflow-hidden"><img src={exp.image} alt={exp.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                        <div className="p-4">
                          <div className="flex items-center gap-1 mb-1"><FiStar size={11} fill="#D9776B" color="#D9776B" /><span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#1A1208]">{exp.rating}</span></div>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1.05rem] text-[#1A1208] font-semibold leading-snug mb-1">{exp.title}</p>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#C9A84C] font-semibold">From {formatPrice(exp.price)}</p>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

            {matchedShop.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.5rem] text-[#1A1208] font-semibold mb-5">🎁 Gift Shop ({matchedShop.length})</h2>
                <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {matchedShop.map((shopItem) => (
                    <StaggerItem key={shopItem.id}>
                      <Link to={`/shop/${shopItem.id}`} className="group block bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300">
                        <div className="h-[150px] overflow-hidden"><img src={shopItem.image} alt={shopItem.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                        <div className="p-4">
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1.05rem] text-[#1A1208] font-semibold leading-snug mb-1">{shopItem.title}</p>
                          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.9rem] text-[#C9A84C] font-semibold">{formatPrice(shopItem.price)}</p>
                        </div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResults