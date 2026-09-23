import { useEffect, useRef, useState } from 'react'

const SLIDES = [
  {
    id: 'moringa-superblend',
    title: 'Empowering Lives Through Serving',
    subtitle: 'Can bring hope to someone’s life',
    background: 'linear-gradient(to top,#c9ab82 0%,#ddc9a8 33%,#efe5d3 66%,#ffffff 100%)',
    imageSrc: '/assets/images/slider/founder_cutout.webp',
  },
  {
    id: 'help-the-needy',
    title: 'A Dream Should Never Be',
    titleLine2: 'Limited by Circumstances',
    subtitle: '',
    background: 'linear-gradient(to top,#c9ab82 0%,#ddc9a8 33%,#efe5d3 66%,#ffffff 100%)',
    imageSrc: '/assets/images/slider/agaram_slider_img_1.webp',
  },
]

const INITIATIVES = [
  {
    title: 'Food Necessities',
    description:
      'We distribute basic food essentials to underprivileged families and the elderly in our communities. A small bag of groceries at the right time brings relief, dignity, and hope to a household in need — ensuring no one is left to face hardship alone.',
    image: '/assets/images/programs/vidhai.jpg',
  },
  {
    title: 'Supporting Education',
    description:
      'We provide notebooks, books, and study materials to students who cannot afford them, so that no child has to pause their education for want of basics. Every kit we hand over is a step towards keeping a young person in school and their dreams on track.',
    image: '/assets/images/programs/mentorship.jpg',
  },
  {
    title: 'Disability Support',
    description:
      'We stand beside persons with disabilities and their families, offering financial assistance, care, and encouragement. Our support helps them meet everyday needs with dignity and reminds them that they are valued members of our community.',
    image: '/assets/images/programs/agaram_hostel.jpg',
  },
  {
    title: 'Community Outreach',
    description:
      'We bring our communities together through outreach programmes, awareness drives, and support camps — reaching families in villages and towns with help, information, and hope. Every gathering strengthens the bond between the foundation and the people we serve.',
    image: '/assets/images/programs/namadhu_palli.jpg',
  },
  {
    title: 'Orphan Support',
    description:
      'We care for orphaned and street children by providing clothes, food, and daily essentials, along with the warmth of belonging. Every child deserves to feel loved and looked after — and we strive to be that family for them.',
    image: '/assets/images/programs/sivakumar_edu_trust.jpg',
  },
]

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
  }, [index])

  return (
    <div className="relative" style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
      <canvas
        id="particle-bg"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
        style={{ pointerEvents: 'none' }}
      ></canvas>
      <div
        className="swiper swiper-initialized swiper-horizontal"
        ref={sliderRef}
        style={{ width: '100%' }}
      >
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
                width: '100%',
                minWidth: 0,
                flexShrink: 0,
              }}
            >
              <div className="flex flex-col w-full">
                <div className="w-full p-4 text-center mt-6 sm:mt-10 animated-title">
                  <h1 className="text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {slide.title}
                    {slide.titleLine2 ? (
                      <>
                        <br />
                        {slide.titleLine2}
                      </>
                    ) : null}
                  </h1>
                  {slide.subtitle ? (
                    <h2 className="text-secondary text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium my-2 sm:my-3">
                      {slide.subtitle}
                    </h2>
                  ) : null}
                </div>
                <div className="flex justify-center items-center w-full mb-6 sm:mb-8">
                  <div className="p-2 sm:p-4 text-white text-center">
                    <div
                      className="relative flex justify-center items-center mx-auto"
                      style={{ width: 'min(560px, 100%)', height: 'min(560px, 92vw)' }}
                    >
                      <img
                        alt={`${slide.title} image`}
                        width="900"
                        height="900"
                        className="animated-img object-contain"
                        style={{ color: 'transparent', maxWidth: '100%', maxHeight: '100%' }}
                        src={slide.imageSrc}
                      />
                      <img
                        alt="Venkata Sivaji Charitable Foundation logo"
                        src="/assets/images/logo/agaram_logo.png"
                        className="absolute rounded-full bg-white shadow-lg"
                        style={{
                          top: '0px',
                          right: '0px',
                          width: 'min(110px, 24vw)',
                          height: 'min(110px, 24vw)',
                          objectFit: 'contain',
                          padding: '6px',
                          boxShadow: '0 4px 18px rgba(0,0,0,0.28)',
                        }}
                      />
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

export default function Home() {
  useEffect(() => {
    document.title = 'Venkata Sivaji Charitable Foundation | Help The Needy'
  }, [])

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <HeroSlider />
      <div className="max-w-7xl mt-16 mx-auto grid gap-6 sm:grid-cols-1 md:grid-cols-1">
        <div className="rounded-2xl overflow-hidden flex gap-20 flex-col md:flex-row items-stretch justify-between">
          <div className="p-6 flex flex-col justify-between w-full md:w-1/2 space-y-4 bg-white">
            <div className="space-y-2">
              <h3 className="text-4xl font-semibold mb-4 text-primary">
                Venkata Sivaji Charitable Foundation
              </h3>
              <p className="text-justify text-lg text-secondary-400">
                In India, many deserving children and young people continue to face financial and
                social barriers to education. Access to quality healthcare can also be difficult
                for families who cannot easily afford medical treatment, while many elderly people
                face loneliness, limited support, and difficulties in meeting their everyday needs.
                Through our initiatives in education, health care, and the welfare of the elderly,
                we work towards building compassionate communities. By doing our part, we hope to
                be a small but meaningful part of India&apos;s journey towards a more equitable and
                caring society.
              </p>
            </div>
          </div>
          <div className="relative w-full md:w-1/2 h-[240px] md:h-auto">
            <img
              alt="Venkata Sivaji Charitable Foundation"
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
            We believe that a helping hand at the right time can make all the difference. Through
            our small contribution, we strive to support those facing challenges in health and
            education, offering care, hope, and encouragement for a better tomorrow.
          </p>
        </div>
      </section>
      <div
        className="flex flex-col relative h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 shadow-medium transition-transform-background motion-reduce:transition-none overflow-hidden rounded-none"
        tabIndex={-1}
      >
        <div className="relative w-full flex-auto place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased flex flex-col md:flex-row p-6 md:p-20 gap-6">
          <div className="w-full md:w-1/3 min-w-[200px] flex items-center justify-center">
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
                Sometimes, all a young person needs is someone to believe in them.
                <br />
                <br />
                Across communities, there are students with the ability, determination, and dreams
                to build a better future, but circumstances may prevent them from reaching their
                full potential. Venkata Sivaji Charitable Foundation strives to be there for them —
                with understanding, encouragement, guidance, and meaningful opportunities.
                <br />
                <br />
                We believe education can open doors, build confidence, strengthen families, and
                create positive change that reaches far beyond one individual.
                <br />
                <br />
                Together, we can give hope a chance, dreams a direction, and every student the
                opportunity to move forward.
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
                        objectPosition: 'center top',
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
    </main>
  )
}
