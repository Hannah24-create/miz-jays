const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const login = async (req, res) => {
    try {
        const { password } = req.body

        const isMatch = await bcrypt.compare(
            password,
            process.env.ADMIN_PASSWORD
        )

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' })
        }

        const token = jwt.sign(
            { admin: true },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )

        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { login }