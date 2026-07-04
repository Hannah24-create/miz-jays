const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')
const connectedDB = require('./config/db')
const serviceRoutes = require('./routes/serviceRoutes')
const productRoutes = require('./routes/productRoutes')
const portfolioRoutes = require('./routes/portfolioRoutes')
const authRoutes = require('./routes/authRoutes')




dotenv.config()

connectedDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')))


const PORT = process.env.PORT || 5000

app.use('/api/services', serviceRoutes)
app.use('/api/products', productRoutes)
app.use('/api/portfolio', portfolioRoutes)
app.use('/api/auth', authRoutes)


app.get('/', (req, res) => {
    res.send('Miz jays Server is running.....')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



