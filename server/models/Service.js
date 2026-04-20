const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Service = mongoose.model('Service', serviceSchema)

module.exports = Service