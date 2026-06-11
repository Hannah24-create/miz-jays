const express = require('express')
const router = express.Router()
const { 
    getAllPortfolio,
    getPortfolioBySection,
    addPortfolio, 
    deletePortfolio 
} = require('../controllers/portfolioController')

router.get('/', getAllPortfolio)
router.get('/section/:section', getPortfolioBySection)
router.post('/', addPortfolio)
router.delete('/:id', deletePortfolio)

module.exports = router