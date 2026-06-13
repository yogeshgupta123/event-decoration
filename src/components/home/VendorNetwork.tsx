import { FiMapPin, FiStar } from 'react-icons/fi'

const vendors = [
  { name: 'Aura Event Studio', category: 'Decorator', location: 'Delhi', rating: 4.9, image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400' },
  { name: 'Crystal Moments', category: 'Florist', location: 'Mumbai', rating: 4.8, image: 'https://images.unsplash.com/photo-1561128290-006fc5e4ce9b?w=400' },
  { name: 'Velvet Palace', category: 'Caterer', location: 'Bangalore', rating: 5.0, image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400' },
  { name: 'Grand Hoop', category: 'Event Planner', location: 'Jaipur', rating: 4.7, image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400' },
]

const VendorNetwork = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold mb-2">
            Elite Vendor Network
          </h2>
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#9E8A6A] tracking-[0.25em] uppercase">
            The Names Behind The Magic
          </p>
          <div className="w-10 h-[1px] bg-[#C9A84C] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {vendors.map((vendor) => (
            <div
              key={vendor.name}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.25)] hover:-translate-y-2 transition-all duration-300 p-3"
            >
              <div className="relative h-[160px] md:h-[200px] rounded-xl overflow-hidden mb-4">
                <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div style={{ fontFamily: "'Jost', sans-serif" }} className="absolute top-3 right-3 bg-white rounded-full flex items-center gap-1 px-2.5 py-1 text-[0.7rem] font-semibold text-[#1A1208]">
                  <FiStar size={11} fill="#C9A84C" color="#C9A84C" />
                  {vendor.rating}
                </div>
              </div>
              <div className="px-1 pb-1">
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.05rem] text-[#1A1208] font-semibold mb-1">
                  {vendor.name}
                </h3>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#D9776B] tracking-[0.15em] uppercase mb-1.5 font-semibold">
                  {vendor.category}
                </p>
                <div className="flex items-center gap-1.5 text-[#9E8A6A]">
                  <FiMapPin size={12} />
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem]">{vendor.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#C9A84C] tracking-[0.2em] uppercase font-medium hover:text-[#9A7A2E] transition-colors flex items-center gap-2 mx-auto">
            View All Vendors →
          </button>
        </div>
      </div>
    </section>
  )
}

export default VendorNetwork