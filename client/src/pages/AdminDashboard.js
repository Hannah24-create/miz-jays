import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './AdminDashboard.css'

function AdminDashboard() {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        services: 0,
        products: 0,
        portfolio: 0
    })

    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin')
        }
        fetchStats()
    }, [navigate])

    const fetchStats = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            const headers = { Authorization: `Bearer ${token}` }

            const [services, products, portfolio] = await Promise.all([
                axios.get('http://localhost:5000/api/services', { headers }),
                axios.get('http://localhost:5000/api/products', { headers }),
                axios.get('http://localhost:5000/api/portfolio', { headers })
            ])

            setStats({
                services: services.data.length,
                products: products.data.length,
                portfolio: portfolio.data.length
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('adminToken')
        navigate('/admin')
    }

    return (
        <div className='admin-dashboard'>

            <div className='admin-sidebar'>
                <div className='admin-sidebar-header'>
                    <h2>Miz <span>Jays</span></h2>
                    <p>Admin Panel</p>
                </div>

                <nav className='admin-nav'>
                    <Link to='/admin/dashboard' className='admin-nav-link active'>
                        Dashboard
                    </Link>
                    <Link to='/admin/services' className='admin-nav-link'>
                        Services
                    </Link>
                    <Link to='/admin/products' className='admin-nav-link'>
                        Products
                    </Link>
                    <Link to='/admin/portfolio' className='admin-nav-link'>
                        Portfolio
                    </Link>
                </nav>

                <button
                    className='admin-logout-btn'
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>

            <div className='admin-main'>
                <div className='admin-main-header'>
                    <h1>Dashboard</h1>
                    <p>Welcome back to Miz Jays Admin Panel</p>
                </div>

                <div className='admin-stats-grid'>
                    <div className='admin-stat-card'>
                        <h3>{stats.services}</h3>
                        <p>Total Services</p>
                        <Link to='/admin/services'>Manage →</Link>
                    </div>
                    <div className='admin-stat-card'>
                        <h3>{stats.products}</h3>
                        <p>Total Products</p>
                        <Link to='/admin/products'>Manage →</Link>
                    </div>
                    <div className='admin-stat-card'>
                        <h3>{stats.portfolio}</h3>
                        <p>Portfolio Items</p>
                        <Link to='/admin/portfolio'>Manage →</Link>
                    </div>
                </div>

                <div className='admin-quick-links'>
                    <h2>Quick Actions</h2>
                    <div className='admin-quick-grid'>
                        <Link to='/admin/services' className='quick-link-card'>
                            <h3>Add Service</h3>
                            <p>Add a new beauty service</p>
                        </Link>
                        <Link to='/admin/products' className='quick-link-card'>
                            <h3>Add Product</h3>
                            <p>Add a new product to shop</p>
                        </Link>
                        <Link to='/admin/portfolio' className='quick-link-card'>
                            <h3>Add Video</h3>
                            <p>Add a new portfolio video</p>
                        </Link>
                        <a
                            href='http://localhost:3000'
                            target='_blank'
                            rel='noreferrer'
                            className='quick-link-card'
                        >
                            <h3>View Site</h3>
                            <p>See the live website</p>
                        </a>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default AdminDashboard