import { useParams, Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import { FiStar, FiHeart, FiShoppingBag, FiCheck, FiChevronLeft, FiChevronRight, FiTruck, FiRefreshCw, FiShield, FiMinus, FiPlus } from 'react-icons/fi'
import { useAppDispatch } from '../store/hooks'
import { addToCart } from '../store/cartSlice'

// ============================================
// PRODUCTS DATA — gifts, cakes, small decor
// ============================================
const allProducts = [
  {
    id: 1001, title: 'Luxury Rose Petal Gift Hamper', category: 'Gift', price: 2999, originalPrice: 3999,
    rating: 4.8, reviews: 234, inStock: true, deliveryDays: '2-3',
    description: 'A luxurious gift hamper filled with premium roses, scented candles, artisan chocolates, and a personalized card. Perfect for weddings, anniversaries, and special occasions.',
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600',
      'https://images.unsplash.com/photo-1548907040-4baa42d10919?w=600',
    ],
    variants: [
      { label: 'Small', price: 1999 },
      { label: 'Medium', price: 2999 },
      { label: 'Large', price: 4499 },
    ],
    includes: ['Premium Rose Bouquet (20 stems)', 'Scented Candle Set (3 pcs)', 'Artisan Chocolate Box', 'Personalized Card', 'Luxury Gift Box'],
    tags: ['Gift', 'Wedding', 'Anniversary'],
  },
  {
    id: 1002, title: 'Designer Birthday Cake (Custom)', category: 'Cake', price: 1899, originalPrice: 2200,
    rating: 4.9, reviews: 512, inStock: true, deliveryDays: '1-2',
    description: 'Fully customizable designer birthday cake made by expert pastry chefs. Choose your flavor, design, and message. Available in multiple sizes.',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
      'https://images.unsplash.com/photo-1464349095431-e9a21285b19f?w=600',
    ],
    variants: [
      { label: '500g', price: 999 },
      { label: '1kg', price: 1899 },
      { label: '2kg', price: 3499 },
    ],
    includes: ['Custom Design', 'Flavor of Choice', 'Personalized Message', 'Candles Included', 'Premium Packaging'],
    tags: ['Cake', 'Birthday', 'Custom'],
  },
  {
    id: 1003, title: 'Fairy Light Curtain Set', category: 'Decor', price: 1299, originalPrice: 1799,
    rating: 4.7, reviews: 189, inStock: true, deliveryDays: '3-4',
    description: 'Premium fairy light curtain set for weddings, birthdays, and home decoration. Creates a magical, dreamy ambiance perfect for any celebration.',
    images: [
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600',
    ],
    variants: [
      { label: '3x3 ft', price: 799 },
      { label: '6x6 ft', price: 1299 },
      { label: '9x9 ft', price: 2199 },
    ],
    includes: ['LED Fairy Lights', 'Power Adapter', 'Hanging Hooks (10 pcs)', 'Remote Control', '2 Year Warranty'],
    tags: ['Decor', 'Lights', 'Wedding'],
  },
  {
    id: 1004, title: 'Scented Luxury Candle Set', category: 'Gift', price: 899, originalPrice: 1199,
    rating: 4.6, reviews: 98, inStock: true, deliveryDays: '2-3',
    description: 'Hand-poured luxury scented candles made with premium soy wax. Available in rose, jasmine, sandalwood, and vanilla fragrances.',
    images: [
      'https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=600',
      'https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=600',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600',
    ],
    variants: [
      { label: 'Set of 2', price: 599 },
      { label: 'Set of 4', price: 899 },
      { label: 'Set of 6', price: 1299 },
    ],
    includes: ['Premium Soy Wax Candles', 'Fragrance of Choice', 'Gift Box', 'Ribbon Packaging'],
    tags: ['Gift', 'Candles', 'Luxury'],
  },
  {
    id: 1005, title: 'Personalized Photo Frame', category: 'Gift', price: 799, originalPrice: 999,
    rating: 4.8, reviews: 156, inStock: true, deliveryDays: '3-5',
    description: 'Beautiful personalized photo frame with custom text, date, and design. Made from premium wood with a glass front. Perfect keepsake for any occasion.',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    ],
    variants: [
      { label: '4x6 inch', price: 499 },
      { label: '5x7 inch', price: 799 },
      { label: '8x10 inch', price: 1199 },
    ],
    includes: ['Premium Wood Frame', 'Glass Front', 'Custom Engraving', 'Velvet Stand', 'Gift Packaging'],
    tags: ['Gift', 'Personalized', 'Anniversary'],
  },
]

// Related products same category ke
const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`
const discount = (orig: number, curr: number) => Math.round(((orig - curr) / orig) * 100)

const ProductDetail = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const [activeImage, setActiveImage] = useState(0)
  const [wishlist, setWishlist] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [added, setAdded] = useState(false)
  const [zoom, setZoom] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const imgRef = useRef<HTMLDivElement>(null)

  const product = allProducts.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[#FDFAF4]">
        <div className="text-center">
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] text-[#1A1208] mb-4">Product not found</h2>
          <Link to="/shop" style={{ fontFamily: "'Jost', sans-serif" }} className="text-[#C9A84C] underline">Back to Shop</Link>
        </div>
      </div>
    )
  }

  const currentPrice = product.variants[selectedVariant].price
  const discountPercent = discount(product.originalPrice, currentPrice)
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return
    const rect = imgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: `${product.title} (${product.variants[selectedVariant].label})`,
      category: product.category,
      price: currentPrice * quantity,
      image: product.images[0],
    }))
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <div className="bg-[#FDFAF4]">

      {/* STICKY TOP BAR */}
      <div className="sticky top-[124px] z-40 bg-white border-b border-[#EDE0C4] py-3 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/shop" style={{ fontFamily: "'Jost', sans-serif" }} className="flex items-center gap-1 text-[0.75rem] text-[#9E8A6A] hover:text-[#C9A84C] transition-colors">
              <FiChevronLeft size={14} /> Shop
            </Link>
            <span className="text-[#EDE0C4]">/</span>
            <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] text-[#D9776B] truncate max-w-[200px]">{product.title}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.2rem] text-[#1A1208] font-bold">{formatPrice(currentPrice * quantity)}</span>
            <button
              onClick={handleAddToCart}
              style={{ fontFamily: "'Jost', sans-serif" }}
              className={`rounded-full px-6 py-2 text-[0.72rem] tracking-[0.15em] uppercase font-semibold transition-all ${added ? 'bg-green-500 text-white' : 'bg-[#C9A84C] text-white hover:bg-[#1A1208]'}`}
            >
              {added ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* LEFT — STICKY IMAGE */}
          <div className="lg:sticky lg:top-[184px] lg:self-start">

            {/* Main Image */}
            <div
              ref={imgRef}
              className="relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden mb-4 shadow-[0_8px_40px_rgba(26,18,8,0.12)] cursor-zoom-in bg-white"
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImage]}
                alt={product.title}
                className="w-full h-full object-cover"
                style={{
                  transform: zoom ? 'scale(1.8)' : 'scale(1)',
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                  transition: zoom ? 'transform 0.1s ease' : 'transform 0.4s ease',
                }}
              />

              {/* Discount badge */}
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-[#D9776B] text-white rounded-full px-3 py-1.5 z-10">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] font-bold tracking-wider">{discountPercent}% OFF</span>
                </div>
              )}

              {!zoom && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white rounded-full px-4 py-1.5">
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.62rem] tracking-wider">Hover to zoom</span>
                </div>
              )}

              {/* Nav arrows */}
              <button
                onClick={() => setActiveImage((p) => (p === 0 ? product.images.length - 1 : p - 1))}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md z-10"
              >
                <FiChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveImage((p) => (p === product.images.length - 1 ? 0 : p + 1))}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md z-10"
              >
                <FiChevronRight size={16} />
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlist(!wishlist)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-colors ${wishlist ? 'bg-[#D9776B] text-white' : 'bg-white/90 text-[#1A1208] hover:bg-[#D9776B] hover:text-white'}`}
              >
                <FiHeart size={16} fill={wishlist ? 'white' : 'none'} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`flex-1 h-[70px] rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-[#C9A84C]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Delivery info */}
            <div className="grid grid-cols-3 gap-3 mt-5">
              {[
                { icon: FiTruck, text: `${product.deliveryDays} Day Delivery` },
                { icon: FiRefreshCw, text: '7 Day Returns' },
                { icon: FiShield, text: '100% Genuine' },
              ].map((b) => (
                <div key={b.text} className="bg-white rounded-xl p-3 text-center shadow-[0_2px_8px_rgba(26,18,8,0.05)]">
                  <b.icon size={16} color="#C9A84C" className="mx-auto mb-1" />
                  <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#5C4A1E] font-medium leading-tight">{b.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — SCROLLABLE CONTENT */}
          <div>

            {/* Category + Tags */}
            <div className="flex items-center gap-2 mb-3">
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.62rem] text-[#D9776B] tracking-[0.25em] uppercase font-semibold">{product.category}</span>
              {product.tags.map((tag) => (
                <span key={tag} style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.58rem] bg-[#FDFAF4] border border-[#EDE0C4] text-[#9E8A6A] px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2rem] md:text-[2.6rem] text-[#1A1208] font-semibold leading-tight mb-4">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={14} fill={i < Math.floor(product.rating) ? '#D9776B' : 'none'} color={i < Math.floor(product.rating) ? '#D9776B' : '#EDE0C4'} />
                ))}
              </div>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-semibold">{product.rating}</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-[#9E8A6A]">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[2.4rem] text-[#1A1208] font-bold">{formatPrice(currentPrice)}</span>
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1rem] text-[#9E8A6A] line-through mb-1">{formatPrice(product.originalPrice)}</span>
              {discountPercent > 0 && (
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.75rem] bg-[#D9776B]/10 text-[#D9776B] px-3 py-1 rounded-full font-semibold mb-1">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Variants */}
            <div className="mb-6">
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-3 font-semibold">
                Select Size / Variant
              </p>
              <div className="flex gap-3 flex-wrap">
                {product.variants.map((variant, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedVariant(i)}
                    style={{ fontFamily: "'Jost', sans-serif" }}
                    className={`px-5 py-2.5 rounded-full text-[0.78rem] font-semibold border-2 transition-all ${selectedVariant === i ? 'border-[#1A1208] bg-[#1A1208] text-white' : 'border-[#EDE0C4] text-[#5C4A1E] hover:border-[#C9A84C]'}`}
                  >
                    {variant.label}
                    <span className="ml-1.5 opacity-70 text-[0.7rem]">{formatPrice(variant.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.72rem] text-[#5C4A1E] tracking-[0.15em] uppercase mb-3 font-semibold">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 bg-white rounded-full px-4 py-2 shadow-[0_2px_8px_rgba(26,18,8,0.06)] border border-[#EDE0C4]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#FDFAF4] transition-colors"
                  >
                    <FiMinus size={14} />
                  </button>
                  <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[1rem] text-[#1A1208] font-semibold w-6 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#FDFAF4] transition-colors"
                  >
                    <FiPlus size={14} />
                  </button>
                </div>
                <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#9E8A6A]">
                  Total: <span className="text-[#1A1208] font-semibold">{formatPrice(currentPrice * quantity)}</span>
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                style={{ fontFamily: "'Jost', sans-serif" }}
                className={`flex-1 flex items-center justify-center gap-2 rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold transition-all ${added ? 'bg-green-500 text-white' : 'bg-[#1A1208] text-white hover:bg-[#C9A84C]'}`}
              >
                {added ? <><FiCheck size={15} /> Added to Cart!</> : <><FiShoppingBag size={15} /> Add to Cart</>}
              </button>
              <Link
                to="/cart"
                style={{ fontFamily: "'Jost', sans-serif" }}
                className="flex-1 flex items-center justify-center gap-2 rounded-full py-4 text-[0.78rem] tracking-[0.15em] uppercase font-semibold border-2 border-[#1A1208] text-[#1A1208] hover:bg-[#1A1208] hover:text-white transition-all"
              >
                Buy Now
              </Link>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.3rem] text-[#1A1208] font-semibold mb-3">About This Product</h2>
              <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#5C4A1E] leading-relaxed">{product.description}</p>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-5 mb-6 shadow-[0_4px_16px_rgba(26,18,8,0.05)]">
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.3rem] text-[#1A1208] font-semibold mb-4">What's Inside</h2>
              <ul className="space-y-2.5">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#FDFAF4] border border-[#C9A84C]/30 flex items-center justify-center shrink-0">
                      <FiCheck size={11} color="#C9A84C" />
                    </div>
                    <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#5C4A1E]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In Stock */}
            <div className="flex items-center gap-2 mb-6 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.78rem] text-green-700 font-medium">
                In Stock — Ready to ship in {product.deliveryDays} days
              </span>
            </div>
          </div>
        </div>

        {/* ============================================
            RELATED PRODUCTS
        ============================================ */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] text-[#1A1208] font-semibold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((prod) => (
                <Link
                  key={prod.id}
                  to={`/product/${prod.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(26,18,8,0.06)] hover:shadow-[0_16px_40px_rgba(201,168,76,0.2)] hover:-translate-y-2 transition-all duration-300 block"
                >
                  <div className="h-[160px] overflow-hidden">
                    <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#D9776B] tracking-wider uppercase font-semibold mb-1">{prod.category}</p>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1rem] text-[#1A1208] font-semibold leading-snug mb-2">{prod.title}</h3>
                    <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.85rem] text-[#C9A84C] font-bold">{formatPrice(prod.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* STICKY BOTTOM — Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-[#EDE0C4] px-5 py-4 shadow-[0_-4px_20px_rgba(26,18,8,0.1)]">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.6rem] text-[#9E8A6A]">Total ({quantity} item{quantity > 1 ? 's' : ''})</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.4rem] text-[#1A1208] font-bold">{formatPrice(currentPrice * quantity)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            style={{ fontFamily: "'Jost', sans-serif" }}
            className={`flex items-center gap-2 rounded-full px-6 py-3.5 text-[0.72rem] tracking-wider uppercase font-semibold transition-all ${added ? 'bg-green-500 text-white' : 'bg-[#C9A84C] text-white'}`}
          >
            {added ? <FiCheck size={14} /> : <FiShoppingBag size={14} />}
            {added ? 'Added!' : 'Add to Cart'}
          </button>
          <Link
            to="/cart"
            style={{ fontFamily: "'Jost', sans-serif" }}
            className="rounded-full px-6 py-3.5 text-[0.72rem] tracking-wider uppercase font-semibold border-2 border-[#1A1208] text-[#1A1208]"
          >
            Buy Now
          </Link>
        </div>
      </div>
      <div className="h-20 lg:h-0" />
    </div>
  )
}

export default ProductDetail