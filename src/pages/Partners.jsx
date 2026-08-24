import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PARTNERS } from '../data/partners.js'

const TABS = ['All', 'Engineering', 'Hospital & Nursing', 'Arts & Science', 'Polytechnic', 'University', 'Group of Institutions']

const ACTIVE_TAB_CLASS =
  'z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 gap-2 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary data-[hover=true]:opacity-hover activeTab text-white capitalize text-md font-semibold'

const INACTIVE_TAB_CLASS =
  'z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 gap-2 rounded-full [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary/20 text-primary-600 data-[hover=true]:opacity-hover inactiveTab capitalize text-md font-semibold'

function PartnerCard({ partner }) {
  return (
    <div
      className="relative overflow-hidden h-auto text-foreground box-border outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none bg-white rounded-2xl shadow-none p-4 flex flex-col justify-between border-2 border-gray-300 flex-shrink-0 w-72"
      tabIndex={-1}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div>
          <h3 className="text-md font-semibold">{partner.name}</h3>
          <p className="text-sm text-default-800">{partner.location}</p>
        </div>
      </div>
      <div className="text-center mt-2">
        <div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap border-medium border-default text-foreground bg-transparent px-1 h-7 text-small rounded-full">
          <span className="w-2 h-2 ml-1 rounded-full bg-primary"></span>
          <span className="flex-1 text-inherit font-normal px-2">{partner.category}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 mt-4 border-t border-gray-100 text-sm text-gray-700">
        <div className="text-center">
          <p className="text-sm text-gray-500">Current Students</p>
          <p className="text-primary text-lg font-bold">{partner.currentStudents}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-primary text-lg font-bold">{partner.totalStudents}</p>
        </div>
      </div>
    </div>
  )
}

export default function Partners() {
  const [activeTab, setActiveTab] = useState('All')

  useEffect(() => {
    document.title = 'Our Partners | Agaram Foundation'
  }, [])

  const visible = activeTab === 'All' ? PARTNERS : PARTNERS.filter((p) => p.category === activeTab)
  // The original page renders each marquee row's list twice for a seamless loop.
  const marqueeItems = [...visible, ...visible]
  const marqueeDuration = `${Math.max(visible.length * 3, 12)}s`

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="w-full">
        <section
          className="relative bg-cover bg-center min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center px-4 sm:px-8"
          style={{ backgroundImage: "url('/assets/images/partners/partner_banner.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-3xl w-full text-center text-white space-y-6 py-10 sm:py-16">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">Our Trusted Partners</h1>
            <p className="text-white text-base sm:text-lg lg:text-xl">We work with organizations that care about real impact. Through strong partnerships, we bring innovation, education, and empowerment to the people who need it most.</p>
            <Link
              role="button"
              tabIndex={0}
              data-react-aria-pressable="true"
              className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-24 h-12 gap-3 [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary data-[hover=true]:opacity-hover rounded-full text-base sm:text-lg px-6 py-4 text-white"
              to="/contact"
            >
              Become a Partner
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true" focusable="false" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </section>
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </svg>
                Our Partnership Impact
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">4,700+</div>
                  <div className="text-secondary-light text-sm">Students Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">35+</div>
                  <div className="text-secondary-light text-sm">Partner Institutions</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15+</div>
                  <div className="text-secondary-light text-sm">Years of Collaboration</div>
                </div>
              </div>
            </div>
            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-primary" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                    <path d="M22 10v6"></path>
                    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-secondary">Our Educational Partners</h2>
                  <p className="text-secondary-light">The backbone of our mission</p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 sm:p-10 mb-8">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <p className="text-lg text-secondary leading-relaxed">Agaram&#x27;s journey wouldn&#x27;t be possible without our biggest backbone - <strong>the colleges that open their doors to first-generation learners.</strong> Over the years, our partner institutions across Tamil Nadu have been instrumental in transforming lives.</p>
                    <p className="text-secondary-light">These colleges don&#x27;t just provide an education; they give our students a fighting chance to rewrite their futures through comprehensive support and unwavering commitment.</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-secondary mb-4">What Our Partners Provide:</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-secondary-light">Full scholarships for deserving students</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-secondary-light">Reserved seat allocations</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-secondary-light">Hostel facilities and accommodation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-secondary-light">Dedicated academic support</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 sm:p-12">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-secondary mb-4">Together We Build the Future</h3>
                <p className="text-lg text-secondary-light leading-relaxed">Together, our partners form the ecosystem that makes Agaram&#x27;s vision a living, breathing reality. Every scholarship granted, every door opened, and every opportunity created brings us closer to a world where education truly has the power to transform lives.</p>
              </div>
            </div>
          </div>
        </section>
        <div>
          <style>{`
            @keyframes partners-marquee-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            @keyframes partners-marquee-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          `}</style>
          <div className="w-full">
            <section className="max-w-7xl mx-auto py-8">
              <div className="flex flex-wrap justify-center gap-3">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    className={tab === activeTab ? ACTIVE_TAB_CLASS : INACTIVE_TAB_CLASS}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div
                className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large transition-transform-background motion-reduce:transition-none shadow-none mt-8"
                tabIndex={-1}
              >
                <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-0">
                  <div className="w-full py-8 space-y-10">
                    <div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-center text-secondary mb-12">Institutional Partners</h2>
                      <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                        <div
                          key={`row1-${activeTab}`}
                          className="flex gap-4 w-max"
                          style={{ animation: `partners-marquee-left ${marqueeDuration} linear infinite` }}
                        >
                          {marqueeItems.map((partner, i) => (
                            <PartnerCard key={`${partner.name}-${partner.location}-${i}`} partner={partner} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                        <div
                          key={`row2-${activeTab}`}
                          className="flex gap-4 w-max"
                          style={{ animation: `partners-marquee-right ${marqueeDuration} linear infinite` }}
                        >
                          {marqueeItems.map((partner, i) => (
                            <PartnerCard key={`${partner.name}-${partner.location}-${i}`} partner={partner} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
