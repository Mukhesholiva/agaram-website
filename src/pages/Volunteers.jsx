import { useEffect, useState } from 'react';

// ---- HeroUI class strings (verbatim from the reference HTML) ----

const INPUT_WRAPPER_CLASS =
  'relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2';

const TEXTAREA_WRAPPER_CLASS =
  'relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 !h-auto transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2';

const LABEL_CLASS_START =
  'absolute z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text';

const TEXTAREA_LABEL_CLASS_START =
  'z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text';

const LABEL_CLASS_REQUIRED = " after:content-['*'] after:text-danger after:ms-0.5";

const LABEL_CLASS_END =
  ' will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden';

const TEXTAREA_LABEL_CLASS_END =
  ' relative will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small pb-0.5 pe-2 max-w-full text-ellipsis overflow-hidden';

const INPUT_CLASS =
  'w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small group-data-[has-value=true]:text-default-foreground';

const TEXTAREA_CLASS =
  'w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-default-foreground pt-0 transition-height !duration-100 motion-reduce:transition-none pe-0';

const CHECKBOX_BOX_CLASS =
  "relative inline-flex items-center justify-center shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-default after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before:bg-default-100 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background after:bg-primary after:text-primary-foreground text-primary-foreground w-5 h-5 me-2 rounded-[calc(var(--heroui-radius-medium)*0.6)] before:rounded-[calc(var(--heroui-radius-medium)*0.6)] after:rounded-[calc(var(--heroui-radius-medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none";

// ---- Local replicas of the HeroUI components used by the reference form ----

function HeroInput({
  idBase,
  label,
  type = 'text',
  dataType,
  required = false,
  placeholder,
  value,
  onChange,
  baseExtra = '',
}) {
  const [focused, setFocused] = useState(false);
  const hasText = value !== '';
  const filled = hasText || !!placeholder;
  const filledWithin = filled || focused;
  return (
    <div
      className={`group flex flex-col data-[hidden=true]:hidden w-full${baseExtra}${hasText ? ' is-filled' : ''}`}
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
        className={`${INPUT_WRAPPER_CLASS}${hasText ? ' is-filled' : ''}`}
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
            data-type={dataType}
            data-filled={hasText ? 'true' : undefined}
            data-filled-within={hasText ? 'true' : undefined}
            className={`${INPUT_CLASS}${hasText ? ' is-filled' : ''}`}
            type={type}
            required={required || undefined}
            placeholder={placeholder}
            tabIndex={0}
            id={`${idBase}_`}
            aria-labelledby={`${idBase}H1_`}
            aria-describedby={`${idBase}H3_ ${idBase}H4_`}
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

function HeroTextarea({ idBase, label, required = false, placeholder, value, onChange }) {
  return (
    <div
      className="group flex flex-col data-[hidden=true]:hidden w-full"
      data-slot="base"
      data-filled="true"
      data-filled-within="true"
      data-required={required ? 'true' : undefined}
      data-has-elements="true"
      data-has-label="true"
      data-has-value="true"
    >
      <div
        data-slot="input-wrapper"
        className={TEXTAREA_WRAPPER_CLASS}
        style={{ cursor: 'text' }}
        data-has-multiple-rows="true"
      >
        <label
          data-slot="label"
          className={
            TEXTAREA_LABEL_CLASS_START + (required ? LABEL_CLASS_REQUIRED : '') + TEXTAREA_LABEL_CLASS_END
          }
          id={`${idBase}H1_`}
          htmlFor={`${idBase}_`}
        >
          {label}
        </label>
        <div
          data-slot="inner-wrapper"
          className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start pb-0.5"
        >
          <textarea
            data-slot="input"
            className={TEXTAREA_CLASS}
            style={{ minHeight: '60px' }}
            required={required || undefined}
            placeholder={placeholder}
            tabIndex={0}
            id={`${idBase}_`}
            aria-labelledby={`${idBase}H1_`}
            aria-describedby={`${idBase}H3_ ${idBase}H4_`}
            data-hide-scroll="true"
            value={value}
            onChange={onChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
}

// The reference renders both selects in a disabled "Loading options..." state
// (options are fetched client-side after login), so this is a static replica.
function DisabledSelect({ idBase, label }) {
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
          <select disabled required tabIndex={-1} defaultValue="">
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
            className="block absolute z-10 flex-shrink-0 subpixel-antialiased text-foreground-500 pointer-events-none group-data-[has-label-outside=true]:pointer-events-auto cursor-pointer after:content-['*'] after:text-danger after:ms-0.5 will-change-auto origin-top-left rtl:origin-top-right !duration-200 !ease-out transition-[transform,color,left,opacity,translate,scale] motion-reduce:transition-none group-data-[filled=true]:text-default-600 group-data-[filled=true]:scale-85 text-small group-data-[filled=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden"
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

function HeroCheckbox({ labelId, ariaLabel, required = false, checked, onChange, children }) {
  return (
    <label
      className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2 select-none text-sm"
      data-selected={checked ? 'true' : 'false'}
    >
      <input
        aria-label={ariaLabel}
        aria-labelledby={labelId}
        type="checkbox"
        data-react-aria-pressable="true"
        tabIndex={0}
        required={required || undefined}
        className="font-inherit text-[100%] leading-[1.15] m-0 p-0 overflow-visible box-border absolute top-0 w-full h-full opacity-[0.0001] z-[1] cursor-pointer disabled:cursor-default"
        checked={checked}
        onChange={onChange}
      />
      <span aria-hidden="true" className={CHECKBOX_BOX_CLASS}>
        <svg
          aria-hidden="true"
          fill="none"
          role="presentation"
          stroke="currentColor"
          strokeDasharray="22"
          strokeDashoffset="66"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 17 18"
          className="z-10 opacity-0 group-data-[selected=true]:opacity-100 pointer-events-none w-4 h-3 transition-opacity motion-reduce:transition-none"
        >
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </span>
      <span
        id={labelId}
        className="relative text-foreground select-none text-medium transition-colors-opacity before:transition-width motion-reduce:transition-none"
      >
        {children}
      </span>
    </label>
  );
}

const HERO_WORDS = ['Join', 'Us', 'as', 'a', 'Volunteer'];

const VOLUNTEER_POINTS = [
  'Work closely with students who are navigating college and life for the first time',
  'Conduct workshops and share skills that broaden horizons',
  'Help with events and activities, creating lasting connections',
];

export default function Volunteers() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [country, setCountry] = useState('');
  const [stateName, setStateName] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [hoursPerWeek, setHoursPerWeek] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [attendedTraining, setAttendedTraining] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    document.title = 'Agaram Foundation | Educate. Empower. Elevate.';
  }, []);

  const requiredValues = [fullName, email, phone, country, stateName, city, pincode, addressLine, skills];
  const filledCount = requiredValues.filter((v) => v.trim() !== '').length + (agreeTerms ? 1 : 0);
  const progress = Math.round((filledCount / (requiredValues.length + 1)) * 100);

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="w-full min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50">
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full min-h-screen relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-primary-300/10 rounded-full blur-2xl animate-bounce delay-500"></div>
          </div>
          <div className="lg:col-span-5 relative min-h-[60vh] lg:min-h-screen hidden md:flex">
            <div className="absolute inset-0">
              <div className="relative shadow-black/5 shadow-none rounded-none" style={{ maxWidth: 'fit-content' }}>
                {' '}
                <img
                  src="/assets/images/join-us/volunteers-banner.png"
                  className="relative z-10 opacity-0 shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-none object-cover w-full h-full"
                  loading="eager"
                  alt="Join Us as a Volunteer"
                  data-loaded="true"
                />
              </div>
              <div className="absolute inset-0 bg-primary/80"></div>
            </div>
            <div className="relative z-20 h-full flex flex-col justify-center items-start p-8 lg:p-12 xl:p-16">
              <div className="max-w-md space-y-6">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                  {HERO_WORDS.map((word, i) => (
                    <span
                      key={word}
                      className="inline-block mr-3 transform transition-all duration-500 hover:scale-105"
                      style={{ animationDelay: `${i * 100}ms`, animation: 'fadeInUp 0.8s ease-out forwards' }}
                    >
                      {word}
                    </span>
                  ))}
                </h1>
                <p className="text-lg text-primary-100 leading-relaxed opacity-90">
                  Contribute your time and skills to support our mission.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="h-full bg-white/95 backdrop-blur-sm border-l border-primary-200/30">
              <div className="relative">
                <div className="absolute inset-0 opacity-5">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 20px 20px, rgb(var(--primary-500)) 1px, transparent 0)',
                      backgroundSize: '40px 40px',
                    }}
                  ></div>
                </div>
                <div className="relative z-10">
                  <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
                    <div className="bg-gradient-to-r from-slate-50 to-blue-50 py-16 lg:py-24">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                          <div>
                            <h1 className="text-4xl lg:text-5xl font-normal text-gray-800 leading-tight mb-6">
                              Be a catalyst for<span className="text-[#0891b2] font-medium"> transforming lives</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                              At Agaram, volunteers are not just helping hands, they are catalysts for change. Whether
                              it's mentoring a first-generation learner, conducting workshops, or helping with events
                              and activities, every hour you give ripples far beyond the moment.
                            </p>
                            <div className="space-y-4 mb-8">
                              {VOLUNTEER_POINTS.map((point) => (
                                <div key={point} className="flex items-start space-x-3">
                                  <div className="w-5 h-5 bg-[#0891b2] rounded-full mt-1 flex-shrink-0"></div>
                                  <p className="text-gray-700">{point}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="lg:pl-12">
                            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
                              <div className="text-center mb-6">
                                <h3 className="text-xl font-medium text-gray-800 mb-2">Your Impact</h3>
                                <p className="text-gray-600 text-sm">Every connection matters</p>
                              </div>
                              <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <svg
                                      stroke="currentColor"
                                      fill="none"
                                      strokeWidth="2"
                                      viewBox="0 0 24 24"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-6 h-6 text-[#0891b2]"
                                      height="1em"
                                      width="1em"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">Mentor &amp; Guide</h4>
                                    <p className="text-sm text-gray-600">Become the "Anna" or "Akka" they can lean on</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <svg
                                      stroke="currentColor"
                                      fill="none"
                                      strokeWidth="2"
                                      viewBox="0 0 24 24"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-6 h-6 text-[#0891b2]"
                                      height="1em"
                                      width="1em"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M12 7v14"></path>
                                      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"></path>
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">Share Knowledge</h4>
                                    <p className="text-sm text-gray-600">Conduct workshops and skill sessions</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                                    <svg
                                      stroke="currentColor"
                                      fill="none"
                                      strokeWidth="2"
                                      viewBox="0 0 24 24"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="w-6 h-6 text-[#0891b2]"
                                      height="1em"
                                      width="1em"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                      <circle cx="9" cy="7" r="4"></circle>
                                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                    </svg>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-800">Build Community</h4>
                                    <p className="text-sm text-gray-600">Help organize events and activities</p>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-gray-700 text-center italic">
                                  "Change doesn't happen in isolation, it's built together, one connection at a time."
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white py-12">
                      <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-2xl lg:text-3xl font-medium text-gray-800 mb-4">Volunteer Registration</h2>
                        <p className="text-gray-600 text-lg mb-8">
                          Volunteers are the pillars of strength for Agaram and they play a key role in every part of
                          Agaram's initiatives.
                        </p>
                      </div>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 pb-16">
                      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
                        <div className="mb-8">
                          <div className="flex justify-between text-sm text-gray-600 mb-2">
                            <span>Registration Progress</span>
                            <span>{progress}% complete</span>
                          </div>
                          <div
                            className="flex flex-col gap-2 w-full"
                            id="react-aria-_R_23rav5ubsnldb_"
                            aria-label="Progress"
                            aria-valuenow={progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuetext={`${progress}%`}
                            role="progressbar"
                          >
                            <div className="z-0 relative bg-default-300/50 overflow-hidden rtl:rotate-180 h-1 rounded-full">
                              <div
                                className="h-full bg-primary rounded-full transition-transform !duration-500"
                                style={{ transform: `translateX(-${100 - progress}%)` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div
                          role="alert"
                          data-visible="true"
                          className="flex flex-grow flex-row w-full items-center py-3 px-4 gap-x-1 rounded-medium text-primary-600 bg-primary-50 dark:bg-primary-50/50 mb-6"
                        >
                          <div className="flex-none relative w-9 h-9 rounded-full grid place-items-center bg-primary-50 dark:bg-primary-100 border-primary-100 shadow-small border-1">
                            <svg
                              fill="none"
                              height="24"
                              viewBox="0 0 24 24"
                              width="24"
                              xmlns="http://www.w3.org/2000/svg"
                              className="fill-current w-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                            >
                              <path d="M12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22ZM12.75 16C12.75 16.41 12.41 16.75 12 16.75C11.59 16.75 11.25 16.41 11.25 16L11.25 11C11.25 10.59 11.59 10.25 12 10.25C12.41 10.25 12.75 10.59 12.75 11L12.75 16ZM11.08 7.62C11.13 7.49 11.2 7.39 11.29 7.29C11.39 7.2 11.5 7.13 11.62 7.08C11.74 7.03 11.87 7 12 7C12.13 7 12.26 7.03 12.38 7.08C12.5 7.13 12.61 7.2 12.71 7.29C12.8 7.39 12.87 7.49 12.92 7.62C12.97 7.74 13 7.87 13 8C13 8.13 12.97 8.26 12.92 8.38C12.87 8.5 12.8 8.61 12.71 8.71C12.61 8.8 12.5 8.87 12.38 8.92C12.14 9.02 11.86 9.02 11.62 8.92C11.5 8.87 11.39 8.8 11.29 8.71C11.2 8.61 11.13 8.5 11.08 8.38C11.03 8.26 11 8.13 11 8C11 7.87 11.03 7.74 11.08 7.62Z"></path>
                            </svg>
                          </div>
                          <div className="h-full flex-grow min-h-10 ms-2 flex flex-col box-border items-start text-inherit justify-center">
                            Kindly log in first before filling the form.
                          </div>
                        </div>
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-6 text-gray-800 border-b border-gray-200 pb-2">
                            Personal Information
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <HeroInput
                              idBase="react-aria-_R_6brav5ubsnldb"
                              label="Full Name"
                              required
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                            />
                            <HeroInput
                              idBase="react-aria-_R_abrav5ubsnldb"
                              label="Email"
                              type="email"
                              dataType="email"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <HeroInput
                              idBase="react-aria-_R_ebrav5ubsnldb"
                              label="Phone Number"
                              type="tel"
                              dataType="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <HeroInput
                              idBase="react-aria-_R_ibrav5ubsnldb"
                              label="Country Code"
                              placeholder="+91"
                              value={countryCode}
                              onChange={(e) => setCountryCode(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-6 text-gray-800 border-b border-gray-200 pb-2">
                            Address
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <HeroInput
                              idBase="react-aria-_R_6drav5ubsnldb"
                              label="Country"
                              required
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                            />
                            <HeroInput
                              idBase="react-aria-_R_adrav5ubsnldb"
                              label="State"
                              required
                              value={stateName}
                              onChange={(e) => setStateName(e.target.value)}
                            />
                            <HeroInput
                              idBase="react-aria-_R_edrav5ubsnldb"
                              label="City/District"
                              required
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                            <HeroInput
                              idBase="react-aria-_R_idrav5ubsnldb"
                              label="Pincode"
                              required
                              value={pincode}
                              onChange={(e) => setPincode(e.target.value)}
                            />
                            <HeroInput
                              idBase="react-aria-_R_mdrav5ubsnldb"
                              label="Address Line"
                              required
                              baseExtra=" md:col-span-2"
                              value={addressLine}
                              onChange={(e) => setAddressLine(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-6 text-gray-800 border-b border-gray-200 pb-2">
                            Availability &amp; Preferences
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <DisabledSelect idBase="react-aria-_R_bfrav5ubsnldb" label="Availability" />
                            <HeroInput
                              idBase="react-aria-_R_jfrav5ubsnldb"
                              label="Available Hours Per Week"
                              type="number"
                              dataType="number"
                              placeholder="e.g., 5"
                              value={hoursPerWeek}
                              onChange={(e) => setHoursPerWeek(e.target.value)}
                            />
                            <DisabledSelect idBase="react-aria-_R_rfrav5ubsnldb" label="Preferred Location" />
                          </div>
                        </div>
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-6 text-gray-800 border-b border-gray-200 pb-2">
                            Skills &amp; Experience
                          </h3>
                          <div className="space-y-4">
                            <HeroTextarea
                              idBase="react-aria-_R_6hrav5ubsnldb"
                              label="What skills can you contribute?"
                              required
                              placeholder="e.g., Teaching, Communication, Project Management, Technical Skills..."
                              value={skills}
                              onChange={(e) => setSkills(e.target.value)}
                            />
                            <HeroTextarea
                              idBase="react-aria-_R_ahrav5ubsnldb"
                              label="Previous Volunteer Experience"
                              placeholder="Tell us about your previous volunteer experience (optional)"
                              value={experience}
                              onChange={(e) => setExperience(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mb-8">
                          <h3 className="text-lg font-medium mb-6 text-gray-800 border-b border-gray-200 pb-2">
                            Final Steps
                          </h3>
                          <div className="space-y-4">
                            <div className="space-y-3">
                              <HeroCheckbox
                                labelId="_R_6jrav5ubsnldb_"
                                ariaLabel="I have previously attended Agaram volunteer training sessions"
                                checked={attendedTraining}
                                onChange={(e) => setAttendedTraining(e.target.checked)}
                              >
                                I have previously attended Agaram volunteer training sessions
                              </HeroCheckbox>
                              <HeroCheckbox
                                labelId="_R_ejrav5ubsnldb_"
                                ariaLabel=" "
                                required
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                              >
                                <span className="text-sm">
                                  I agree to the volunteer terms and conditions and commit to contributing meaningfully
                                  to Agaram's mission
                                </span>
                              </HeroCheckbox>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="button"
                            tabIndex={0}
                            data-react-aria-pressable="true"
                            className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-24 h-12 gap-3 rounded-large [&>svg]:max-w-[theme(spacing.8)] motion-reduce:transition-none data-[hover=true]:opacity-hover bg-[#0891b2] text-white px-8 py-3 text-base font-medium hover:bg-[#0e7490] transition-colors"
                            onClick={(e) => e.preventDefault()}
                          >
                            Log In &amp; Submit
                          </button>
                          <p className="text-sm text-gray-500 mt-4">
                            You'll be asked to log in before your registration is submitted
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
