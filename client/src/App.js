import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Shop from './pages/Shop'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminServices from './pages/AdminServices'
import AdminProducts from './pages/AdminProducts'
import AdminPortfolio from './pages/AdminPortfolio'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    })
  }, [])

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return (
    <Router>
    <div className={darkMode ? 'app dark' : 'app light'}>
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
        <main className='main-content'>
            <Routes>
               <Route path='/' element={<Home />} />
    <Route path='/services' element={<Services />} />
    <Route path='/services/:id' element={<ServiceDetail />} />
    <Route path='/about' element={<About />} />
    <Route path='/portfolio' element={<Portfolio />} />
    <Route path='/shop' element={<Shop />} />

    {/* Admin Routes */}
    <Route path='/admin' element={<AdminLogin />} />
    <Route path='/admin/dashboard' element={<AdminDashboard />} />
    <Route path='/admin/services' element={<AdminServices />} />
    <Route path='/admin/products' element={<AdminProducts />} />
    <Route path='/admin/portfolio' element={<AdminPortfolio />} />
            </Routes>
        </main>
        <Footer />
    </div>
</Router>
  )
}

export default App