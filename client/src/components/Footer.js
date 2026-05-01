import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTiktok, FaSnapchatGhost } from 'react-icons/fa'
import './Footer.css'

function Footer() {
    return (
        <footer className='footer1'>
        <footer className='footer'>

            <div className='footer-logo'>
                <h2>Miz <span>Jays</span></h2>
                <p>beauty with class...</p>
            </div>

            <div className='footer-socials'>
                <a
                    href='https://www.instagram.com/your_instagram_handle'
                    target='_blank'
                    rel='noreferrer'
                >
                    <AiOutlineInstagram />
                </a>
                <a
                    href='https://www.snapchat.com/add/your_snapchat_handle'
                    target='_blank'
                    rel='noreferrer'
                >
                    <FaSnapchatGhost />
                </a>
                <a
                    href='https://www.tiktok.com/@your_tiktok_handle'
                    target='_blank'
                    rel='noreferrer'
                >
                    <FaTiktok />
                </a>
            </div>

            <div className='footer-copy'>
                <p>© 2025 Miz Jays. All rights reserved.</p>
                <p className='footer-tag'>beauty with class...</p>
            </div>

            </footer>
            </footer>
    )
}

export default Footer