const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')
const path = require('path')

const failedAttempts = new Map()
const MAX_FAILED_ATTEMPTS = 3
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000

const getClientKey = (req) => req.ip || req.headers['x-forwarded-for'] || 'unknown'
const getEnvPath = () => path.resolve(__dirname, '..', '.env')
const getEnvValues = () => {
    const envPath = getEnvPath()

    if (!fs.existsSync(envPath)) {
        return {}
    }

    return dotenv.parse(fs.readFileSync(envPath))
}
const getConfiguredPassword = () => {
    const envValues = getEnvValues()
    return (envValues.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || '').trim()
}
const getJwtSecret = () => {
    const envValues = getEnvValues()
    return envValues.JWT_SECRET || process.env.JWT_SECRET
}
const getResetCode = () => {
    const envValues = getEnvValues()
    return (envValues.ADMIN_RESET_CODE || process.env.ADMIN_RESET_CODE || '').trim()
}

const updateEnvValues = (newValues) => {
    const envPath = getEnvPath()
    const envValues = getEnvValues()
    const mergedValues = { ...envValues, ...newValues }
    const envFileContents = Object.entries(mergedValues)
        .map(([key, value]) => `${key}=${String(value).replace(/\n/g, '\\n')}`)
        .join('\n') + '\n'

    fs.writeFileSync(envPath, envFileContents, 'utf8')
    return mergedValues
}

const login = async (req, res) => {
    try {
        const { password } = req.body
        const submittedPassword = typeof password === 'string' ? password.trim() : ''
        const configuredPassword = getConfiguredPassword()
        const clientKey = getClientKey(req)

        if (!configuredPassword) {
            return res.status(500).json({ message: 'Admin password is not configured' })
        }

        const currentAttempt = failedAttempts.get(clientKey) || { count: 0, lockedUntil: 0 }

        if (Date.now() < currentAttempt.lockedUntil) {
            return res.status(403).json({
                message: 'Account temporarily locked due to too many failed attempts. Please try again later.'
            })
        }

        if (Date.now() - currentAttempt.lockedUntil > LOCKOUT_WINDOW_MS && currentAttempt.count > 0) {
            failedAttempts.delete(clientKey)
        }

        let isMatch = false

        if (configuredPassword.startsWith('$2')) {
            isMatch = await bcrypt.compare(submittedPassword, configuredPassword)
        } else {
            isMatch = submittedPassword === configuredPassword
        }

        if (!isMatch) {
            const nextCount = currentAttempt.count + 1
            failedAttempts.set(clientKey, {
                count: nextCount,
                lockedUntil: nextCount >= MAX_FAILED_ATTEMPTS ? Date.now() + LOCKOUT_WINDOW_MS : 0
            })

            if (nextCount >= MAX_FAILED_ATTEMPTS) {
                return res.status(403).json({
                    message: 'Account temporarily locked due to too many failed attempts. Please try again later.'
                })
            }

            return res.status(401).json({ message: 'Invalid password' })
        }

        failedAttempts.delete(clientKey)

        const token = jwt.sign(
            { admin: true },
            getJwtSecret(),
            { expiresIn: '1d' }
        )

        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { resetCode, newPassword, confirmPassword } = req.body
        const submittedResetCode = typeof resetCode === 'string' ? resetCode.trim() : ''
        const configuredResetCode = getResetCode()

        if (!configuredResetCode) {
            return res.status(500).json({ message: 'Admin reset code is not configured' })
        }

        if (!submittedResetCode || submittedResetCode !== configuredResetCode) {
            return res.status(401).json({ message: 'Invalid reset code' })
        }

        if (!newPassword || !confirmPassword || newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        updateEnvValues({ ADMIN_PASSWORD: hashedPassword })

        res.json({ message: 'Password reset successfully. Please log in with the new password.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { login, resetPassword }