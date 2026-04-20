const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectedDB = require('./config/db')
const serviceRoutes = require('./routes/serviceRoutes')

dotenv.config()

connectedDB()

const app = express()

app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 5000
app.use('/api/services', serviceRoutes)


app.get('/', (req, res) => {
    res.send('Miz jays Server is running.....')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})



