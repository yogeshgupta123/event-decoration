
import { combos } from '../../data/combos'
import { useAppDispatch } from '../../store/hooks'
import { addToCart } from '../../store/cartSlice'
import { showToast } from '../../store/uiSlice'
import FadeIn from '../animations/FadeIn'
import Slider from '../ui/Slider'

const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`

const ComboDeals = () => {
  const dispatch = useAppDispatch()

  // ============================================
  // POORA COMBO EK SAATH CART MEIN — har item add karo
  // ============================================
  const handleAddCombo = (combo: typeof combos[number]) => {
    combo.items.forEach((item) => {
      dispatch(addToCart({ id: item.id, title: item.title, category: item.category, price: item.price, image: item.image }))
    })
    dispatch(showToast({ message: `${combo.title} added to cart! 🎁` }))
  }

  return (
    <section className="section-padding bg-[#1A1208]">
      <div className="container mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-10">
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.7rem] text-[#D9776B] tracking-[0.25em] uppercase mb-2">Bundle & Save</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-white font-semibold">Combo Deals ⚡</h2>
          </div>
        </FadeIn>

        <Slider>
          {combos.map((combo) => (
            <div key={combo.id} className="shrink-0 w-[320px] bg-white rounded-2xl p-5 shadow-[0_8px_30px_rgba(0,0,0,0.2)]">
              <div className="flex items-center justify-between mb-3">
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-semibold leading-snug">{combo.title}</h3>
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="bg-[#7B9E7B] text-white rounded-full text-[0.6rem] px-2.5 py-1 font-semibold shrink-0 ml-2">{combo.badge}</span>
              </div>

              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A] leading-relaxed mb-4">{combo.description}</p>

              {/* Mini item thumbnails */}
              <div className="flex gap-2 mb-4">
                {combo.items.map((item, i) => (
                  <div key={item.id} className="relative">
                    <img src={item.image} alt={item.title} className="w-14 h-14 rounded-lg object-cover" />
                    {i < combo.items.length - 1 && (
                      <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 text-[#C9A84C] font-bold">+</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#EDE0C4]">
                <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] font-bold">{formatPrice(combo.comboPrice)}</p>
                <button
                  onClick={() => handleAddCombo(combo)}
                  style={{ fontFamily: "'Jost', sans-serif" }}
                  className="bg-[#C9A84C] text-white rounded-full px-5 py-2.5 text-[0.68rem] tracking-[0.1em] uppercase font-semibold hover:bg-[#1A1208] transition-colors"
                >
                  Add Combo
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default ComboDeals