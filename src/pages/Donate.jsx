import { useEffect, useState } from 'react';

const AMOUNT_OPTIONS = [500, 1000, 2500, 5000, 10000, 25000];

const CARD_CLS =
  'flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large transition-transform-background motion-reduce:transition-none shadow-lg';
const CARD_BODY_CLS =
  'relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6';
const INPUT_WRAPPER_CLS =
  'relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2';
const LABEL_CLS =
  "absolute z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden";
const LABEL_REQUIRED_CLS = `${LABEL_CLS} after:content-['*'] after:text-danger after:ms-0.5`;
const INNER_WRAPPER_CLS =
  'inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5';
const INPUT_CLS =
  'w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small group-data-[has-value=true]:text-default-foreground';

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

export default function Donate() {
  useEffect(() => {
    document.title = 'Donate | Agaram Foundation';
  }, []);

  const [selectedAmount, setSelectedAmount] = useState(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');

  const amount = customAmount !== '' ? Number(customAmount) || 0 : selectedAmount || 0;

  const handleSelectAmount = (value) => {
    setSelectedAmount(value);
    setCustomAmount('');
  };

  const handleCustomAmount = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

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
          </div>
          <div className="absolute right-0 top-0 h-full w-full md:w-[60%] xl:w-[62%] overflow-y-auto px-2 md:px-10 lg:px-12 py-10 space-y-6 bg-primary-100 pt-25">
            <div className="w-full max-w-5xl mx-auto px-4 py-12 space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Make a Donation</h1>
                <p className="text-default-500 mt-2">Your contribution helps provide quality education to underprivileged students.</p>
              </div>
              <div className={CARD_CLS} tabIndex={-1}>
                <div className={CARD_BODY_CLS}>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Choose Donation Amount</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {AMOUNT_OPTIONS.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleSelectAmount(value)}
                        className={`z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium transition-transform-colors-opacity motion-reduce:transition-none ${selectedAmount === value && customAmount === '' ? 'bg-primary text-primary-foreground shadow-md' : 'bg-default-100 text-foreground data-[hover=true]:bg-default-200 hover:bg-default-200'}`}
                      >
                        ₹{value.toLocaleString('en-IN')}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4">
                    <HeroInput
                      id="donate-custom-amount"
                      label="Custom Amount (₹)"
                      name="custom_amount"
                      type="number"
                      min="1"
                      value={customAmount}
                      onChange={handleCustomAmount}
                    />
                  </div>
                </div>
              </div>
              <div className={CARD_CLS} tabIndex={-1}>
                <div className={CARD_BODY_CLS}>
                  <h3 className="text-xl font-semibold text-foreground mb-4">Donor Details</h3>
                  <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                    <HeroInput
                      id="donate-name"
                      label="Full Name"
                      name="name"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                    <HeroInput
                      id="donate-email"
                      label="Email Address"
                      name="email"
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                    />
                    <HeroInput
                      id="donate-phone"
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      required
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                    />
                    <HeroInput
                      id="donate-pan"
                      label="PAN Number (Optional)"
                      name="pan"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value)}
                    />
                    <button
                      type="submit"
                      tabIndex={0}
                      className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover hover:opacity-hover w-full"
                    >
                      {amount > 0 ? `Donate ₹${amount.toLocaleString('en-IN')}` : 'Donate'}
                    </button>
                  </form>
                  <div className="flex items-center justify-center space-x-4 mt-6">
                    <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: 'fit-content' }}>
                      <img src="/assets/images/logo/ssl.webp" className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-sm w-30" alt="SSL" data-loaded="true" />
                    </div>
                    <a href="https://razorpay.com/" target="_blank" rel="noopener noreferrer">
                      <div className="relative shadow-black/5 shadow-none rounded-large" style={{ maxWidth: 'fit-content' }}>
                        <img src="/assets/images/logo/secured_payments.webp" className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-sm w-30" alt="Razorpay" data-loaded="true" />
                      </div>
                    </a>
                  </div>
                  <p className="text-center text-xs text-default-500 mt-2">100% secure payments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
