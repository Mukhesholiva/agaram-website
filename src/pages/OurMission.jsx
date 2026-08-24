import { useEffect } from 'react'

const TRUSTEES = [
  { name: 'Mr. S Suriya', role: 'Founder Trustee' },
  { name: 'Mr. Si Karthi', role: 'Trustee' },
  { name: 'Mr. TJ Gnanavel', role: 'Secretary Trustee' },
  { name: 'Ms. Jaishree Damodaran', role: 'Managing Trustee' },
]

const IMPACT_TEXT =
  'When the playing field levels, possibilities multiply. Since we began, Agaram under the Vidhai program has helped close to 6500+ students step into college, for many the first in their families to ever do so. Nearly 68% are young women, all from rural communities and economically challenged backgrounds. With steady mentorship, hostel support, and an unbroken chain of guidance, our students don’t just graduate they secure meaningful jobs or pursue higher studies, reshaping what their families believe is possible. The real change is generational. Families who once saw education as out of reach now speak of degrees and careers with pride.\n\n Former students return to mentor others, forming a circle of trust and shared strength. For us, impact isn’t just measured in numbers, but in the confidence, clarity, and stability that take root in a student’s life rippling outward to communities. Step by step, we are nurturing a society that thinks deeper, acts wiser, and grows stronger together, where equal opportunity is not just a legal right but a reality.'

export default function OurMission() {
  useEffect(() => {
    document.title = 'Our Mission | Agaram Foundation'
  }, [])

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="w-full">
        <section
          className="relative bg-cover bg-center min-h-[320px] sm:min-h-[420px] lg:min-h-[520px] flex items-center justify-center px-4 sm:px-8"
          style={{ backgroundImage: "url('/assets/images/mission/mission_banner.png')" }}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 max-w-3xl w-full text-center text-white space-y-6 py-10 sm:py-16">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold">Our Mission</h1>
            <p className="text-white text-base sm:text-lg lg:text-xl">
              Strive to bridge the gap between deserving students and quality education. Build a new generation of
              responsible youth with education, values, commitment and dedication to society.
            </p>
          </div>
        </section>
        <div id="timeline">
          <div>
            <div className="max-w-7xl mt-16 mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-1">
              <div className="rounded-2xl overflow-hidden flex gap-20 flex-col md:flex-row items-stretch justify-between">
                <div className="p-6 flex flex-col justify-between w-full md:w-1/2 space-y-4 bg-white">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-semibold mb-4 text-gray-900">Impact of Agaram (on Students)</h3>
                    <p className="text-justify text-md text-gray-600">{IMPACT_TEXT}</p>
                  </div>
                </div>
                <div className="relative w-full md:w-1/2 h-[240px] md:h-auto">
                  <img
                    alt="Impact of Agaram (on Students)"
                    loading="lazy"
                    decoding="async"
                    className="object-cover rounded-xl md:rounded-none md:rounded-l-2xl"
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                      color: 'transparent',
                    }}
                    src="/assets/images/mission/our_mission.webp"
                  />
                </div>
              </div>
            </div>
            <section className="max-w-7xl mx-auto px-4 py-10">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold mb-2">The Trust</h2>
                <p className="text-muted-foreground text-base max-w-xl mx-auto">
                  Our mission is taken forward by our trust backed by the following accomplished individuals.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {TRUSTEES.map((trustee) => (
                  <div className="w-full" key={trustee.name}>
                    <div
                      className="flex flex-col relative overflow-hidden h-auto text-foreground box-border outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none rounded-2xl shadow-xl p-4 text-center bg-white/80 backdrop-blur-md"
                      tabIndex={-1}
                    >
                      <div className="relative w-full p-3 flex-auto place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex flex-col items-center gap-3">
                        <div className="text-lg font-semibold text-foreground">{trustee.name}</div>
                        <div className="text-sm text-muted-foreground">{trustee.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
