import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about'>

            <div className='about-container'>

                <div className='about-left'>

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
                        to make you look and feel your absolute best every 
                        single time you walk through our doors.
                    </p>

                    <p>
                        At Miz Jays we believe that beauty is not just about 
                        how you look — it is about how you feel. That is why 
                        we combine skill, passion and a warm welcoming 
                        environment to give you an experience worth coming 
                        back for.
                    </p>

                    <div className='about-stats'>
                        <div className='stat'>
                            <h3>2+</h3>
                            <p>Years Experience</p>
                        </div>
                        <div className='stat'>
                            <h3>200+</h3>
                            <p>Happy Clients</p>
                        </div>
                        <div className='stat'>
                            <h3>8+</h3>
                            <p>Services Offered</p>
                        </div>
                    </div>

                    <a
                        href='https://wa.me/233559912316?text=Hi Miz Jays! I would like to know more about your services 😊'
                        target='_blank'
                        rel='noreferrer'
                        className='btn-primary'
                    >
                        Get In Touch
                    </a>

                </div>

                <div className='about-right'>
                    <div className='about-image-container'>
                        <div className='about-image-inner'>
                            <h2>Miz <span>Jays</span></h2>
                            <p>beauty with class...</p>
                            <div className='about-services-list'>
                                <span>Hair</span>
                                <span>Nails</span>
                                <span>Pedicure</span>
                                <span>Manicure</span>
                                <span>Cuts & More</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default About