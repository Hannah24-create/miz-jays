import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
                'http://localhost:5000/api/auth/login',
                { password }
            )
            localStorage.setItem('adminToken', response.data.token)
            navigate('/admin/dashboard')
        } catch (error) {
            setError('Invalid password — please try again')
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

            </div>
        </div>
    )
}

export default AdminLogin