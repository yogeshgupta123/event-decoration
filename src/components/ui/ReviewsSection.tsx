import { FiStar } from 'react-icons/fi'
import { sampleReviews } from '../../data/reviews'
import Slider from './Slider'
import FadeIn from '../animations/FadeIn'

// ============================================
// id="reviews-section" — isi id pe rating click
// karne se "scroll" hoga (anchor link concept)
// ============================================
const ReviewsSection = () => {
  return (
    <div id="reviews-section" className="mt-16">
      <FadeIn>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }} className="text-[1.8rem] text-[#1A1208] font-semibold mb-6">
          Customer Reviews 📸
        </h2>
      </FadeIn>

      <Slider>
        {sampleReviews.map((review) => (
          <div
            key={review.id}
            className="shrink-0 w-[300px] bg-white rounded-2xl p-5 shadow-[0_4px_16px_rgba(26,18,8,0.06)]"
          >
            {/* User Info */}
            <div className="flex items-center gap-3 mb-3">
              <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.82rem] text-[#1A1208] font-semibold">{review.name}</p>
                <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.65rem] text-[#9E8A6A]">{review.date}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={12} fill={i < review.rating ? '#D9776B' : 'none'} color={i < review.rating ? '#D9776B' : '#EDE0C4'} />
              ))}
            </div>

            {/* Comment */}
            <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#5C4A1E] leading-relaxed mb-3">
              {review.comment}
            </p>

            {/* Customer Photos */}
            <div className="flex gap-2">
              {review.photos.map((photo, i) => (
                <img key={i} src={photo} alt="" className="w-16 h-16 rounded-lg object-cover" />
              ))}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ReviewsSection