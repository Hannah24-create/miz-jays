import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getApiUrl, getClientUrl } from '../config/api'
import AdminLayout from '../components/AdminLayout'
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
                axios.get(getApiUrl('/api/services'), { headers }),
                axios.get(getApiUrl('/api/products'), { headers }),
                axios.get(getApiUrl('/api/portfolio'), { headers })
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

    return (
        <AdminLayout activePage='dashboard' title='Dashboard' subtitle='Welcome back to Miz Jays Admin Panel'>
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
                        href={getClientUrl('/')}
                        target='_blank'
                        rel='noreferrer'
                        className='quick-link-card'
                    >
                        <h3>View Site</h3>
                        <p>See the live website</p>
                    </a>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard