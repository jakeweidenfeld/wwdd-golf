import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import ExperienceCamps from './pages/ExperienceCamps'
import EventInfo from './pages/EventInfo'
import RegisterDonate from './pages/RegisterDonate'
import Sponsors from './pages/Sponsors'
import Photos from './pages/Photos'
import ImpactStats from './pages/ImpactStats'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/experience-camps" element={<ExperienceCamps />} />
            <Route path="/event-info" element={<EventInfo />} />
            <Route path="/register" element={<RegisterDonate />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/impact" element={<ImpactStats />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
