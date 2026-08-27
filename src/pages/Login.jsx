import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api, getToken, setToken } from '../lib/api.js';

// HeroUI input class strings (verbatim from the reference HTML forms).
const INPUT_WRAPPER_CLASS =
  'relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2';

const LABEL_CLASS_START =
  'absolute z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text';

const LABEL_CLASS_REQUIRED = " after:content-['*'] after:text-danger after:ms-0.5";

const LABEL_CLASS_END =
  ' will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden';

const INPUT_CLASS =
  'w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small group-data-[has-value=true]:text-default-foreground';

const SUBMIT_BTN_CLASS =
  'z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-24 h-12 gap-3 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary data-[hover=true]:opacity-hover text-white font-medium w-full';

function HeroInput({ idBase, label, type = 'text', required = false, value, onChange, maxLength }) {
  const [focused, setFocused] = useState(false);
  const filled = value !== '';
  const filledWithin = filled || focused;
  return (
    <div
      className={`group flex flex-col data-[hidden=true]:hidden w-full${filled ? ' is-filled' : ''}`}
      data-slot="base"
      data-filled={filled ? 'true' : undefined}
      data-filled-within={filledWithin ? 'true' : undefined}
      data-focus={focused ? 'true' : undefined}
      data-required={required ? 'true' : undefined}
      data-has-elements="true"
      data-has-label="true"
      data-has-value="true"
    >
      <div
        data-slot="input-wrapper"
        className={`${INPUT_WRAPPER_CLASS}${filled ? ' is-filled' : ''}`}
        style={{ cursor: 'text' }}
      >
        <label
          data-slot="label"
          className={LABEL_CLASS_START + (required ? LABEL_CLASS_REQUIRED : '') + LABEL_CLASS_END}
          id={`${idBase}H1_`}
          htmlFor={`${idBase}_`}
        >
          {label}
        </label>
        <div
          data-slot="inner-wrapper"
          className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5"
        >
          <input
            data-slot="input"
            data-type={type !== 'text' ? type : undefined}
            data-filled={filled ? 'true' : undefined}
            data-filled-within={filled ? 'true' : undefined}
            className={`${INPUT_CLASS}${filled ? ' is-filled' : ''}`}
            type={type}
            required={required || undefined}
            maxLength={maxLength}
            tabIndex={0}
            id={`${idBase}_`}
            aria-labelledby={`${idBase}H1_`}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>
    </div>
  );
}

// Email + password Login / Register form wired to the VSCF backend, laid out
// inside the login page's split-screen container.
export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isLogin = mode === 'login';

  useEffect(() => {
    document.title = 'Login | Agaram Foundation';
  }, []);

  // Already logged in -> straight to profile.
  useEffect(() => {
    if (getToken()) navigate('/profile', { replace: true });
  }, [navigate]);

  const switchMode = () => {
    setMode(isLogin ? 'register' : 'login');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError('');
    setSubmitting(true);
    try {
      const data = isLogin
        ? await api('/api/auth/login', { method: 'POST', body: { email, password } })
        : await api('/api/auth/register', { method: 'POST', body: { name, email, phone, password } });
      setToken(data.token);
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="flex min-h-screen w-full bg-white">
        <div className="hidden lg:flex lg:w-1/2 bg-primary"></div>
        <div className="flex-1 flex items-center justify-center p-6">
          <form className="w-full max-w-[420px] space-y-6" onSubmit={handleSubmit}>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 text-center">
              {isLogin ? 'Login' : 'Create an account'}
            </h1>
            <p className="text-gray-600 text-center">
              {isLogin
                ? 'Login with your email and password to continue'
                : 'Register with your details to continue'}
            </p>
            {!isLogin && (
              <HeroInput
                idBase="register-name"
                label="Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <HeroInput
              idBase="login-email"
              label="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isLogin && (
              <HeroInput
                idBase="register-phone"
                label="Phone Number"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            )}
            <HeroInput
              idBase="login-password"
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? <p className="text-danger text-sm text-center">{error}</p> : null}
            <button
              type="submit"
              disabled={submitting}
              className={`${SUBMIT_BTN_CLASS}${submitting ? ' opacity-disabled pointer-events-none' : ''}`}
            >
              {submitting ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
            </button>
            <p className="text-gray-600 text-sm text-center">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <button
                type="button"
                className="text-primary font-medium cursor-pointer hover:opacity-hover"
                onClick={switchMode}
              >
                {isLogin ? 'Create an account' : 'Login'}
              </button>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
