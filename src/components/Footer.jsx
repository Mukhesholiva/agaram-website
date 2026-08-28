import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../lib/api.js';

const FOOTER_LINK_BASE =
  'relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity text-gray-400 hover:text-gray-200';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Our Mission', to: '/our_mission' },
  { label: 'Our Journey', to: '/our_journey' },
  { label: 'Financials', to: '/financials' },
  { label: 'Partners', to: '/partners' },
];

const IMPORTANT_LINKS = [
  { label: 'Privacy Policy', to: '/privacy_policy' },
  { label: 'Terms & Conditions', to: '/terms_and_conditions' },
  { label: 'Refund Policy', to: '/privacy_policy' },
];

export default function Footer() {
  const { pathname } = useLocation();

  // In the reference site the desktop footer is absent on /donate, and the
  // mobile bottom tab bar is absent on /donate, /login and /profile.
  const hideFooter = pathname === '/donate';
  const hideTabBar = pathname === '/donate' || pathname === '/login' || pathname === '/profile';

  const homeActive = pathname === '/';
  const volunteerActive = pathname.startsWith('/join-us');
  const financialsActive = pathname === '/financials';
  const profileActive = pathname === '/profile' || pathname === '/login';
  const loggedIn = !!getToken();

  const tabIconClass = (name, active) =>
    `lucide lucide-${name} ${active ? 'text-primary' : 'text-gray-400'}`;
  const tabLabelClass = (active) =>
    active
      ? 'text-[11px] font-medium text-primary font-semibold'
      : 'text-[11px] font-medium text-gray-400';

  return (
    <>
      {!hideFooter && (
        <footer className="hidden sm:block footer bg-[#101010] text-white">
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-10 pb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: 'fit-content' }}>
                  {' '}
                  <img
                    src="/assets/images/logo/agaram_logo.webp"
                    className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-sm mb-4 w-28"
                    alt="Agaram Foundation"
                    data-loaded="true"
                  />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  We believe that a helping hand at the right time can make all the difference. Through our small contribution, we strive to support those facing challenges in health and education, offering care, hope, and encouragement for a better tomorrow.
                </p>
                <a
                  className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled transition-opacity"
                  tabIndex={0}
                  data-react-aria-pressable="true"
                  role="link"
                >
                  {' '}
                  <div style={{ fontFamily: '"Caveat", cursive' }} className="text-primary text-5xl my-4">
                    #change<span className="text-white">a</span>life
                  </div>
                </a>
                <div className="flex space-x-4">
                  <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: 'fit-content' }}>
                    {' '}
                    <img
                      src="/assets/images/logo/ssl.webp"
                      className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-sm w-30"
                      alt="SSL"
                      data-loaded="true"
                    />
                  </div>
                  <a href="https://razorpay.com/" target="_blank" rel="noopener noreferrer">
                    <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: 'fit-content' }}>
                      {' '}
                      <img
                        src="/assets/images/logo/secured_payments.webp"
                        className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-sm w-30"
                        alt="Razorpay"
                        data-loaded="true"
                      />
                    </div>
                  </a>
                </div>
              </div>
              <div>
                <h6 className="text-lg font-semibold mb-3">Quick Links</h6>
                <ul className="flex flex-col space-y-2 text-gray-400">
                  {QUICK_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      className={FOOTER_LINK_BASE}
                      to={item.to}
                      tabIndex={0}
                      data-react-aria-pressable="true"
                      role="link"
                    >
                      {item.label}
                    </Link>
                  ))}
                </ul>
                <h6 className="mt-6 text-lg font-semibold">Our Websites</h6>
                <div className="flex space-x-4 mt-4">
                  <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: 'fit-content' }}>
                    {' '}
                    <img
                      src="/assets/images/logo/agaram_foundation_org.webp"
                      className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-sm w-30"
                      alt="agaramfoundation.org"
                      data-loaded="true"
                    />
                  </div>
                  <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: 'fit-content' }}>
                    {' '}
                    <img
                      src="/assets/images/logo/agaram_alumni_association.webp"
                      className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-sm w-30"
                      alt="alumni.agaram.in"
                      data-loaded="true"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h6 className="text-lg font-semibold mb-3">Important Links</h6>
                <ul className="flex flex-col space-y-2 text-gray-400">
                  {IMPORTANT_LINKS.map((item) => (
                    <Link
                      key={item.label}
                      className={FOOTER_LINK_BASE}
                      to={item.to}
                      tabIndex={0}
                      data-react-aria-pressable="true"
                      role="link"
                    >
                      {item.label}
                    </Link>
                  ))}
                </ul>
                <h6 className="mt-6 font-semibold text-lg">Office Address:</h6>
                <p className="text-sm text-gray-400 leading-relaxed my-2">
                  15/4, Arulambal Street, T.Nagar, <br />
                  Chennai - 600 017
                  <br />
                  Tamil Nadu, India.
                  <br />
                </p>
                <div className="relative max-w-fit min-w-min box-border whitespace-nowrap h-7 text-small rounded-full bg-primary/20 text-primary-600 flex items-center justify-center px-3 py-1 cursor-pointer transition hover:scale-105 hover:shadow-md">
                  <span className="flex-1 text-inherit font-normal px-2">
                    <a
                      className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity flex items-center gap-1.5 text-white"
                      href="https://maps.app.goo.gl/QjX1KLW1x7J9vxoK7"
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={0}
                      data-react-aria-pressable="true"
                      role="link"
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-4 h-4"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span className="text-xs font-medium leading-none">View Location in Map</span>
                    </a>
                  </span>
                </div>
              </div>
              <div>
                <h6 className="text-lg font-semibold mb-3">Support</h6>
                <ul className="space-y-2 text-gray-400">
                  <a
                    className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity flex items-center text-gray-400 hover:text-gray-200"
                    href="mailto:info@agaram.in"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-lg mr-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"></path>
                    </svg>{' '}
                    info@agaram.in
                  </a>
                  <a
                    className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity flex items-center text-gray-400 hover:text-gray-200"
                    href="tel:9841891000"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-lg mr-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
                    </svg>{' '}
                    +91 98418 91000
                  </a>
                  <a
                    className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity flex items-center text-gray-400 hover:text-gray-200"
                    href="tel:04443506361"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      className="text-lg mr-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path>
                    </svg>{' '}
                    044-43506361
                  </a>
                  <a
                    className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity flex items-center text-gray-400 hover:text-gray-200"
                    href="https://wa.me/919841891000"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      className="text-lg mr-2"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                    </svg>{' '}
                    +91 98418 91000
                  </a>
                </ul>
                <div className="flex space-x-4 mt-6 text-2xl ">
                  <a
                    className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity text-gray-400 hover:text-gray-200"
                    href="https://www.facebook.com/agaramfoundation"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64h98.2V334.2H109.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H255V480H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64z"></path>
                    </svg>
                  </a>
                  <a
                    className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity text-gray-400 hover:text-gray-200"
                    href="https://www.instagram.com/agaram_foundation_official?igsh=ZDc2eHJ3dThkNmxq"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                  </a>
                  <a
                    className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity text-gray-400 hover:text-gray-200"
                    href="https://x.com/agaramvision?t=2QUd1JKQWJ-bHdFAO8HZeg&s=09"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 512 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                    </svg>
                  </a>
                  <a
                    className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity text-gray-400 hover:text-gray-200"
                    href="https://www.linkedin.com/company/agaram-foundation/"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>
                  <a
                    className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity text-gray-400 hover:text-gray-200"
                    href="https://wa.me/919841891000"
                    target="_blank"
                    tabIndex={0}
                    data-react-aria-pressable="true"
                    role="link"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-gray-400" />
          <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 md:flex items-center justify-between text-center md:text-start">
            <small className="text-xs tracking-wider text-gray-300">
              Copyright © 2026{' '}
              <a
                className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity text-white"
                href="https://agaram.in"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                data-react-aria-pressable="true"
                role="link"
              >
                <small>Agaram Foundation</small>
              </a>
              . All Rights Reserved.
            </small>
            <div className="flex items-center justify-center mt-3 md:mt-0">
              <small className="text-xs md:text-sm tracking-wide text-gray-300">Designed & Developed by</small>
              <a
                className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled transition-opacity flex items-center group"
                href="https://www.antcorptech.in/"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
                data-react-aria-pressable="true"
                role="link"
              >
                <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: '100px' }}>
                  {' '}
                  <img
                    src="/assets/images/logo/antcorp_technologies.webp"
                    className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none motion-reduce:transition-none !duration-300 rounded-large transition-transform duration-300 group-hover:scale-110"
                    alt="Antcorp Technologies"
                    width="100"
                    data-loaded="true"
                  />
                </div>
              </a>
            </div>
          </div>
        </footer>
      )}
      {!hideTabBar && (
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex items-end h-16 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.06)]">
          <Link className="flex flex-col items-center flex-1 pb-3 pt-2 gap-1" to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={tabIconClass('house', homeActive)}
              aria-hidden="true"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            </svg>
            <span className={tabLabelClass(homeActive)}>Home</span>
          </Link>
          <Link className="flex flex-col items-center flex-1 pb-3 pt-2 gap-1" to="/join-us/volunteers">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={tabIconClass('users', volunteerActive)}
              aria-hidden="true"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            <span className={tabLabelClass(volunteerActive)}>Volunteer</span>
          </Link>
          <Link className="flex flex-col items-center flex-1 pb-3 gap-1" to="/donate">
            <span className="relative -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-primary shadow-lg shadow-primary/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-gift text-white"
                aria-hidden="true"
              >
                <path d="M12 7v14"></path>
                <path d="M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"></path>
                <path d="M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5"></path>
                <rect x="3" y="7" width="18" height="4" rx="1"></rect>
              </svg>
            </span>
            <span className="text-[11px] font-semibold text-primary -mt-4">Donate</span>
          </Link>
          <Link className="flex flex-col items-center flex-1 pb-3 pt-2 gap-1" to="/financials">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={tabIconClass('chart-no-axes-column', financialsActive)}
              aria-hidden="true"
            >
              <path d="M5 21v-6"></path>
              <path d="M12 21V3"></path>
              <path d="M19 21V9"></path>
            </svg>
            <span className={tabLabelClass(financialsActive)}>Financials</span>
          </Link>
          <Link className="flex flex-col items-center flex-1 pb-3 pt-2 gap-1" to={loggedIn ? '/profile' : '/login'}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={tabIconClass('user', profileActive)}
              aria-hidden="true"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className={tabLabelClass(profileActive)}>{loggedIn ? 'Profile' : 'Login'}</span>
          </Link>
        </nav>
      )}
    </>
  );
}
