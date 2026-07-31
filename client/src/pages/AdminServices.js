import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getApiUrl } from '../config/api'
import AdminLayout from '../components/AdminLayout'
import './Admin.css'

function AdminServices() {
    const navigate = useNavigate()
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingService, setEditingService] = useState(null)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: ''
    })

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin')
        }
        fetchServices()
    }, [navigate])

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

    const getToken = () => {
        return localStorage.getItem('adminToken')
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const token = getToken()
            const headers = { Authorization: `Bearer ${token}` }

            if (editingService) {
                await axios.put(
                    getApiUrl(`/api/services/${editingService._id}`),
                    formData,
                    { headers }
                )
            } else {
                await axios.post(
                    getApiUrl('/api/services'),
                    formData,
                    { headers }
                )
            }

            setShowForm(false)
            setEditingService(null)
            setFormData({
                name: '',
                description: '',
                price: '',
                category: '',
                image: ''
            })
            fetchServices()
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (service) => {
        setEditingService(service)
        setFormData({
            name: service.name,
            description: service.description,
            price: service.price,
            category: service.category,
            image: service.image || ''
        })
        setShowForm(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                const token = getToken()
                await axios.delete(
                    getApiUrl(`/api/services/${id}`),
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                fetchServices()
            } catch (error) {
                console.log(error)
            }
        }
    }

    const handleCancel = () => {
        setShowForm(false)
        setEditingService(null)
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            image: ''
        })
    }

    return (
        <AdminLayout activePage='services' title='Services' subtitle='Manage service offerings from one place'>
            <div className='admin-main-header'>
                <div />
                <button
                    className='admin-add-btn'
                    onClick={() => setShowForm(true)}
                >
                    + Add Service
                </button>
            </div>

            {showForm && (
                <div className='admin-form-container'>
                    <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
                    <form onSubmit={handleSubmit} className='admin-form'>
                        <div className='admin-form-group'>
                            <label>Service Name</label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder='e.g. Hair Styling'
                                required
                            />
                        </div>
                        <div className='admin-form-group'>
                            <label>Description</label>
                            <textarea
                                name='description'
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder='Describe the service...'
                                required
                            />
                        </div>
                        <div className='admin-form-group'>
                            <label>Price (GH₵)</label>
                            <input
                                type='number'
                                name='price'
                                value={formData.price}
                                onChange={handleInputChange}
                                placeholder='e.g. 50'
                                required
                            />
                        </div>
                        <div className='admin-form-group'>
                            <label>Category</label>
                            <input
                                type='text'
                                name='category'
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder='e.g. Hair'
                                required
                            />
                        </div>
                        <div className='admin-form-group'>
                            <label>Image URL (Cloudinary)</label>
                            <input
                                type='text'
                                name='image'
                                value={formData.image}
                                onChange={handleInputChange}
                                placeholder='https://res.cloudinary.com/...'
                            />
                        </div>
                        <div className='admin-form-buttons'>
                            <button type='submit' className='admin-save-btn'>
                                {editingService ? 'Update Service' : 'Save Service'}
                            </button>
                            <button
                                type='button'
                                className='admin-cancel-btn'
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className='admin-loading'>Loading services...</div>
            ) : (
                <div className='admin-table-container'>
                    <table className='admin-table'>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map((service) => (
                                <tr key={service._id}>
                                    <td>
                                        {service.image ? (
                                            <img
                                                src={service.image}
                                                alt={service.name}
                                                    className='admin-table-img'
                                                />
                                            ) : (
                                                <div className='admin-table-placeholder'></div>
                                            )}
                                        </td>
                                        <td>{service.name}</td>
                                        <td>{service.category}</td>
                                        <td>GH₵ {service.price}</td>
                                        <td>
                                            <button
                                                className='admin-edit-btn'
                                                onClick={() => handleEdit(service)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='admin-delete-btn'
                                                onClick={() => handleDelete(service._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
        </AdminLayout>
    )
}

export default AdminServices