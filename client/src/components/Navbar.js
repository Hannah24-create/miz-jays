import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsMoon, BsSun } from 'react-icons/bs'
import logo from '../assets/logo.png'
import './Navbar.css'

function Navbar({ darkMode, toggleTheme }) {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className='navbar'>

            <Link to='/'>
                <img
                    src={logo}
                    alt='Miz Jays'
                    className='navbar-logo-img'
                />
            </Link>

            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <Link to='/services' onClick={() => setIsOpen(false)}>Services</Link>
                <Link to='/about' onClick={() => setIsOpen(false)}>About</Link>
                <Link to='/portfolio' onClick={() => setIsOpen(false)}>Portfolio</Link>
                <Link to='/shop' onClick={() => setIsOpen(false)}>Shop</Link>
            </div>

            <div className='navbar-actions'>

                <div className='navbar-right'>
                    <button onClick={toggleTheme} className='theme-toggle'>
                        {darkMode ? <BsSun /> : <BsMoon />}
                    </button>
                    <a
                        href='https://wa.me/233559912316?text=Hi Miz Jays! I would like to make an enquiry 😊'
                        target='_blank'
                        rel='noreferrer'
                        className='contact-btn'
                    >
                        Contact Us
                    </a>
                </div>

                <div className='navbar-toggle' onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

            </div>

        </nav>
    )
}

export default Navbar