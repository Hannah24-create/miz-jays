const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const path = require('path')
const connectDB = require('./config/db')
const serviceRoutes = require('./routes/serviceRoutes')
const productRoutes = require('./routes/productRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes')
const authRoutes = require('./routes/authRoutes')

dotenv.config()

connectDB()

const app = express()

app.use(helmet())

const allowedOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map(origin => origin.trim())
    .filter(Boolean)

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            callback(null, true)
            return
        }

        callback(new Error('Not allowed by CORS'))
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests — please try again later'
})

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts — please try again later'
})

app.use('/api', limiter)
app.use('/api/auth', authLimiter)

app.use('/api/services', serviceRoutes)
app.use('/api/products', productRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Miz Jays Server is running...')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})