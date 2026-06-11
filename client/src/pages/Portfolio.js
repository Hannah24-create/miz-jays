import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Portfolio.css'

function Portfolio() {
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/portfolio')
                setVideos(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchVideos()
    }, [])

    return (
        <div className='portfolio'>

            <div className='portfolio-header' data-aos='fade-up'>
                <div className='section-divider'></div>
                <h2>Our <span>Work</span></h2>
                <p>Watch our skilled team in action</p>
            </div>

            {loading ? (
                <div className='loading'>
                    <p>Loading...</p>
                </div>
            ) : (
                <div className='portfolio-grid'>
                    {videos.map((video, index) => (
                        <div
                            className='portfolio-item'
                            key={video._id}
                            data-aos='fade-up'
                            data-aos-delay={index * 150}
                        >
                            {video.mediaType === 'video' ? (
                                <video
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                >
                                    <source src={video.mediaUrl} type='video/mp4' />
                                </video>
                            ) : (
                                <img
                                    src={video.mediaUrl}
                                    alt='Miz Jays'
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default Portfolio