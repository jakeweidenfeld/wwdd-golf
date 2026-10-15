import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Tournament from './pages/Tournament'
import Register from './pages/Register'
import Sponsor from './pages/Sponsor'
import Donate from './pages/Donate'
import Impact from './pages/Impact'
import SignIn from './pages/SignIn'
import Members from './pages/Members'
import Admin from './pages/Admin'
import Privacy from './pages/Privacy'

function NotFound() {
  return (
    <main id="main" className="container-page flex flex-1 flex-col items-start justify-center py-40">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="lede mt-3">That page doesn’t exist. Let’s get you back on the fairway.</p>
      <Link to="/" className="btn-primary mt-8">Go home</Link>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <div className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tournament" element={<Tournament />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sponsor" element={<Sponsor />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/members" element={<Members />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* Paths from the earlier version of the site */}
          <Route path="/event-info" element={<Navigate to="/tournament" replace />} />
          <Route path="/sponsors" element={<Navigate to="/sponsor" replace />} />
          <Route path="/photos" element={<Navigate to="/impact" replace />} />
          <Route path="/experience-camps" element={<Navigate to="/about" replace />} />
          <Route path="/contact" element={<Navigate to="/sponsor" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}
