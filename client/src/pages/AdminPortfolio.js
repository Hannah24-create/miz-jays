import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './Admin.css'

function AdminPortfolio() {
    const navigate = useNavigate()
    const [portfolio, setPortfolio] = useState([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({
        mediaUrl: '',
        mediaType: 'video',
        section: 'work'
    })

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin')
        }
        fetchPortfolio()
    }, [])

    const fetchPortfolio = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/portfolio')
            setPortfolio(response.data)
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
            await axios.post(
                'http://localhost:5000/api/portfolio',
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            setShowForm(false)
            setFormData({
                mediaUrl: '',
                mediaType: 'video',
                section: 'work'
            })
            fetchPortfolio()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                const token = getToken()
                await axios.delete(
                    `http://localhost:5000/api/portfolio/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                fetchPortfolio()
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className='admin-dashboard'>

            <div className='admin-sidebar'>
                <div className='admin-sidebar-header'>
                    <h2>Miz <span>Jays</span></h2>
                    <p>Admin Panel</p>
                </div>
                <nav className='admin-nav'>
                    <Link to='/admin/dashboard' className='admin-nav-link'>
                        Dashboard
                    </Link>
                    <Link to='/admin/services' className='admin-nav-link'>
                        Services
                    </Link>
                    <Link to='/admin/products' className='admin-nav-link'>
                        Products
                    </Link>
                    <Link to='/admin/portfolio' className='admin-nav-link active'>
                        Portfolio
                    </Link>
                </nav>
                <button
                    className='admin-logout-btn'
                    onClick={() => {
                        localStorage.removeItem('adminToken')
                        navigate('/admin')
                    }}
                >
                    Logout
                </button>
            </div>

            <div className='admin-main'>
                <div className='admin-main-header'>
                    <h1>Portfolio</h1>
                    <button
                        className='admin-add-btn'
                        onClick={() => setShowForm(true)}
                    >
                        + Add Media
                    </button>
                </div>

                {showForm && (
                    <div className='admin-form-container'>
                        <h2>Add New Portfolio Item</h2>
                        <form onSubmit={handleSubmit} className='admin-form'>
                            <div className='admin-form-group'>
                                <label>Media URL (Cloudinary)</label>
                                <input
                                    type='text'
                                    name='mediaUrl'
                                    value={formData.mediaUrl}
                                    onChange={handleInputChange}
                                    placeholder='https://res.cloudinary.com/...'
                                    required
                                />
                            </div>
                            <div className='admin-form-group'>
                                <label>Media Type</label>
                                <select
                                    name='mediaType'
                                    value={formData.mediaType}
                                    onChange={handleInputChange}
                                >
                                    <option value='video'>Video</option>
                                    <option value='image'>Image</option>
                                </select>
                            </div>
                            <div className='admin-form-group'>
                                <label>Section</label>
                                <select
                                    name='section'
                                    value={formData.section}
                                    onChange={handleInputChange}
                                >
                                    <option value='work'>Our Work</option>
                                    <option value='space'>Our Space</option>
                                </select>
                            </div>
                            <div className='admin-form-buttons'>
                                <button type='submit' className='admin-save-btn'>
                                    Save Item
                                </button>
                                <button
                                    type='button'
                                    className='admin-cancel-btn'
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {loading ? (
                    <div className='admin-loading'>Loading portfolio...</div>
                ) : (
                    <div className='admin-portfolio-grid'>
                        {portfolio.map((item) => (
                            <div className='admin-portfolio-item' key={item._id}>
                                {item.mediaType === 'video' ? (
                                    <video
                                        src={item.mediaUrl}
                                        muted
                                        className='admin-portfolio-media'
                                    />
                                ) : (
                                    <img
                                        src={item.mediaUrl}
                                        alt='Portfolio'
                                        className='admin-portfolio-media'
                                    />
                                )}
                                <div className='admin-portfolio-info'>
                                    <span className='admin-portfolio-type'>
                                        {item.mediaType}
                                    </span>
                                    <button
                                        className='admin-delete-btn'
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminPortfolio