interface Category {
  title: string
  items: string[]
}

interface MegaMenuProps {
  categories: Category[]
  label: string
}

const MegaMenu = ({ categories, label }: MegaMenuProps) => {
  return (
    <div
      className="absolute left-0 right-0 bg-white border-t border-[#EDE0C4]"
      style={{
        boxShadow: '0 30px 80px rgba(0,0,0,0.08)',
      }}
    >
      <div className="container mx-auto px-12 py-14">

        {/* HEADER */}
        <div className="flex items-end justify-between mb-14">
          <div>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '2.4rem',
                color: '#C9A84C',
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {label}
            </h2>

            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                color: '#9E8A6A',
                marginTop: '10px',
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
              }}
            >
              Curated premium experiences crafted for memorable celebrations
            </p>
          </div>

          <button
            className="hidden lg:flex items-center gap-3 px-6 py-3 border border-[#C9A84C] rounded-full text-[#C9A84C] hover:bg-[#C9A84C] hover:text-white transition-all duration-300"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Explore All
            <span>→</span>
          </button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-4 gap-8">

          {categories.map((category) => (
            <div
              key={category.title}
              className="bg-[#FDFAF4] rounded-[28px] p-7 transition-all duration-300 hover:bg-white hover:-translate-y-1"
              style={{
                boxShadow: '0 8px 30px rgba(201,168,76,0.08)',
              }}
            >
              {/* CATEGORY TITLE */}
              <h3
                className="pb-4 border-b border-[#EDE0C4]"
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: '0.72rem',
                  color: '#C9A84C',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                {category.title}
              </h3>

              {/* ITEMS */}
              <ul className="mt-6 space-y-5">

                {category.items.map((item) => (
                  <li key={item}>
                    <button
                      className="group flex items-center justify-between w-full text-left transition-all duration-300 hover:translate-x-1"
                    >
                      <span
                        className="transition-colors duration-300 group-hover:text-[#C9A84C]"
                        style={{
                          fontFamily: "'Jost', sans-serif",
                          fontSize: '0.92rem',
                          color: '#5C4A1E',
                          lineHeight: 1.6,
                        }}
                      >
                        {item}
                      </span>

                      <span
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                        style={{
                          color: '#C9A84C',
                          fontSize: '0.9rem',
                        }}
                      >
                        →
                      </span>
                    </button>
                  </li>
                ))}

              </ul>
            </div>
          ))}

        </div>

        {/* FOOTER */}
        <div className="mt-14 pt-8 border-t border-[#EDE0C4] flex items-center justify-between">

          <div>
            <p
              style={{
                fontFamily: "'Jost', sans-serif",
                color: '#9E8A6A',
                fontSize: '0.82rem',
                letterSpacing: '0.08em',
              }}
            >
              PREMIUM EVENT EXPERIENCES • TRUSTED VENDORS • CURATED SERVICES
            </p>
          </div>

          <button
            className="text-[#C9A84C] hover:text-[#9A7A2E] transition-colors flex items-center gap-2"
            style={{
              fontFamily: "'Jost', sans-serif",
              fontSize: '0.78rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            View All {label}
            <span>→</span>
          </button>

        </div>

      </div>
    </div>
  )
}

export default MegaMenu