import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar({ darkMode, toggleTheme }) {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return (
        <nav className='navbar'>

            <div className='navbar-logo'>
                <h1>Miz <span>Jays</span></h1>
                <p>beauty with class...</p>
            </div>

            <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
                <Link to='/services'>Services</Link>
                <Link to='/about'>About</Link>
                <Link to='/portfolio'>Portfolio</Link>
                <Link to='/shop'>Shop</Link>
            </div>

            <div className='navbar-right'>
                <button onClick={toggleTheme} className='theme-toggle'>
                    {darkMode ? '☀️' : '🌙'}
                </button>
                <a
                    href='https://wa.me/233559912316? text= Hi, Miz Jays!I would like to make an enquiry 😊 '
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

        </nav>
    )
}

export default Navbar