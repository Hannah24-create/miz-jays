import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { getApiUrl } from '../config/api'
import './AdminForgotPassword.css'

function AdminForgotPassword() {
    const [resetCode, setResetCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage('')
        setError('')

        if (!resetCode.trim() || !newPassword.trim() || !confirmPassword.trim()) {
            setError('All fields are required.')
            return
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.')
            return
        }

        setLoading(true)

        try {
            const response = await axios.post(
                getApiUrl('/api/auth/reset-password'),
                {
                    resetCode: resetCode.trim(),
                    newPassword: newPassword.trim(),
                    confirmPassword: confirmPassword.trim()
                }
            )

            setMessage(response.data.message || 'Password reset successfully.')
            setResetCode('')
            setNewPassword('')
            setConfirmPassword('')
            setLoading(false)

            setTimeout(() => {
                navigate('/admin')
            }, 1800)
        } catch (err) {
            setError(err?.response?.data?.message || 'Unable to reset password.')
            setLoading(false)
        }
    }

    return (
        <div className='admin-login'>
            <div className='admin-login-box'>
                <div className='admin-login-header'>
                    <h1>Forgot <span>Password</span></h1>
                    <p>Admin password reset</p>
                </div>

                {message && (
                    <div className='admin-success'>
                        {message}
                    </div>
                )}

                {error && (
                    <div className='admin-error'>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className='admin-input-group'>
                        <label>Reset Code</label>
                        <input
                            type='text'
                            placeholder='Enter reset code'
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className='admin-input-group'>
                        <label>New Password</label>
                        <input
                            type='password'
                            placeholder='Enter new password'
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className='admin-input-group'>
                        <label>Confirm Password</label>
                        <input
                            type='password'
                            placeholder='Confirm new password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        className='admin-login-btn'
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className='admin-forgot-footer'>
                    <Link to='/admin'>Back to login</Link>
                </div>
            </div>
        </div>
    )
}

export default AdminForgotPassword
