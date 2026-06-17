import { useState } from 'react'
import PincodeCheck from './PincodeCheck'

interface Props {
  description: string
  highlights: string[]
}

// ============================================
// LEFT COLUMN ke NICHE — Description/Highlights/Delivery tabs
// ============================================
const ImageSectionTabs = ({ description, highlights }: Props) => {
  const [activeTab, setActiveTab] = useState('Overview')
  const tabs = ['Overview', 'Highlights', 'Delivery Check']

  return (
    <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(26,18,8,0.05)] overflow-hidden mt-4">
      <div className="flex border-b border-[#EDE0C4]">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ fontFamily: "'Jost', sans-serif" }}
            className={`flex-1 py-3 text-[0.72rem] font-medium tracking-wide transition-colors ${
              activeTab === tab ? 'text-[#C9A84C] border-b-2 border-[#C9A84C]' : 'text-[#9E8A6A]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-5">
        {activeTab === 'Overview' && (
          <p style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#5C4A1E] leading-relaxed">{description}</p>
        )}
        {activeTab === 'Highlights' && (
          <ul className="space-y-2">
            {highlights.map((h) => (
              <li key={h} style={{ fontFamily: "'Jost', sans-serif" }} className="text-[0.8rem] text-[#5C4A1E] flex items-start gap-2">
                <span className="text-[#C9A84C] mt-0.5">•</span> {h}
              </li>
            ))}
          </ul>
        )}
        {activeTab === 'Delivery Check' && <PincodeCheck />}
      </div>
    </div>
  )
}

export default ImageSectionTabs