import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AOS from 'aos'
import { MdOutlineContentCut } from 'react-icons/md'
import { BsCalendarCheck, BsEmojiSmile } from 'react-icons/bs'
import { BiHome } from 'react-icons/bi'
import './Home.css'

function Home() {
    const [services, setServices] = useState([])

    useEffect(() => {
        AOS.refresh()
        const fetchServices = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/services')
                setServices(response.data.slice(0, 3))
            } catch (error) {
                console.log(error)
            }
        }
        fetchServices()
    }, [])

    return (
        <div className='home'>

            
            <div className='hero'>
                <div className='hero-overlay'></div>
                <div className='hero-content'>
                    <p className='hero-label'>
                        Lakeside Community 5 · Accra
                    </p>
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
                            href='https://wa.me/233559912316?text=Hi Miz Jays! I would like to book an appointment'
                            target='_blank'
                            rel='noreferrer'
                            className='btn-primary'
                        >
                            Book Appointment
                        </a>
                        <Link to='/services' className='btn-outline'>
                            View Services
                        </Link>
                    </div>
                </div>
            </div>

            
            <div className='home-section'>
                <div
                    className='home-section-header'
                    data-aos='fade-up'
                >
                    <div className='section-divider'></div>
                    <h2>Our <span>Services</span></h2>
                    <p>Professional beauty services delivered with precision and care</p>
                </div>

                <div className='home-services-grid'>
                    {services.map((service, index) => (
                        <div
                            className='home-service-card'
                            key={service._id}
                            data-aos='flip-left'
                            data-aos-delay={index * 150}
                        >
                    
                            <div className='home-service-card-body'>
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <Link
                                    to={`/services/${service._id}`}
                                    className='service-btn'
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div
                    className='home-section-footer'
                    data-aos='fade-up'
                >
                    <Link to='/services' className='btn-outline'>
                        View All Services
                    </Link>
                </div>
            </div>

          
            <div className='home-about'>
                <div
        className='home-about-left'
        data-aos='fade-right'
    >
        <div className='section-divider'></div>
        <h2>About <span>Miz Jays</span></h2>
        <p>
            Welcome to Miz Jays — your go-to beauty destination
            located at Lakeside Community 5, Accra. We are more
            than just a salon, we are a beauty experience built
            on class, care and creativity.
        </p>
        <p>
            From stunning hair styles to perfect nails, pedicures,
            manicures and so much more — our skilled team is here
            to make you look and feel your absolute best.
        </p>
        <Link to='/about' className='btn-primary'>
            Learn More
        </Link>
    </div>

    <div
        className='home-why-right'
        data-aos='fade-left'
    >
        <div className='section-divider'></div>
        <h2>Why Choose <span>Us</span></h2>

        <div className='why-list'>
            <div className='why-item'>
                <div className='why-item-icon'>
                    <MdOutlineContentCut />
                </div>
                <div className='why-item-text'>
                    <h3>Expert Stylists</h3>
                    <p>Skilled professionals who understand style and care</p>
                </div>
            </div>

            <div className='why-item'>
                <div className='why-item-icon'>
                    <BsCalendarCheck />
                </div>
                <div className='why-item-text'>
                    <h3>Open Every Day</h3>
                    <p>Available whenever you need us</p>
                </div>
            </div>

            <div className='why-item'>
                <div className='why-item-icon'>
                    <BiHome />
                </div>
                <div className='why-item-text'>
                    <h3>All In One Place</h3>
                    <p>Hair, nails, pedicure and more under one roof</p>
                </div>
            </div>

            <div className='why-item'>
                <div className='why-item-icon'>
                    <BsEmojiSmile />
                </div>
                <div className='why-item-text'>
                    <h3>Customer First</h3>
                    <p>Your satisfaction is our priority always</p>
                </div>
            </div>
        </div>
    </div>
            </div>

          
            <div
                className='home-cta'
                data-aos='zoom-in'
            >
                <h2>Ready To Look <span>Amazing?</span></h2>
                <p>
                    Book your appointment today and experience
                    beauty with class at Miz Jays
                </p>
                <a
                    href='https://wa.me/233559912316?text=Hi Miz Jays! I would like to book an appointment'
                    target='_blank'
                    rel='noreferrer'
                    className='btn-primary'
                >
                    Book Now On WhatsApp
                </a>
            </div>

        </div>
    )
}

export default Home