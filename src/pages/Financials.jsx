import { useEffect } from 'react'

const FCRA_YEARS = [2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]

export default function Financials() {
  useEffect(() => {
    document.title = 'Financials | Agaram Foundation'
  }, [])

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="relative min-h-screen bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-16 -top-16 w-96 h-96 rounded-full bg-primary-500/8 blur-3xl"></div>
          <div className="absolute right-0 top-1/3 w-80 h-80 rounded-full bg-primary-500/6 blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-primary-400/4 blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-500 mb-8 shadow-lg">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-10 w-10 text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 3.66h-6c-1.287 0 -1.332 1.864 -.133 1.993l.133 .007h1a2 2 0 0 1 1.732 1h-2.732a1 1 0 0 0 0 2l2.732 .001a2 2 0 0 1 -1.732 .999h-1c-.89 0 -1.337 1.077 -.707 1.707l3 3a1 1 0 0 0 1.414 0l.083 -.094a1 1 0 0 0 -.083 -1.32l-1.484 -1.485l.113 -.037a4.009 4.009 0 0 0 2.538 -2.77l1.126 -.001a1 1 0 0 0 0 -2h-1.126a3.973 3.973 0 0 0 -.33 -.855l-.079 -.145h1.535a1 1 0 0 0 1 -1l-.007 -.117a1 1 0 0 0 -.993 -.883z"></path>
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-600 mb-6">Financials: Local Funds &amp; Foreign Contribution (FC)</h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">Every contribution to Agaram, whether from India or abroad, is treated with care, transparency, and purpose. We recognise that trust is built not just through results, but through accountability in how we get there.</p>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">Diverse Funding Sources</h3>
                    <p className="text-gray-600 text-sm">Individual donors, corporate CSR partners, institutional grants, and foreign contributions under FCRA compliance.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">Full Accountability</h3>
                    <p className="text-gray-600 text-sm">Each rupee is accounted for, audited, and directed towards programs that directly support students.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                      <polyline points="16 7 22 7 22 13"></polyline>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">Direct Impact</h3>
                    <p className="text-gray-600 text-sm">Contributions go directly to programs reaching students and communities with real-time impact updates.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-white/40">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">Transparency as Responsibility</h3>
                    <p className="text-gray-600 text-sm">We see transparency not as a requirement but as a responsibility to our supporters.</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary-50 rounded-2xl p-6 border border-primary-100">
                <p className="text-gray-700 leading-relaxed">Whether you are giving as an individual or as part of an organisation, we want you to know exactly where your support is going and what it&#x27;s making possible. From tuition and hostel fees to mentorship, training, and infrastructure development in schools.</p>
              </div>
            </div>
          </div>
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">FCRA Financial Documents</h2>
              <p className="text-gray-600">Filing Process FCRA - Funds received by Agaram Foundation via FCRA</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {FCRA_YEARS.map((year) => (
                <div key={year} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-primary-200 transition-all duration-200">
                  <a href={`/assets/documents/financials/FRCA_${year}-${year + 1}.pdf`} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-lg p-2 bg-primary-100">
                          <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-primary-600" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
                          </svg>
                        </div>
                        <span className="font-semibold text-gray-900">{year} - {year + 1}</span>
                      </div>
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="h-6 w-6 text-primary-500" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3.34a10 10 0 1 1 -15 8.66l.005 -.324a10 10 0 0 1 14.995 -8.336zm-2 3.66h-6c-1.287 0 -1.332 1.864 -.133 1.993l.133 .007h1a2 2 0 0 1 1.732 1h-2.732a1 1 0 0 0 0 2l2.732 .001a2 2 0 0 1 -1.732 .999h-1c-.89 0 -1.337 1.077 -.707 1.707l3 3a1 1 0 0 0 1.414 0l.083 -.094a1 1 0 0 0 -.083 -1.32l-1.484 -1.485l.113 -.037a4.009 4.009 0 0 0 2.538 -2.77l1.126 -.001a1 1 0 0 0 0 -2h-1.126a3.973 3.973 0 0 0 -.33 -.855l-.079 -.145h1.535a1 1 0 0 0 1 -1l-.007 -.117a1 1 0 0 0 -.993 -.883z"></path>
                      </svg>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs uppercase tracking-wide text-gray-500 mb-1">FCRA ACCOUNTS</div>
                      <div className="text-gray-700">Financial Statements</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">View Report</span>
                      <span className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-primary-500 text-white hover:bg-primary-600 transition-colors duration-200">Open PDF</span>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
