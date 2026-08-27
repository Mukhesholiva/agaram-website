import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../lib/api.js';

const NAV_LINK_BASE =
  'relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-hover active:opacity-disabled transition-opacity';

const TRIGGER_BASE =
  'group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:bg-default/40 z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased';

const MENU_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'Our Mission', to: '/our_mission' },
  { label: 'Our Journey', to: '/our_journey' },
  { label: 'Financials', to: '/financials' },
  { label: 'Partners', to: '/partners' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const joinRef = useRef(null);
  const loggedIn = !!getToken();

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname === to;
  const joinActive = location.pathname.startsWith('/join-us');

  // close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setJoinOpen(false);
  }, [location.pathname]);

  // click-outside handling for the "Be a Part of Us" dropdown
  useEffect(() => {
    if (!joinOpen) return;
    const onPointerDown = (e) => {
      if (joinRef.current && !joinRef.current.contains(e.target)) {
        setJoinOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [joinOpen]);

  return (
    <nav
      className="flex z-40 w-full items-center justify-center data-[menu-open=true]:border-none sticky top-0 inset-x-0 backdrop-blur-lg data-[menu-open=true]:backdrop-blur-xl backdrop-saturate-150 bg-white shadow-sm h-16 md:h-[80px] px-2 md:px-8 sm:border-b sm:border-divider"
      style={{ '--navbar-height': '4rem' }}
      data-menu-open={menuOpen ? 'true' : 'false'}
    >
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-[var(--navbar-height)] max-w-[1280px]">
        <ul
          className="flex gap-4 h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0 lg:hidden"
          data-justify="start"
        >
          <button
            className="group flex items-center justify-center w-6 h-full rounded-small tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-black"
            type="button"
            tabIndex={0}
            data-react-aria-pressable="true"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-pressed={menuOpen}
            data-open={menuOpen ? 'true' : 'false'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">open navigation menu</span>
            <span className="w-full h-full pointer-events-none flex flex-col items-center justify-center text-inherit group-data-[pressed=true]:opacity-70 transition-opacity before:content-[''] before:block before:h-px before:w-6 before:bg-current before:transition-transform before:duration-150 before:-translate-y-1 before:rotate-0 group-data-[open=true]:before:translate-y-px group-data-[open=true]:before:rotate-45 after:content-[''] after:block after:h-px after:w-6 after:bg-current after:transition-transform after:duration-150 after:translate-y-1 after:rotate-0 group-data-[open=true]:after:translate-y-0 group-data-[open=true]:after:-rotate-45"></span>
          </button>
        </ul>
        <div className="flex basis-0 flex-row flex-grow flex-nowrap justify-start bg-transparent no-underline whitespace-nowrap box-border absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:static lg:translate-x-0 lg:translate-y-0 lg:pr-3 font-bold text-xl text-black items-center">
          <Link
            className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium hover:opacity-hover active:opacity-disabled transition-opacity flex items-center gap-2 text-black no-underline"
            to="/"
            tabIndex={0}
            data-react-aria-pressable="true"
            role="link"
          >
            <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: '50px' }}>
              {' '}
              <img
                src="/assets/images/logo/agaram_logo.png"
                className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large object-contain md:h-[60px] md:w-[60px]"
                height="50"
                width="50"
                alt="Agaram Logo"
                style={{ height: '50px', width: '50px', minWidth: '50px' }}
                data-loaded="true"
              />
            </div>
          </Link>
        </div>
        <ul
          className="h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0 hidden lg:flex gap-6"
          data-justify="center"
        >
          {MENU_ITEMS.map((item) => (
            <li key={item.to} className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold">
              <Link
                className={`${NAV_LINK_BASE} ${isActive(item.to) ? 'text-primary font-bold' : 'text-black'}`}
                to={item.to}
                tabIndex={0}
                data-react-aria-pressable="true"
                role="link"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold">
            <div className="relative" ref={joinRef}>
              <button
                type="button"
                tabIndex={0}
                data-react-aria-pressable="true"
                data-slot="trigger"
                aria-haspopup="true"
                aria-expanded={joinOpen}
                className={`${TRIGGER_BASE} ${
                  joinActive
                    ? 'px-0 bg-transparent shadow-none hover:bg-transparent focus:outline-none text-primary font-bold'
                    : 'font-medium px-0 bg-transparent shadow-none hover:bg-transparent focus:outline-none text-black'
                }`}
                onClick={() => setJoinOpen((open) => !open)}
              >
                Be a Part of Us<span className="ml-1 text-xs bg-black text-white px-1 rounded">Join</span>
              </button>
              {joinOpen && (
                <div className="absolute left-0 z-50 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 p-2 whitespace-nowrap">
                  <Link
                    className="block w-full px-3 py-2 rounded-lg text-black hover:bg-gray-100 no-underline"
                    to="/join-us/volunteers"
                    onClick={() => setJoinOpen(false)}
                  >
                    Volunteers
                  </Link>
                </div>
              )}
            </div>
          </li>
          <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold">
            <Link
              className={`${NAV_LINK_BASE} ${isActive('/contact') ? 'text-primary font-bold' : 'text-black'}`}
              to="/contact"
              tabIndex={0}
              data-react-aria-pressable="true"
              role="link"
            >
              Contact
            </Link>
          </li>
        </ul>
        <ul
          className="flex h-full flex-row flex-nowrap items-center data-[justify=start]:justify-start data-[justify=start]:flex-grow data-[justify=start]:basis-0 data-[justify=center]:justify-center data-[justify=end]:justify-end data-[justify=end]:flex-grow data-[justify=end]:basis-0 gap-2 pl-2"
          data-justify="end"
        >
          <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold hidden sm:flex">
            <Link
              className="tap-highlight-transparent no-underline hover:opacity-hover active:opacity-disabled z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 gap-2 rounded-small [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary data-[hover=true]:opacity-hover font-medium text-white h-8 px-3 text-xs md:text-medium md:h-10 md:px-4 min-w-0"
              data-react-aria-pressable="true"
              to="/donate"
              tabIndex={0}
              role="button"
            >
              Donate
            </Link>
          </li>
          <li className="text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold">
            <Link
              className="tap-highlight-transparent no-underline hover:opacity-hover active:opacity-disabled z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium gap-2 rounded-small [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent text-foreground data-[hover=true]:opacity-hover font-medium h-8 px-3 text-xs md:text-medium md:h-10 md:px-4 border-gray-300 min-w-0"
              data-react-aria-pressable="true"
              to={loggedIn ? '/profile' : '/login'}
              tabIndex={0}
              role="button"
            >
              {loggedIn ? 'Profile' : 'Login'}
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1 hidden sm:block"
                height="16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" x2="3" y1="12" y2="12"></line>
              </svg>
            </Link>
          </li>
        </ul>
      </header>
      {menuOpen && (
        <div className="lg:hidden fixed top-16 inset-x-0 bottom-0 z-30 bg-white px-6 pt-2 overflow-y-auto">
          <ul className="flex flex-col gap-2">
            {MENU_ITEMS.map((item) => (
              <li key={item.to} className="text-large data-[active=true]:font-semibold" data-active={isActive(item.to) ? 'true' : 'false'}>
                <Link
                  className={`${NAV_LINK_BASE} w-full py-2 ${isActive(item.to) ? 'text-primary font-bold' : 'text-black'}`}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="text-large data-[active=true]:font-semibold" data-active={joinActive ? 'true' : 'false'}>
              <Link
                className={`${NAV_LINK_BASE} w-full py-2 ${joinActive ? 'text-primary font-bold' : 'text-black'}`}
                to="/join-us/volunteers"
                onClick={() => setMenuOpen(false)}
              >
                Be a Part of Us
              </Link>
            </li>
            <li className="text-large data-[active=true]:font-semibold" data-active={isActive('/contact') ? 'true' : 'false'}>
              <Link
                className={`${NAV_LINK_BASE} w-full py-2 ${isActive('/contact') ? 'text-primary font-bold' : 'text-black'}`}
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
