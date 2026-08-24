import { useEffect } from 'react';

export default function TermsAndConditions() {
  useEffect(() => {
    document.title = 'Terms and Conditions | Agaram Foundation';
  }, []);

  return (
    <main className="flex-grow w-full overflow-x-hidden overflow-y-auto sm:pb-0 pb-16">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div
          className="flex flex-col relative overflow-hidden h-auto text-foreground box-border bg-content1 outline-solid outline-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 transition-transform-background motion-reduce:transition-none shadow-lg rounded-2xl border border-gray-200"
          tabIndex={-1}
        >
          <div className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large text-3xl font-bold text-gray-800">
            Terms and Conditions
          </div>
          <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased space-y-6 text-gray-700 text-base leading-relaxed">
            <p>You may download or print information from this Site (the "Information") solely for non-commercial personal use. You must retain and reproduce each and every copyright notice or other proprietary rights notice contained in any Information you download.</p>
            <p>You may not, however, distribute, modify, transmit, reuse, repost, or use the content of the Site for public or commercial purposes, including the text, images, graphics, audio, and video without written permission of Agaram Foundation.</p>
            <p>You should assume that everything you see or read on this Site is proprietary unless otherwise noted and may not be used except as provided in these Terms and Conditions without written permission from Agaram Foundation.</p>
            <p>This Site may contain or reference trademarks, patents, proprietary information, technologies, products, processes, or other proprietary rights of Agaram Foundation and/or other parties. No license or right in any such items is granted to you.</p>
            <p>While Agaram Foundation uses reasonable efforts to include accurate and up-to-date information, it makes no warranties or representations with respect to the Site's content, which is provided "as is".</p>
            <p>Agaram Foundation accepts no responsibility for any use of this Site or its content. It shall not be liable for any damages or viruses that may affect your computer or property due to browsing or downloading materials from the Site.</p>
            <p>Agaram Foundation reserves the right to interrupt or discontinue any or all functionality of the Site at any time.</p>
            <p>Any communication you transmit to the Site, including data, feedback, ideas, questions, or suggestions, will be treated as non-confidential and non-proprietary.</p>
            <p>The Information on the Site may contain technical inaccuracies or typographical errors. Agaram Foundation reserves the right to make corrections or improvements at any time without notice.</p>
            <p>Not all products or services described on this Site are available in all locations. A reference does not imply availability everywhere.</p>
            <p>Agaram Foundation has no control over, and does not endorse, any sites linked to or from this Site. Visiting external links is at your own risk and without permission from Agaram Foundation.</p>
            <p>Framing or in-line linking of this Site by external parties is not permitted.</p>
            <h2 className="text-xl font-semibold pt-4">Collection of Personal Information</h2>
            <p>Agaram Foundation is committed to the ethical collection, retention, and use of your Personal Information on this Site.</p>
            <p>Your Personal Information may include:</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Your name</li>
              <li>Your occupation</li>
              <li>Your email and mailing address</li>
              <li>Your telephone number</li>
              <li>Any other data as Agaram may require</li>
            </ul>
            <h2 className="text-xl font-semibold pt-4">Modifications</h2>
            <p>Agaram Foundation may revise these Terms and Conditions at any time by updating this page. Please check periodically to stay informed of any updates.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
