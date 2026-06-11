const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
    mediaUrl: {
        type: String,
        required: true
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        required: true
    },
    section: {
        type: String,
        enum: ['space', 'work'],
        required: true
    }
}, {
    timestamps: true
})

const Portfolio = mongoose.model('Portfolio', portfolioSchema)

module.exports = Portfolio