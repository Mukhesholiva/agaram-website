import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

/* ------------------------------------------------------------------ */
/* Razorpay checkout script loader (real mode only)                    */
/* ------------------------------------------------------------------ */

let razorpayScriptPromise = null;
function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve();
  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      script.onerror = () => {
        razorpayScriptPromise = null;
        reject(new Error('Could not load the payment gateway. Please try again.'));
      };
      document.body.appendChild(script);
    });
  }
  return razorpayScriptPromise;
}

function formatReceiptDate(value) {
  if (!value) return '';
  // SQLite current_timestamp -> "YYYY-MM-DD HH:MM:SS" (UTC)
  const d = new Date(String(value).includes('T') ? value : `${String(value).replace(' ', 'T')}Z`);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/* ------------------------------------------------------------------ */
/* Shared HeroUI class strings (verbatim from the site's compiled CSS) */
/* ------------------------------------------------------------------ */

const INPUT_WRAPPER_CLS =
  'relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2';
const LABEL_CLS =
  "absolute z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden";
const LABEL_REQUIRED_CLS = `${LABEL_CLS} after:content-['*'] after:text-danger after:ms-0.5`;
const INNER_WRAPPER_CLS =
  'inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5';
const INPUT_CLS =
  'w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small group-data-[has-value=true]:text-default-foreground';
const CHECKBOX_BOX_CLS =
  "relative inline-flex items-center justify-center shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-default after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before:bg-default-100 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background after:bg-primary after:text-primary-foreground text-primary-foreground w-5 h-5 me-2 rounded-[calc(var(--heroui-radius-medium)*0.6)] before:rounded-[calc(var(--heroui-radius-medium)*0.6)] after:rounded-[calc(var(--heroui-radius-medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none";
const CONTINUE_BTN_CLS =
  'z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-24 h-12 text-medium gap-3 rounded-small [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary data-[hover=true]:opacity-hover font-bold text-white px-8 shadow-lg';

/* ------------------------------------------------------------------ */
/* Plan data (titles/prices verbatim from the live agaram.in/donate)   */
/* ------------------------------------------------------------------ */

const ONE_TIME_GROUPS = [
  {
    heading: 'Academic Support – General Contribution',
    plans: [
      { title: 'Academic Support', price: '₹2000/-' },
      { title: 'Academic Support', price: '₹5000/-' },
      { title: 'Academic Support', price: '₹7000/-' },
      { title: 'Academic Support', price: '₹10000/-' },
    ],
  },
  {
    heading: 'Individual Sponsorship',
    plans: [
      { title: 'Arts and Humanities Students', price: '₹60000/-' },
      { title: 'Professional Course Students', price: '₹100000/-' },
    ],
  },
  {
    heading: 'Academic Support – Individual Student Sponsorship (Full Course)',
    plans: [
      { title: 'Arts and Humanities Student - Full Course', price: '₹250000/-' },
      { title: 'Professional Courses - Full Course', price: '₹450000/-' },
    ],
  },
  {
    heading: 'Corpus Support',
    plans: [{ title: 'Corpus Support', price: '₹500000/-' }],
  },
  {
    heading: 'Collective Impact',
    plans: [{ title: 'Collective Impact: Support the Education of 10 Students', price: '₹500000/-' }],
  },
];

const MONTHLY_GROUPS = [
  {
    heading: 'Maadham 300',
    plans: [{ title: 'Maadham 300', price: '₹300/-/month' }],
  },
  {
    heading: 'Academic Support – General Contribution',
    plans: [
      { title: 'Academic Support – General Contribution', price: '₹500/-/month' },
      { title: 'Academic Support – General Contribution', price: '₹1000/-/month' },
      { title: 'Academic Support – General Contribution', price: '₹2000/-/month' },
      { title: 'Academic Support – General Contribution', price: '₹3000/-/month' },
    ],
  },
  {
    heading: 'Individual Sponsorship',
    plans: [
      { title: 'Arts and Humanities Students', price: '₹5000/-/month' },
      { title: 'Professional Course Students', price: '₹8500/-/month' },
    ],
  },
];

const TABS = [
  { key: 'one-time', label: 'One Time' },
  { key: 'monthly', label: 'Every Month' },
  { key: 'foreign', label: 'Foreign Donor' },
];

/* ------------------------------------------------------------------ */
/* Reusable HeroUI-style controls                                      */
/* ------------------------------------------------------------------ */

function HeroInput({ id, label, name, type = 'text', required = false, value, onChange, min }) {
  return (
    <div
      className="group flex flex-col data-[hidden=true]:hidden w-full"
      data-slot="base"
      data-required={required ? 'true' : undefined}
      data-has-elements="true"
      data-has-label="true"
      data-has-value="true"
      data-filled={value ? 'true' : undefined}
      data-filled-within={value ? 'true' : undefined}
    >
      <div data-slot="input-wrapper" className={INPUT_WRAPPER_CLS} style={{ cursor: 'text' }}>
        <label data-slot="label" className={required ? LABEL_REQUIRED_CLS : LABEL_CLS} id={`${id}-label`} htmlFor={id}>
          {label}
        </label>
        <div data-slot="inner-wrapper" className={INNER_WRAPPER_CLS}>
          <input
            data-slot="input"
            className={INPUT_CLS}
            type={type}
            required={required}
            tabIndex={0}
            id={id}
            aria-labelledby={`${id}-label`}
            name={name}
            min={min}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

function HeroPlainInput({ id, name, type = 'text', placeholder, value, onChange, min }) {
  return (
    <div
      className="group flex flex-col data-[hidden=true]:hidden w-full"
      data-slot="base"
      data-has-elements="true"
      data-has-value="true"
      data-filled={value ? 'true' : undefined}
      data-filled-within={value ? 'true' : undefined}
    >
      <div data-slot="input-wrapper" className={INPUT_WRAPPER_CLS} style={{ cursor: 'text' }}>
        <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border pb-0.5">
          <input
            data-slot="input"
            className={INPUT_CLS}
            type={type}
            tabIndex={0}
            id={id}
            aria-label={placeholder}
            name={name}
            placeholder={placeholder}
            min={min}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

function HeroTextarea({ id, label, name, required = false, value, onChange }) {
  return (
    <div
      className="group flex flex-col data-[hidden=true]:hidden w-full"
      data-slot="base"
      data-required={required ? 'true' : undefined}
      data-has-elements="true"
      data-has-label="true"
      data-has-value="true"
      data-filled={value ? 'true' : undefined}
      data-filled-within={value ? 'true' : undefined}
    >
      <div
        data-slot="input-wrapper"
        className="relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 !h-auto transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2"
        style={{ cursor: 'text' }}
        data-has-multiple-rows="true"
      >
        <label
          data-slot="label"
          className={`z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text ${required ? "after:content-['*'] after:text-danger after:ms-0.5 " : ''}relative will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small pb-0.5 pe-2 max-w-full text-ellipsis overflow-hidden`}
          id={`${id}-label`}
          htmlFor={id}
        >
          {label}
        </label>
        <div data-slot="inner-wrapper" className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start pb-0.5">
          <textarea
            data-slot="input"
            className="w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-default-foreground pt-0 transition-height !duration-100 motion-reduce:transition-none pe-0"
            required={required}
            name={name}
            tabIndex={0}
            id={id}
            aria-labelledby={`${id}-label`}
            data-hide-scroll="true"
            rows={3}
            value={value}
            onChange={onChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// The live site renders these selects in a disabled "Loading options..." state
// (options are fetched client-side after login), so this is a static replica.
function DisabledSelect({ idBase, label, required = true }) {
  return (
    <div
      data-slot="base"
      data-has-label="true"
      className="group inline-flex flex-col relative w-full opacity-disabled pointer-events-none transition-background motion-reduce:transition-none !duration-150"
    >
      <div
        style={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          width: '1px',
          whiteSpace: 'nowrap',
        }}
        aria-hidden="true"
        data-a11y-ignore="aria-hidden-focus"
        data-testid="hidden-select-container"
      >
        <label>
          {label}
          <select disabled required={required} tabIndex={-1} defaultValue="">
            <option value=""></option>
          </select>
        </label>
      </div>
      <div data-slot="mainWrapper" className="w-full flex flex-col">
        <button
          data-slot="trigger"
          data-disabled="true"
          className="relative px-3 w-full inline-flex shadow-xs tap-highlight-transparent group-data-[focus=true]:bg-default-200 rounded-medium flex-col items-start justify-center gap-0 pointer-events-none bg-default-100 data-[hover=true]:bg-default-200 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-14 min-h-14 py-2"
          type="button"
          tabIndex={0}
          data-react-aria-pressable="true"
          id={`${idBase}H2_`}
          aria-labelledby={`${idBase}H7_ ${idBase}H3_ `}
          aria-describedby={`${idBase}H5_ ${idBase}H6_`}
          aria-haspopup="listbox"
          aria-expanded="false"
        >
          <label
            data-slot="label"
            className={`block absolute z-10 flex-shrink-0 subpixel-antialiased text-foreground-500 pointer-events-none group-data-[has-label-outside=true]:pointer-events-auto cursor-pointer ${required ? "after:content-['*'] after:text-danger after:ms-0.5 " : ''}will-change-auto origin-top-left rtl:origin-top-right !duration-200 !ease-out transition-[transform,color,left,opacity,translate,scale] motion-reduce:transition-none group-data-[filled=true]:text-default-600 group-data-[filled=true]:scale-85 text-small group-data-[filled=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden`}
            id={`${idBase}H3_`}
          >
            {label}
          </label>
          <div
            data-slot="innerWrapper"
            className="inline-flex h-fit w-[calc(100%_-theme(spacing.6))] min-h-4 items-center gap-1.5 box-border group-data-[has-label=true]:pt-4"
          >
            <span
              data-slot="value"
              className="text-foreground-500 font-normal w-full text-start text-small truncate group-data-[has-value=true]:text-default-foreground"
              id={`${idBase}H7_`}
            ></span>
          </div>
          <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            width="1em"
            data-slot="selectorIcon"
            className="absolute end-3 w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180"
          >
            <path d="m6 9 6 6 6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

function LoadingOptionsRow() {
  return (
    <div className="flex items-center gap-2 text-gray-500 py-2">
      <div aria-label="Loading" className="relative inline-flex flex-col gap-2 items-center justify-center">
        <div className="relative flex w-5 h-5">
          <i className="absolute w-full h-full rounded-full border-2 border-b-primary animate-spinner-ease-spin border-solid border-t-transparent border-l-transparent border-r-transparent"></i>
          <i className="absolute w-full h-full rounded-full border-2 border-b-primary opacity-75 animate-spinner-linear-spin border-dotted border-t-transparent border-l-transparent border-r-transparent"></i>
        </div>
      </div>
      <span className="text-sm">Loading options...</span>
    </div>
  );
}

function HeroCheckbox({ labelId, checked, onChange, children }) {
  return (
    <label
      className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2 select-none"
      data-selected={checked ? 'true' : undefined}
    >
      <input
        aria-label={children}
        aria-labelledby={labelId}
        type="checkbox"
        data-react-aria-pressable="true"
        tabIndex={0}
        className="font-inherit text-[100%] leading-[1.15] m-0 p-0 overflow-visible box-border absolute top-0 w-full h-full opacity-[0.0001] z-[1] cursor-pointer disabled:cursor-default"
        checked={checked}
        onChange={onChange}
      />
      <span aria-hidden="true" className={CHECKBOX_BOX_CLS}>
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          stroke="currentColor"
          strokeDasharray="22"
          strokeDashoffset={checked ? 44 : 66}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 17 18"
          className="z-10 opacity-0 group-data-[selected=true]:opacity-100 pointer-events-none w-4 h-3 transition-opacity motion-reduce:transition-none"
        >
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </span>
      <span id={labelId} className="relative text-foreground select-none text-medium transition-colors-opacity before:transition-width motion-reduce:transition-none">
        {children}
      </span>
    </label>
  );
}

function PlanCard({ title, price, selected, onClick }) {
  return (
    <button
      className={`flex flex-col relative overflow-hidden text-foreground box-border outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-small cursor-pointer motion-reduce:transition-none data-[pressed=true]:scale-[0.97] tap-highlight-transparent border transition-all duration-200 shadow-sm hover:shadow-md h-full ${selected ? 'border-primary' : 'border-gray-200'} bg-white`}
      type="button"
      aria-pressed={selected}
      onClick={onClick}
    >
      <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-0">
        <div className="flex flex-col h-full">
          <div className="px-4 py-3 flex-1">
            <p className="text-gray-700 text-sm font-medium leading-tight">{title}</p>
          </div>
          <hr className="shrink-0 border-none w-full h-divider bg-gray-100" role="separator" />
          <div className="flex items-center gap-3 px-4 py-3 bg-gray-50/50">
            <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center ${selected ? 'border-primary' : 'border-gray-300'}`}>
              {selected ? <div className="w-2.5 h-2.5 rounded-full bg-primary"></div> : null}
            </div>
            <span className="text-md font-semibold text-gray-900">{price}</span>
          </div>
        </div>
      </div>
    </button>
  );
}

function PlanGroups({ groups, selectedId, onSelect }) {
  return (
    <div className="space-y-6">
      {groups.map((group, gi) => (
        <div key={group.heading + gi} className="space-y-2">
          <h3 className="text-md font-semibold">{group.heading}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {group.plans.map((plan, pi) => {
              const id = `${gi}-${pi}`;
              return (
                <PlanCard
                  key={id}
                  title={plan.title}
                  price={plan.price}
                  selected={selectedId === id}
                  onClick={() => onSelect(id, plan)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Donate() {
  useEffect(() => {
    document.title = 'Donate | Agaram Foundation';
  }, []);

  const [tab, setTab] = useState('one-time');

  // Plan selection
  const [oneTimePlan, setOneTimePlan] = useState(null);
  const [oneTimePlanTitle, setOneTimePlanTitle] = useState(null);
  const [oneTimeAmount, setOneTimeAmount] = useState('');
  const [monthlyPlan, setMonthlyPlan] = useState(null);
  const [monthlyPlanTitle, setMonthlyPlanTitle] = useState(null);
  const [monthlyAmount, setMonthlyAmount] = useState(0);

  // Submission / payment state
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [receipt, setReceipt] = useState(null);
  const [receiptWasMock, setReceiptWasMock] = useState(false);

  // Personal details (shared by One Time / Every Month)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [pan, setPan] = useState('');
  const [isAlumni, setIsAlumni] = useState(false);

  // Address details
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('India');
  const [pincode, setPincode] = useState('');

  // Foreign donor form
  const [fFirstName, setFFirstName] = useState('');
  const [fLastName, setFLastName] = useState('');
  const [fEmail, setFEmail] = useState('');
  const [fCountryCode, setFCountryCode] = useState('');
  const [fPhone, setFPhone] = useState('');
  const [fDescription, setFDescription] = useState('');

  const foreignFields = [fFirstName, fLastName, fEmail, fCountryCode, fPhone, fDescription];
  const foreignProgress = Math.round(
    (foreignFields.filter((v) => v.trim() !== '').length / foreignFields.length) * 100
  );

  const handleSelectOneTimePlan = (id, plan) => {
    setOneTimePlan(id);
    setOneTimePlanTitle(plan.title);
    setOneTimeAmount(plan.price.replace(/[^\d]/g, ''));
  };

  const handleCustomAmount = (e) => {
    setOneTimeAmount(e.target.value);
    setOneTimePlan(null);
    setOneTimePlanTitle(null);
  };

  const handleSelectMonthlyPlan = (id, plan) => {
    setMonthlyPlan(id);
    setMonthlyPlanTitle(plan.title);
    setMonthlyAmount(Number(plan.price.replace(/[^\d]/g, '')) || 0);
  };

  const resetDonationFlow = () => {
    setReceipt(null);
    setReceiptWasMock(false);
    setFormError('');
    setOneTimePlan(null);
    setOneTimePlanTitle(null);
    setOneTimeAmount('');
    setMonthlyPlan(null);
    setMonthlyPlanTitle(null);
    setMonthlyAmount(0);
  };

  const verifyPayment = async (payload) => {
    const res = await api('/api/donations/verify', { method: 'POST', body: payload });
    setReceipt(res.receipt);
  };

  const handleContinue = async () => {
    if (submitting) return;
    setFormError('');

    const frequency = tab === 'monthly' ? 'monthly' : 'once';
    const amount = tab === 'monthly' ? monthlyAmount : Math.floor(Number(oneTimeAmount));
    const plan = tab === 'monthly' ? monthlyPlanTitle : oneTimePlanTitle;

    if (!amount || amount <= 0) {
      setFormError(
        tab === 'monthly' ? 'Please select a donation plan.' : 'Please select a plan or enter a valid amount.'
      );
      return;
    }
    if (!fullName.trim() || !email.trim() || !mobile.trim()) {
      setFormError('Please fill in your name, email and mobile number.');
      return;
    }

    const donor = { name: fullName.trim(), email: email.trim(), phone: mobile.trim(), alumni: isAlumni };
    if (pan.trim()) donor.pan = pan.trim();
    if (address.trim()) donor.address = address.trim();
    if (city.trim()) donor.city = city.trim();
    if (stateName.trim()) donor.state = stateName.trim();
    if (country.trim()) donor.country = country.trim();
    if (pincode.trim()) donor.pincode = pincode.trim();

    setSubmitting(true);
    try {
      const order = await api('/api/donations/order', {
        method: 'POST',
        auth: true,
        body: { amount, frequency, plan: plan || null, donor },
      });

      if (order.keyId) {
        // Real mode: open Razorpay checkout.
        await loadRazorpayScript();
        const rzp = new window.Razorpay({
          key: order.keyId,
          order_id: order.orderId,
          amount: order.amount,
          currency: order.currency,
          name: 'Venkata Sivaji Charitable Foundation',
          prefill: { name: donor.name, email: donor.email, contact: donor.phone },
          handler: async (response) => {
            try {
              await verifyPayment({
                donationId: order.donationId,
                orderId: order.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              });
              setReceiptWasMock(false);
            } catch (err) {
              setFormError(err.message);
            } finally {
              setSubmitting(false);
            }
          },
          modal: {
            ondismiss: () => setSubmitting(false),
          },
        });
        rzp.on('payment.failed', () => {
          setFormError('Payment failed. Please try again.');
          setSubmitting(false);
        });
        rzp.open();
      } else {
        // Mock mode: verify directly.
        await verifyPayment({ donationId: order.donationId, orderId: order.orderId });
        setReceiptWasMock(true);
        setSubmitting(false);
      }
    } catch (err) {
      setFormError(err.message);
      setSubmitting(false);
    }
  };

  const personalAndAddress = (
    <>
      <div className="space-y-4">
        <h3 className="text-md font-semibold">Personal Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HeroInput id="donate-full-name" label="Full Name" name="name" required value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <HeroInput id="donate-email" label="Email" name="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <HeroInput id="donate-mobile" label="Mobile Number" name="mobile" type="tel" required value={mobile} onChange={(e) => setMobile(e.target.value)} />
          <HeroInput id="donate-pan" label="PAN Card" name="pan" value={pan} onChange={(e) => setPan(e.target.value)} />
        </div>
        <HeroCheckbox labelId="donate-alumni-label" checked={isAlumni} onChange={(e) => setIsAlumni(e.target.checked)}>
          Have you been supported by our foundation before?
        </HeroCheckbox>
      </div>
      <div className="space-y-4">
        <h3 className="text-md font-semibold">Address Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HeroInput id="donate-address" label="Address (No, Street, Area)" name="address" required value={address} onChange={(e) => setAddress(e.target.value)} />
          <HeroInput id="donate-city" label="City / District" name="city" required value={city} onChange={(e) => setCity(e.target.value)} />
          <HeroInput id="donate-state" label="State" name="state" required value={stateName} onChange={(e) => setStateName(e.target.value)} />
          <HeroInput id="donate-country" label="Country" name="country" required value={country} onChange={(e) => setCountry(e.target.value)} />
          <HeroInput id="donate-pincode" label="Pincode" name="pincode" required value={pincode} onChange={(e) => setPincode(e.target.value)} />
        </div>
      </div>
      {formError ? <p className="text-danger text-sm text-center">{formError}</p> : null}
      <div className="flex justify-center pt-2">
        <button
          type="button"
          disabled={submitting}
          className={`${CONTINUE_BTN_CLS}${submitting ? ' opacity-disabled pointer-events-none' : ''}`}
          onClick={handleContinue}
        >
          {submitting ? 'Processing...' : 'Continue'}
        </button>
      </div>
    </>
  );

  const thankYou = receipt ? (
    <div
      className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none shadow-lg bg-white"
      tabIndex={-1}
    >
      <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6 sm:p-8">
        <div className="flex flex-col items-center text-center space-y-2 mb-6">
          <div className="bg-green-100 p-3 rounded-full">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-600"
              height="32"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Thank You for Your Donation!</h2>
          <p className="text-gray-600 text-sm">
            Your contribution helps us educate, empower and elevate deserving students.
          </p>
        </div>
        <div className="space-y-2 mb-6">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Amount</span>
            <span className="text-sm font-semibold text-gray-900">
              ₹{Number(receipt.amount).toLocaleString('en-IN')}
              {receipt.frequency === 'monthly' ? ' / month' : ''}
            </span>
          </div>
          {receipt.plan ? (
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Plan</span>
              <span className="text-sm font-medium text-gray-900">{receipt.plan}</span>
            </div>
          ) : null}
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Frequency</span>
            <span className="text-sm font-medium text-gray-900">
              {receipt.frequency === 'monthly' ? 'Every Month' : 'One Time'}
            </span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Receipt No.</span>
            <span className="text-sm font-medium text-gray-900">#{receipt.id}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-600">Date</span>
            <span className="text-sm font-medium text-gray-900">{formatReceiptDate(receipt.paidAt)}</span>
          </div>
        </div>
        {receiptWasMock ? (
          <p className="text-xs text-gray-500 text-center mb-4">
            Test mode — payment gateway not configured yet
          </p>
        ) : null}
        <div className="flex justify-center">
          <button type="button" className={CONTINUE_BTN_CLS} onClick={resetDonationFlow}>
            Make another donation
          </button>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="flex w-full bg-[#f6f6f6]">
        <div className="grid w-full md:grid-cols-7">
          <div className="hidden md:flex fixed top-0 left-0 h-screen md:w-[40%] xl:w-[38%] flex-col items-center justify-between p-6 pt-24 bg-[linear-gradient(-45deg,#ffffff,#00A9B6,#ccf8ff,#00A9B6,#ffffff)] bg-[length:400%_400%] animate-waterFlow">
            <div className="w-full flex justify-center pt-4">
              <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: '100px' }}>
                <img src="/assets/images/logo/agaram_logo.webp" className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" alt="Agaram Foundation Logo" width="100" height="80" style={{ height: '80px' }} data-loaded="true" />
              </div>
            </div>
            <div className="text-center px-4">
              <h2 className="text-lg font-semibold text-foreground">Educate. Empower. Elevate.</h2>
              <p className="text-sm text-default-500 mt-1">Your support helps build a stronger future.</p>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: '500px' }}>
                <img src="/assets/images/agaram-donation-image.webp" className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large" width="500" alt="" data-loaded="true" />
              </div>
            </div>
            <div className="text-center px-4 pb-2">
              <h2 className="text-lg font-semibold text-foreground">Sponsor a Future</h2>
              <p className="text-sm text-default-500 mt-1">Extend the power of education to every corner of society.</p>
              <button
                type="button"
                className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 border-medium px-4 min-w-20 h-10 text-small gap-2 rounded-small [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-transparent border-primary text-primary data-[hover=true]:opacity-hover hover:opacity-hover font-medium mt-3"
              >
                Know More About Donations
              </button>
            </div>
          </div>
          <div className="absolute right-0 top-0 h-full w-full md:w-[60%] xl:w-[62%] overflow-y-auto px-2 md:px-10 lg:px-12 py-10 space-y-6 bg-primary-100 pt-25">
            {receipt ? thankYou : (
            <>
            <div className="inline-flex w-full" data-slot="base">
              <div
                data-slot="tabList"
                className="relative flex h-fit gap-2 items-center flex-nowrap overflow-x-scroll scrollbar-hide rounded-medium bg-gray-100 p-1 w-full"
                role="tablist"
                aria-label="Donation Options"
              >
                {TABS.map((t) => (
                  <button
                    key={t.key}
                    data-slot="tab"
                    data-selected={tab === t.key ? 'true' : undefined}
                    role="tab"
                    aria-selected={tab === t.key}
                    tabIndex={tab === t.key ? 0 : -1}
                    className="z-0 w-full px-3 py-1 flex group relative justify-center items-center cursor-pointer transition-opacity tap-highlight-transparent data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 data-[hover-unselected=true]:opacity-disabled outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 h-8 text-small rounded-small"
                    type="button"
                    onClick={() => setTab(t.key)}
                  >
                    {tab === t.key ? (
                      <span className="absolute z-0 inset-0 rounded-small text-primary-foreground bg-primary shadow-small" data-slot="cursor"></span>
                    ) : null}
                    <div
                      data-slot="tabContent"
                      className="relative z-10 whitespace-nowrap transition-colors text-default-500 group-data-[selected=true]:text-primary-foreground pointer-events-none"
                    >
                      {t.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {tab === 'one-time' ? (
              <div role="tabpanel" className="space-y-6">
                <p className="text-sm text-gray-600">
                  Make a one-time donation to support underprivileged students. Your gift can shape their future.
                </p>
                <PlanGroups groups={ONE_TIME_GROUPS} selectedId={oneTimePlan} onSelect={handleSelectOneTimePlan} />
                <HeroPlainInput
                  id="donate-custom-amount"
                  name="custom_amount"
                  type="number"
                  min="1"
                  placeholder="Enter Amount (₹)"
                  value={oneTimeAmount}
                  onChange={handleCustomAmount}
                />
                {personalAndAddress}
              </div>
            ) : null}

            {tab === 'monthly' ? (
              <div role="tabpanel" className="space-y-6">
                <p className="text-sm text-gray-600">
                  Empower underprivileged students through monthly donations. Fund tuition, food, hostel, and mentorship.
                </p>
                <PlanGroups groups={MONTHLY_GROUPS} selectedId={monthlyPlan} onSelect={handleSelectMonthlyPlan} />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-gray-800">Donation Duration</h3>
                  </div>
                  <LoadingOptionsRow />
                  <DisabledSelect idBase="donate-duration" label="Donation Duration" />
                </div>
                {personalAndAddress}
              </div>
            ) : null}

            {tab === 'foreign' ? (
              <div role="tabpanel" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Foreign Donor Registration</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    If you are a passport holder of a country other than India, please fill this form.
                  </p>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{foreignProgress}% complete</span>
                  </div>
                  <div
                    className="flex flex-col gap-2 w-full"
                    aria-label="Progress"
                    aria-valuenow={foreignProgress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuetext={`${foreignProgress}%`}
                    role="progressbar"
                  >
                    <div className="z-0 relative bg-default-300/50 overflow-hidden rtl:rotate-180 h-1 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full transition-transform !duration-500"
                        style={{ transform: `translateX(-${100 - foreignProgress}%)` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-md font-semibold">Contact Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <HeroInput id="donate-f-first-name" label="First Name" name="first_name" required value={fFirstName} onChange={(e) => setFFirstName(e.target.value)} />
                    <HeroInput id="donate-f-last-name" label="Last Name" name="last_name" required value={fLastName} onChange={(e) => setFLastName(e.target.value)} />
                    <HeroInput id="donate-f-email" label="Email" name="email" type="email" required value={fEmail} onChange={(e) => setFEmail(e.target.value)} />
                    <HeroInput id="donate-f-country-code" label="Country Code" name="country_code" required value={fCountryCode} onChange={(e) => setFCountryCode(e.target.value)} />
                    <HeroInput id="donate-f-phone" label="Phone" name="phone" type="tel" required value={fPhone} onChange={(e) => setFPhone(e.target.value)} />
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">Log in to see query type options.</p>
                  <DisabledSelect idBase="donate-f-enquiry" label="Additional Enquiry" required={false} />
                  <HeroTextarea id="donate-f-description" label="Description" name="description" value={fDescription} onChange={(e) => setFDescription(e.target.value)} />
                </div>
                <div className="flex flex-col items-center gap-2 pt-2">
                  <button type="button" className={CONTINUE_BTN_CLS}>Log In &amp; Submit</button>
                  <p className="text-xs text-gray-500">You'll be asked to log in before your submission is processed</p>
                </div>
              </div>
            ) : null}
            </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
