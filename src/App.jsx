import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import OurMission from './pages/OurMission.jsx'
import OurJourney from './pages/OurJourney.jsx'
import Financials from './pages/Financials.jsx'
import Partners from './pages/Partners.jsx'
import Contact from './pages/Contact.jsx'
import Donate from './pages/Donate.jsx'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Volunteers from './pages/Volunteers.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsAndConditions from './pages/TermsAndConditions.jsx'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our_mission" element={<OurMission />} />
        <Route path="/our_journey" element={<OurJourney />} />
        <Route path="/financials" element={<Financials />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/join-us/volunteers" element={<Volunteers />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
        <Route path="/terms_and_conditions" element={<TermsAndConditions />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
