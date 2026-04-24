const Portfolio = require('../models/Portfolio')

const getAllPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.find()
        res.json(portfolio)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.create(req.body)
        res.status(201).json(portfolio)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const deletePortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findById(req.params.id)
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio item not found' })
        }
        await portfolio.deleteOne()
        res.json({ message: 'Portfolio item removed' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getAllPortfolio, addPortfolio, deletePortfolio }