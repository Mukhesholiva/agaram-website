import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const HERO_BUTTON_CLASS =
  'tap-highlight-transparent no-underline hover:opacity-hover active:opacity-disabled z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 gap-2 [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none text-default-foreground data-[hover=true]:opacity-hover flex items-center px-3 py-3 sm:px-4 sm:py-5 rounded-lg text-sm sm:text-base bg-white/50 hover:bg-white'

const SLIDES = [
  {
    id: 'moringa-superblend',
    title: 'Transforming living',
    subtitle: 'With Learn-for-all Access',
    background: 'linear-gradient(to top,#5cc9d7 0%,#9cdce5 33%,#c7eef1 66%,#ffffff 100%)',
    imageSrc: '/assets/images/slider/agaram_slider_img_1.webp',
    leftSubtitle: 'Extend the power of education to every corner of society.',
    rightSubtitle: 'Strive to bridge the gap between deserving students and quality education.',
    leftButtons: [{ label: 'Our Mission', link: '/our_mission', external: false }],
    rightButtons: [{ label: 'Donate Now', link: '/donate', external: false }],
  },
  {
    id: 'app-launch',
    title: 'Presenting Our New App',
    subtitle: 'Now Available on Play Store',
    background: 'linear-gradient(to top,#5cc9d7 0%,#9cdce5 33%,#c7eef1 66%,#ffffff 100%)',
    imageSrc: '/assets/images/slider/agaram_slider_img_2.webp',
    leftSubtitle: 'Download our app to empower education with just a tap.',
    rightSubtitle: 'Strive to bridge the gap between deserving students and quality education.',
    leftButtons: [
      {
        label: 'Download App',
        link: 'https://play.google.com/store/apps/details?id=com.agaramfoundation.app&pcampaignid=web_share',
        external: true,
      },
    ],
    rightButtons: [{ label: 'Support Students', link: '/donate', external: false }],
  },
]

const INITIATIVES = [
  {
    title: 'Vidhai',
    description:
      "The Vidhai programme supports first-generation learners through college by offering tuition aid, mentorship, and continuous guidance. It doesn't stop at admission; it stays with the student until they are ready to stand on their own.",
    image: '/assets/images/programs/vidhai.jpg',
  },
  {
    title: 'Agaram Mentorship',
    description:
      'Mentors form the backbone of Agaram. Through regular one-on-one interactions, they help students make sense of challenges, choices, and next steps, offering not just advice but presence.',
    image: '/assets/images/programs/mentorship.jpg',
  },
  {
    title: 'Agaram Hostels',
    description:
      'More than a roof over their heads, Agaram Hostels give every student a holistic learning environment fostering independence, adaptability, and growth beyond the classroom.',
    image: '/assets/images/programs/agaram_hostel.jpg',
  },
  {
    title: 'Nammadhu Palli Fellowship',
    description:
      "Launched in 2022, this program places young changemakers in rural government schools to boost learning, cut dropouts, and engage communities. With 50 fellows in 49 schools, it's turning classrooms into engines of lasting change.",
    image: '/assets/images/programs/namadhu_palli.jpg',
  },
  {
    title: 'Sivakumar Educational Trust',
    description:
      'Established by actor Sivakumar, this 47-year legacy laid the foundation for Agaram. It continues to support students through scholarships, awards, and a deep belief that education changes everything quietly, steadily, for the long term.',
    image: '/assets/images/programs/sivakumar_edu_trust.jpg',
  },
]

const ACHIEVERS = [
  { label: 'Doctors', value: '70+', image: '/assets/images/achievers/doctors-min.png' },
  { label: 'Engineers', value: '1750+', image: '/assets/images/achievers/engineers-min.png' },
  { label: 'Paramedics', value: '700+', image: '/assets/images/achievers/paramedics-min.png' },
  { label: 'Diploma', value: '350+', image: '/assets/images/achievers/diploma-min.png' },
  { label: 'Arts & Science', value: '3320+', image: '/assets/images/achievers/arts-science-min.png' },
  {
    label: 'Others Professionals',
    value: '105+',
    image: '/assets/images/achievers/professional-courses-min.png',
  },
]

const VIDEOS = [
  { src: 'https://www.youtube.com/embed/F6YtHAZ2uR4', title: 'YouTube video 1' },
  { src: 'https://www.youtube.com/embed/WUfT9elbI-k', title: 'YouTube video 2' },
  { src: 'https://www.youtube.com/embed/PvS_7NPg3GY', title: 'YouTube video 3' },
  { src: 'https://www.youtube.com/embed/_wsqNLUy3eM', title: 'YouTube video 4' },
]

const FORCE_STATS = [
  { label: 'Years', end: 15, suffix: '+' },
  { label: 'Donors', end: 10000, suffix: 'K+' },
  { label: 'Volunteers', end: 1000, suffix: 'K+' },
  { label: 'Institutions', end: 35, suffix: '+' },
  { label: 'Resources', end: 100, suffix: '+' },
  { label: 'Corporates', end: 25, suffix: '+' },
]

function ArrowIcon() {
  return (
    <svg
      stroke="currentColor"
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="ml-2"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 7h10v10"></path>
      <path d="M7 17 17 7"></path>
    </svg>
  )
}

function HeroButton({ button }) {
  if (button.external) {
    return (
      <a
        className={HERO_BUTTON_CLASS}
        data-react-aria-pressable="true"
        href={button.link}
        tabIndex={0}
        role="button"
      >
        {button.label} <ArrowIcon />
      </a>
    )
  }
  return (
    <Link
      className={HERO_BUTTON_CLASS}
      data-react-aria-pressable="true"
      to={button.link}
      tabIndex={0}
      role="button"
    >
      {button.label} <ArrowIcon />
    </Link>
  )
}

function HeroSlider() {
  const [index, setIndex] = useState(0)
  const canvasRef = useRef(null)
  const sliderRef = useRef(null)

  // Particle background: diagonal grid of drifting squares (matches original canvas effect)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    let offset = 0
    let raf = null
    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = Math.max(1, Math.floor(w * dpr))
      canvas.height = Math.max(1, Math.floor(h * dpr))
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    const spacing = 100 * Math.SQRT2
    const draw = () => {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)
      ctx.strokeStyle = 'rgba(255,255,255,0.15)'
      ctx.lineWidth = 1
      offset = (offset + 0.8) % spacing
      for (let y = -spacing; y < h + spacing; y += spacing) {
        for (let x = -spacing; x < w + spacing; x += spacing) {
          ctx.save()
          ctx.translate(x, (y + offset) % (h + spacing))
          ctx.rotate(Math.PI / 4)
          ctx.strokeRect(-50, -50, 100, 100)
          ctx.restore()
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  // Autoplay (5s, resets after manual navigation)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [index])

  // Re-trigger entrance animations on the active slide (animate.css classes)
  useEffect(() => {
    const root = sliderRef.current
    if (!root) return
    const slide = root.querySelectorAll('.swiper-slide')[index]
    if (!slide) return
    const apply = (el, classes) => {
      if (!el) return
      el.classList.remove(...classes)
      void el.offsetWidth
      el.classList.add(...classes)
    }
    apply(slide.querySelector('.animated-img'), ['animate__animated', 'animate__zoomInUp'])
    apply(slide.querySelector('.animated-title'), ['animate__animated', 'animate__bounceInDown'])
    apply(slide.querySelector('.animated-benefits'), ['animate__animated', 'animate__fadeInRight'])
    apply(slide.querySelector('.animated-nutrients'), ['animate__animated', 'animate__fadeInLeft'])
  }, [index])

  return (
    <div className="relative">
      <canvas
        id="particle-bg"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      ></canvas>
      <div className="swiper swiper-initialized swiper-horizontal" ref={sliderRef}>
        <div
          className="swiper-wrapper"
          style={{
            transform: `translate3d(-${index * 100}%, 0px, 0px)`,
            transitionDuration: '300ms',
          }}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              className="swiper-slide"
              style={{
                background: slide.background,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
              }}
            >
              <div className="flex flex-col w-full">
                <div className="w-full p-4 text-center mt-6 sm:mt-10 animated-title">
                  <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {slide.title}
                  </h1>
                  <h2 className="text-secondary text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium my-2 sm:my-3">
                    {slide.subtitle}
                  </h2>
                </div>
                <div className="flex flex-wrap items-center">
                  <div className="w-full md:w-1/2 lg:w-1/3 order-2 lg:order-1 flex flex-col justify-start items-center text-white p-3 md:mb-3 animated-nutrients">
                    <div className="grid grid-cols-1 gap-4 text-white w-full max-w-md">
                      <div
                        style={{ background: 'rgba(22, 22, 23, 0.2)' }}
                        className="flex flex-col items-center justify-center p-4 text-center rounded-lg"
                      >
                        <p className="text-base sm:text-lg md:text-xl tracking-wide">
                          {slide.leftSubtitle}
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {slide.leftButtons.map((button) => (
                          <HeroButton key={button.label} button={button} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-full lg:w-1/3 order-1 lg:order-2 flex justify-center items-center p-2">
                    <div className="p-2 sm:p-4 text-white text-center">
                      <div className="flex justify-center items-center w-[400px] h-[400px] mx-auto">
                        <img
                          alt={`${slide.title} image`}
                          width="900"
                          height="900"
                          className="animated-img object-contain"
                          style={{ color: 'transparent' }}
                          src={slide.imageSrc}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3 order-3 flex flex-col justify-center items-center text-white p-3 md:mb-3 mb-6 sm:mb-10 animated-benefits">
                    <div className="grid grid-cols-1 gap-4 text-white w-full max-w-md">
                      <div
                        style={{ background: 'rgba(22, 22, 23, 0.2)' }}
                        className="flex flex-col items-center justify-center p-4 text-center rounded-lg"
                      >
                        <p className="text-base sm:text-lg md:text-xl tracking-wide">
                          {slide.rightSubtitle}
                        </p>
                      </div>
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                        {slide.rightButtons.map((button) => (
                          <HeroButton key={button.label} button={button} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal">
          {SLIDES.map((slide, i) => (
            <span
              key={slide.id}
              className={`swiper-pagination-bullet${i === index ? ' swiper-pagination-bullet-active' : ''}`}
              role="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  )
}

function FadeIn({ as: Tag = 'div', className, from, duration, delay = 0, ease = 'ease', children }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : from,
        transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`,
      }}
    >
      {children}
    </Tag>
  )
}

function Counter({ label, end, suffix, inView }) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf = null
    let start = null
    const duration = 2000
    const tick = (now) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(end * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [inView, end])
  const floored = Math.floor(value)
  const display =
    suffix === 'K+'
      ? `${Math.round(floored / 1000)}K+`
      : suffix === '+'
        ? `${floored}+`
        : floored.toLocaleString()
  return (
    <div className="flex flex-col items-center px-4">
      <span className="text-5xl sm:text-6xl font-extrabold text-primary-500 leading-tight">
        {display}
      </span>
      <span className="mt-2 text-sm sm:text-base text-gray-700 tracking-wide text-center uppercase font-medium">
        {label}
      </span>
    </div>
  )
}

function ForceBehind() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return (
    <section ref={sectionRef} className="w-full bg-primary-50 py-20 px-4 md:px-8">
      <div className="mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-16">The Force Behind</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-y-14 gap-x-6">
          {FORCE_STATS.map((stat) => (
            <Counter
              key={stat.label}
              label={stat.label}
              end={stat.end}
              suffix={stat.suffix}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  useEffect(() => {
    document.title = 'Agaram Foundation | Educate. Empower. Elevate.'
  }, [])

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <HeroSlider />
      <div className="max-w-7xl mt-16 mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-1">
        <div className="rounded-2xl overflow-hidden flex gap-20 flex-col md:flex-row items-stretch justify-between">
          <div className="p-6 flex flex-col justify-between w-full md:w-1/2 space-y-4 bg-white">
            <div className="space-y-2">
              <h3 className="text-4xl font-semibold mb-4 text-secondary-500">Agaram Foundation</h3>
              <p className="text-justify text-lg text-secondary-400">
                India stands at a crossroads, racing ahead in science, technology, and
                infrastructure, yet still held back by the weight of inequality. For millions, the
                promise of the Right to Education remains words on paper, and entire communities are
                left untouched by opportunity. At Agaram Foundation, we believe every child,
                deserves the key that can unlock every door in life. We work hand in hand with
                communities to break down barriers, kindle ambition, and make quality education not
                a privilege, but a birthright.
              </p>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 h-[240px] md:h-auto">
            <img
              alt="Agaram Foundation"
              loading="lazy"
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
              sizes="(max-width: 768px) 100vw, 50vw"
              src="/assets/images/agaram-donation-image.webp"
            />
          </div>
        </div>
      </div>
      <section className="relative w-full mt-10 py-8 px-6 md:px-12 bg-black text-white overflow-hidden flex flex-col items-center gap-6 text-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold">Vision</h2>
          <p className="text-lg max-w-xl">
            To bring about a significant positive change in the socio-economic status of the rural
            society by offering quality education to the deserving individual.
          </p>
        </div>
      </section>
      <div
        className="flex flex-col relative h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none overflow-hidden rounded-none"
        tabIndex={-1}
      >
        <div className="relative w-full flex-auto place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex flex-col md:flex-row p-6 md:p-20 gap-6">
          <div className="w-full md:w-1/3 min-w-[200px]">
            <img
              src="/assets/images/mission/founder-message.webp"
              className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large w-full h-auto object-contain"
              alt="Acme Creators"
              data-loaded="true"
            />
          </div>
          <div className="flex-1 px-0 md:px-6 py-2 md:py-5">
            <h3 className="text-2xl md:text-3xl text-secondary-500 font-semibold">
              Founder’s Message
            </h3>
            <div className="text-base md:text-lg text-secondary-400 flex flex-col gap-3 pt-2 leading-relaxed">
              <p>
                Our dream is simple: A society where everyone stands on equal ground. I call it
                simple because something this fundamental should be, but the reality is far from it.
                That’s why our fight is about more than good intentions; it’s about building a world
                where fairness isn’t a privilege. Not because luck favoured them, but because
                opportunity did. And the surest way we know to get there is through education.
                <br />
                <br />
                Why education? Because it doesn’t just change a child’s report card, it changes
                their horizon. It passes on the tools, the values, and the confidence to step into
                the world on their terms. Give it to one child, and you set in motion a ripple, a
                butterfly effect that shapes not just their life, but entire generations to come.
                <br />
                <br />
                At Agaram, this is the heartbeat of our work. Not just handing out degrees, but
                cultivating futures capable of carrying the weight of a fairer tomorrow for decades,
                for lifetimes. And we are doing it shoulder-to-shoulder with volunteers,
                well-wishers, and fellow dreamers, each adding their own thread to this fabric of
                change in society. An equal society isn’t a finished portrait; we have added our
                strokes, but the canvas still calls for many more hands, and that’s what we are
                working to bring together.
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <FadeIn
              as="h2"
              className="text-4xl md:text-5xl font-bold text-secondary-800 mb-4"
              from="translateY(30px)"
              duration={0.6}
            >
              Our Key Initiatives
            </FadeIn>
            <FadeIn
              className="w-24 h-1 bg-primary-400 mx-auto mb-6"
              from="scaleX(0)"
              duration={0.8}
              delay={0.2}
            />
            <FadeIn
              as="p"
              className="text-lg text-secondary-600 max-w-2xl mx-auto"
              from="translateY(20px)"
              duration={0.6}
              delay={0.3}
            >
              Empowering communities through education and creating lasting change
            </FadeIn>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {INITIATIVES.map((program, i) => (
              <FadeIn
                key={program.title}
                className={`group ${i <= 2 ? 'lg:col-span-2' : 'lg:col-span-3'}`}
                from="translateY(50px)"
                duration={0.6}
                delay={0.1 * i}
                ease="ease-out"
              >
                <div
                  className="flex flex-col relative text-foreground box-border outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none h-full bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out overflow-hidden"
                  tabIndex={-1}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      alt={program.title}
                      loading="lazy"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      src={program.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300"></div>
                  </div>
                  <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-8">
                    <h3 className="text-xl font-bold text-secondary-800 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                      {program.title}
                    </h3>
                    <p className="text-secondary-600 leading-relaxed">{program.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <div className="bg-gray-50 py-10 px-5">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h1 className="text-4xl md:text-4xl font-medium">Agaram Achievers</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {ACHIEVERS.map((achiever) => (
            <div
              key={achiever.label}
              className="relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large data-[hover=true]:bg-content2 dark:data-[hover=true]:bg-content2 motion-reduce:transition-none flex flex-col items-center justify-center p-6 text-center shadow-sm hover:-translate-y-1 transition"
              tabIndex={-1}
              style={{
                backgroundColor: 'rgba(0, 171, 192, 0.08)',
                borderColor: 'rgba(0, 171, 192, 0.15)',
              }}
            >
              <img
                alt={achiever.label}
                loading="lazy"
                width="120"
                height="120"
                className="object-contain mb-4"
                style={{ color: 'transparent' }}
                src={achiever.image}
              />
              <p className="text-4xl font-semibold text-primary">{achiever.value}</p>
              <p className="text-xl text-secondary-600 font-semibold">{achiever.label}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="py-12 px-4 bg-white">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-800">
          The Face of Change
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-4">
          {VIDEOS.map((video) => (
            <div
              key={video.src}
              className="w-full max-w-sm rounded-md overflow-hidden shadow-lg bg-white"
            >
              <iframe
                className="w-full h-60 md:h-72"
                src={video.src}
                title={video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </section>
      <ForceBehind />
    </main>
  )
}
