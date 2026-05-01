import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div className='home'>

            <div className='hero'>

                <div className='hero-content'>
                    <p className='hero-services'>
                        Hair · Pedicure · Manicure · Cuts & More
                    </p>
                    <h1 className='hero-title'>
                        Beauty With <span>Class & Style</span>
                    </h1>
                    <p className='hero-subtitle'>
                        Your go-to beauty destination for hair, nails, 
                        pedicure, manicure and so much more — 
                        located in the heart of Accra.
                    </p>

                    <div className='hero-buttons'>
                        <a
                            href='https://wa.me/233559912316?text=Hi Miz Jays! I would like to book an appointment 😊'
                            target='_blank'
                            rel='noreferrer'
                            className='btn-primary'
                            aria-label='Book appointment on WhatsApp'
                        >
                            Book Appointment
                        </a>
                        <Link to='/services' className='btn-outline'>
                            View Services
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home