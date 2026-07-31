import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../pages/Admin.css'

function AdminLayout({ activePage, title, subtitle, children }) {
    const navigate = useNavigate()

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
                    <Link to='/admin/dashboard' className={`admin-nav-link ${activePage === 'dashboard' ? 'active' : ''}`}>
                        Dashboard
                    </Link>
                    <Link to='/admin/services' className={`admin-nav-link ${activePage === 'services' ? 'active' : ''}`}>
                        Services
                    </Link>
                    <Link to='/admin/products' className={`admin-nav-link ${activePage === 'products' ? 'active' : ''}`}>
                        Products
                    </Link>
                    <Link to='/admin/portfolio' className={`admin-nav-link ${activePage === 'portfolio' ? 'active' : ''}`}>
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
                    <div>
                        <h1>{title}</h1>
                        {subtitle && <p>{subtitle}</p>}
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}

export default AdminLayout
