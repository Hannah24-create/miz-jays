import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { getApiUrl, getAssetUrl } from '../config/api'
import './ServiceDetail.css'

function ServiceDetail() {
    const { id } = useParams()
    console.log('ID from URL:', id)
    const [service, setService] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(getApiUrl(`/api/services/${id}`))
                console.log(response.data)
                setService(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchService()
    }, [id])

    if (loading) {
        return (
            <div className='loading'>
                <p>Loading service...</p>
            </div>
        )
    }

    if (!service) {
        return (
            <div className='loading'>
                <p>Service not found</p>
            </div>
        )
    }

    return (
        <div className='service-detail'>

            <div className='service-detail-container'>

                <div className='service-detail-img'>
                    {service.image ? (
                        <img 
                            src={getAssetUrl(service.image)}
                            alt={service.name} 
                        />
                    ) : (
                        <div className='service-detail-placeholder'></div>
                    )}
                </div>

                <div className='service-detail-info'>

                    <p className='service-detail-category'>
                        {service.category}
                    </p>

                    <h1 className='service-detail-name'>
                        {service.name}
                    </h1>

                    <p className='service-detail-price'>
                        GH₵ {service.price}
                    </p>

                    <p className='service-detail-description'>
                        {service.description}
                    </p>

                    <a
                        href={`https://wa.me/233559912316?text=Hi Miz Jays! I would like to book a ${service.name} service 😊`}
                        target='_blank'
                        rel='noreferrer'
                        className='btn-primary'
                    >
                        Book This Service
                    </a>

                    <Link to='/services' className='back-link'>
                        ← Back to Services
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ServiceDetail