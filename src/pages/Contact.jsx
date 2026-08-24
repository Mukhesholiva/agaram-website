import { useEffect, useState } from 'react';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact Us | Agaram Foundation';
  }, []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-secondary-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">Get in touch with Agaram Foundation. We're here to help educate children and change lives.</p>
            <div style={{ fontFamily: '"Caveat", cursive' }} className="text-primary text-4xl mt-4">#change<span className="text-white">a</span>life</div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Get In Touch</h2>
                <p className="text-gray-600 text-lg leading-relaxed">Reach out to us for any inquiries about our mission, programs, or how you can contribute to changing lives through education.</p>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none shadow-lg hover:shadow-xl transition-shadow duration-300" tabIndex={-1}>
                  <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-primary" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Office Address</h3>
                        <address className="not-italic text-gray-600 leading-relaxed">15/4, Arulambal Street, T.Nagar,<br />Chennai - 600 017<br />Tamil Nadu, India</address>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none shadow-lg hover:shadow-xl transition-shadow duration-300" tabIndex={-1}>
                  <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Us</h3>
                        <a className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 no-underline hover:opacity-hover active:opacity-disabled text-blue-600 hover:text-blue-800 transition-colors duration-200 text-lg" href="mailto:info@agaram.in" tabIndex={0} data-react-aria-pressable="true" role="link">info@agaram.in</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none shadow-lg hover:shadow-xl transition-shadow duration-300" tabIndex={-1}>
                  <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-green-600" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Call Us</h3>
                        <a href="tel:+919841891000" className="text-green-600 hover:text-green-800 transition-colors duration-200 text-lg block">+91 98418 91000</a>
                        <a href="tel:+04443506361" className="text-green-600 hover:text-green-800 transition-colors duration-200 text-lg block">044-43506361</a>
                        <p className="text-gray-500 text-sm mt-1">Support &amp; General Inquiries</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large motion-reduce:transition-none shadow-lg hover:shadow-xl transition-shadow duration-300" tabIndex={-1}>
                  <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-green-100 p-3 rounded-full">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-green-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">WhatsApp</h3>
                        <a className="relative inline-flex items-center tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 no-underline hover:opacity-hover active:opacity-disabled text-green-500 hover:text-green-700 transition-colors duration-200 text-lg" href="https://wa.me/919841891000" target="_blank" rel="noopener noreferrer" tabIndex={0} data-react-aria-pressable="true" role="link">+91 98418 91000</a>
                        <p className="text-gray-500 text-sm mt-1">Quick messages &amp; support</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="max-w-lg mx-auto p-6 rounded-2xl shadow-lg bg-white">
                <h2 className="text-2xl font-semibold mb-6 text-center">General Enquiry</h2>
                <form id="enquiry-form" className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="group flex flex-col data-[hidden=true]:hidden w-full" data-slot="base" data-required="true" data-has-elements="true" data-has-label="true" data-has-value="true" data-filled={name ? 'true' : undefined} data-filled-within={name ? 'true' : undefined}>
                    <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2" style={{ cursor: 'text' }}>
                      <label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text after:content-['*'] after:text-danger after:ms-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria-_R_1jalubsnldbH1_" htmlFor="react-aria-_R_1jalubsnldb_">Full Name</label>
                      <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5">
                        <input data-slot="input" className="w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small group-data-[has-value=true]:text-default-foreground" type="text" required tabIndex={0} id="react-aria-_R_1jalubsnldb_" aria-labelledby="react-aria-_R_1jalubsnldbH1_" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="group flex flex-col data-[hidden=true]:hidden w-full" data-slot="base" data-required="true" data-has-elements="true" data-has-label="true" data-has-value="true" data-filled={phone ? 'true' : undefined} data-filled-within={phone ? 'true' : undefined}>
                    <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2" style={{ cursor: 'text' }}>
                      <label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text after:content-['*'] after:text-danger after:ms-0.5 will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria-_R_2jalubsnldbH1_" htmlFor="react-aria-_R_2jalubsnldb_">Phone Number</label>
                      <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5">
                        <input data-slot="input" data-type="tel" className="w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small group-data-[has-value=true]:text-default-foreground" type="tel" required tabIndex={0} id="react-aria-_R_2jalubsnldb_" aria-labelledby="react-aria-_R_2jalubsnldbH1_" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="group flex flex-col data-[hidden=true]:hidden w-full" data-slot="base" data-has-elements="true" data-has-label="true" data-has-value="true" data-filled={email ? 'true' : undefined} data-filled-within={email ? 'true' : undefined}>
                    <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2" style={{ cursor: 'text' }}>
                      <label data-slot="label" className="absolute z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_6px)] pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria-_R_3jalubsnldbH1_" htmlFor="react-aria-_R_3jalubsnldb_">Email Address</label>
                      <div data-slot="inner-wrapper" className="inline-flex w-full items-center h-full box-border group-data-[has-label=true]:items-end pb-0.5">
                        <input data-slot="input" data-type="email" className="w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small group-data-[has-value=true]:text-default-foreground" type="email" tabIndex={0} id="react-aria-_R_3jalubsnldb_" aria-labelledby="react-aria-_R_3jalubsnldbH1_" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="group flex flex-col data-[hidden=true]:hidden w-full" data-slot="base" data-required="true" data-has-elements="true" data-has-label="true" data-has-value="true" data-filled={message ? 'true' : undefined} data-filled-within={message ? 'true' : undefined}>
                    <div data-slot="input-wrapper" className="relative w-full inline-flex tap-highlight-transparent shadow-xs px-3 bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100 min-h-10 rounded-medium flex-col items-start justify-center gap-0 !h-auto transition-background motion-reduce:transition-none !duration-150 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background h-14 py-2" style={{ cursor: 'text' }} data-has-multiple-rows="true">
                      <label data-slot="label" className="z-10 pointer-events-none origin-top-left shrink-0 rtl:origin-top-right subpixel-antialiased block text-foreground-500 cursor-text after:content-['*'] after:text-danger after:ms-0.5 relative will-change-auto !duration-200 !ease-out motion-reduce:transition-none transition-[transform,color,left,opacity,translate,scale] group-data-[filled-within=true]:text-default-600 group-data-[filled-within=true]:pointer-events-auto group-data-[filled-within=true]:scale-85 text-small pb-0.5 pe-2 max-w-full text-ellipsis overflow-hidden" id="react-aria-_R_4jalubsnldbH1_" htmlFor="react-aria-_R_4jalubsnldb_">Message</label>
                      <div data-slot="inner-wrapper" className="inline-flex w-full h-full box-border items-start group-data-[has-label=true]:items-start pb-0.5">
                        <textarea data-slot="input" className="w-full font-normal bg-transparent !outline-solid placeholder:text-foreground-500 focus-visible:outline-solid outline-transparent data-[has-start-content=true]:ps-1.5 data-[has-end-content=true]:pe-1.5 data-[type=color]:rounded-none file:cursor-pointer file:bg-transparent file:border-0 autofill:bg-transparent bg-clip-text dark:autofill:[-webkit-text-fill-color:hsl(var(--heroui-foreground))] [&::-ms-reveal]:hidden text-small resize-none data-[hide-scroll=true]:scrollbar-hide group-data-[has-value=true]:text-default-foreground pt-0 transition-height !duration-100 motion-reduce:transition-none pe-0" required name="message" tabIndex={0} id="react-aria-_R_4jalubsnldb_" aria-labelledby="react-aria-_R_4jalubsnldbH1_" data-hide-scroll="true" rows={4} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                      </div>
                    </div>
                  </div>
                  <label className="group relative max-w-fit inline-flex items-center justify-start cursor-pointer tap-highlight-transparent p-2 -m-2 select-none my-2" data-selected={agree ? 'true' : undefined}>
                    <input aria-label="I agree to be contacted regarding my enquiry" aria-labelledby="_R_5jalubsnldb_" type="checkbox" data-react-aria-pressable="true" tabIndex={0} className="font-inherit text-[100%] leading-[1.15] m-0 p-0 overflow-visible box-border absolute top-0 w-full h-full opacity-[0.0001] z-[1] cursor-pointer disabled:cursor-default" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <span aria-hidden="true" className="relative inline-flex items-center justify-center shrink-0 overflow-hidden before:content-[''] before:absolute before:inset-0 before:border-solid before:border-2 before:box-border before:border-default after:content-[''] after:absolute after:inset-0 after:scale-50 after:opacity-0 after:origin-center group-data-[selected=true]:after:scale-100 group-data-[selected=true]:after:opacity-100 group-data-[hover=true]:before:bg-default-100 outline-solid outline-transparent group-data-[focus-visible=true]:z-10 group-data-[focus-visible=true]:ring-2 group-data-[focus-visible=true]:ring-focus group-data-[focus-visible=true]:ring-offset-2 group-data-[focus-visible=true]:ring-offset-background after:bg-primary after:text-primary-foreground text-primary-foreground w-5 h-5 me-2 rounded-[calc(var(--heroui-radius-medium)*0.6)] before:rounded-[calc(var(--heroui-radius-medium)*0.6)] after:rounded-[calc(var(--heroui-radius-medium)*0.6)] before:transition-colors group-data-[pressed=true]:scale-95 transition-transform after:transition-transform-opacity after:!ease-linear after:!duration-200 motion-reduce:transition-none">
                      <svg aria-hidden="true" fill="none" role="presentation" stroke="currentColor" strokeDasharray="22" strokeDashoffset={agree ? 44 : 66} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 17 18" className="z-10 opacity-0 group-data-[selected=true]:opacity-100 pointer-events-none w-4 h-3 transition-opacity motion-reduce:transition-none">
                        <polyline points="1 9 7 14 15 4"></polyline>
                      </svg>
                    </span>
                    <span id="_R_5jalubsnldb_" className="relative text-foreground select-none text-medium transition-colors-opacity before:transition-width motion-reduce:transition-none">I agree to be contacted regarding my enquiry</span>
                  </label>
                  <button type="submit" tabIndex={0} data-react-aria-pressable="true" className="z-0 group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent transform-gpu data-[pressed=true]:scale-[0.97] cursor-pointer outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-4 min-w-20 h-10 text-small gap-2 rounded-medium [&>svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full">Submit Enquiry</button>
                </form>
              </div>
              <div className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 rounded-large transition-transform-background motion-reduce:transition-none shadow-lg mx-auto max-w-lg" tabIndex={-1}>
                <div className="relative flex w-full flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased p-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Connect With Us</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <a className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 group" href="https://www.facebook.com/agaramfoundation" target="_blank" rel="noopener noreferrer" tabIndex={0} data-react-aria-pressable="true" role="link">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-8 h-8 text-gray-600 group-hover:text-blue-600 mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                      </svg>
                      <span className="text-sm text-gray-600 group-hover:text-blue-600">Facebook</span>
                    </a>
                    <a className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group" href="https://x.com/agaramvision?t=2QUd1JKQWJ-bHdFAO8HZeg&s=09" target="_blank" rel="noopener noreferrer" tabIndex={0} data-react-aria-pressable="true" role="link">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-8 h-8 text-gray-600 group-hover:text-gray-800 mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"></path>
                      </svg>
                      <span className="text-sm text-gray-600 group-hover:text-gray-800">Twitter</span>
                    </a>
                    <a className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled flex flex-col items-center p-4 rounded-lg hover:bg-blue-50 transition-colors duration-200 group" href="https://www.linkedin.com/company/agaram-foundation/" target="_blank" rel="noopener noreferrer" tabIndex={0} data-react-aria-pressable="true" role="link">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-8 h-8 text-gray-600 group-hover:text-blue-600 mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
                      </svg>
                      <span className="text-sm text-gray-600 group-hover:text-blue-600">LinkedIn</span>
                    </a>
                    <a className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled flex flex-col items-center p-4 rounded-lg hover:bg-green-50 transition-colors duration-200 group" href="https://wa.me/919841891000" target="_blank" rel="noopener noreferrer" tabIndex={0} data-react-aria-pressable="true" role="link">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-8 h-8 text-gray-600 group-hover:text-green-500 mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                      </svg>
                      <span className="text-sm text-gray-600 group-hover:text-green-500">WhatsApp</span>
                    </a>
                    <a className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled flex flex-col items-center p-4 rounded-lg hover:bg-pink-50 transition-colors duration-200 group" href="https://www.instagram.com/agaram_foundation_official?igsh=ZDc2eHJ3dThkNmxq" target="_blank" rel="noopener noreferrer" tabIndex={0} data-react-aria-pressable="true" role="link">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-8 h-8 text-gray-600 group-hover:text-pink-500 mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                      </svg>
                      <span className="text-sm text-gray-600 group-hover:text-pink-500">Instagram</span>
                    </a>
                    <a className="relative tap-highlight-transparent outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-hover active:opacity-disabled flex flex-col items-center p-4 rounded-lg hover:bg-red-50 transition-colors duration-200 group" href="https://youtube.com/@agaramfoundation4745?si=MVOG8HIlJMFTqgv9" target="_blank" rel="noopener noreferrer" tabIndex={0} data-react-aria-pressable="true" role="link">
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" className="w-8 h-8 text-gray-600 group-hover:text-red-500 mb-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                      </svg>
                      <span className="text-sm text-gray-600 group-hover:text-red-500">YouTube</span>
                    </a>
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
