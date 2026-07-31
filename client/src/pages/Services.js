import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getApiUrl, getAssetUrl } from '../config/api'
import './Services.css'

function Services() {
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(getApiUrl('/api/services'))
                setServices(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    if (loading) {
        return (
            <div className='loading'>
                <p>Loading services...</p>
            </div>
        )
    }

    return (
        <div className='services'>
            <div className='services-header'>
                <div className='section-divider'></div>
                <h2>Our <span>Services</span></h2>
                <p>Professional beauty services delivered with precision and care</p>
            </div>

            <div className='services-grid'>
                {services.map((service) => {
                 
                    const imageUrl = getAssetUrl(service.image)
                    return (
                    <div className='service-card' key={service._id}>
                        <div className='service-card-img'>
                            {service.image ? (
                                <img src={imageUrl} alt={service.name} />
                            ) : (
                                <div className='service-card-placeholder'></div>
                            )}
                        </div>
                        <div className='service-card-body'>
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
                    )
                })}
            </div>
        </div>
    )
}

export default Services