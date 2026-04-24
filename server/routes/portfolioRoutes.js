const express = require('express')
const router = express.Router()
const {
    getAllPortfolio,
    addPortfolio,
    deletePortfolio
} = require('../controllers/portfolioController')

router.get('/', getAllPortfolio)
router.post('/', addPortfolio)
router.delete('/:id', deletePortfolio)

module.exports = router 