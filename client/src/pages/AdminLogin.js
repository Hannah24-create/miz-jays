import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { getApiUrl } from '../config/api'
import './AdminLogin.css'

function AdminLogin() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await axios.post(
                getApiUrl('/api/auth/login'),
                { password }
            )
            localStorage.setItem('adminToken', response.data.token)
            navigate('/admin/dashboard')
        } catch (error) {
            const message = error?.response?.data?.message || 'Invalid password — please try again'
            setError(message)
            setLoading(false)
        }
    }

    return (
        <div className='admin-login'>
            <div className='admin-login-box'>

                <div className='admin-login-header'>
                    <h1>Miz <span>Jays</span></h1>
                    <p>Admin Panel</p>
                </div>

                {error && (
                    <div className='admin-error'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className='admin-input-group'>
                        <label>Password</label>
                        <input
                            type='password'
                            placeholder='Enter admin password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='admin-login-btn'
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className='admin-forgot-link'>
                    <Link to='/admin/forgot-password'>Forgot password?</Link>
                </div>

            </div>
        </div>
    )
}

export default AdminLogin