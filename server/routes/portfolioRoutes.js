const express = require('express')
const router = express.Router()
const { 
    getAllPortfolio,
    getPortfolioBySection,
    addPortfolio, 
    deletePortfolio 
} = require('../controllers/portfolioController')
const protect = require('../middleware/authMiddleware')

router.get('/', getAllPortfolio)
router.get('/section/:section', getPortfolioBySection)
router.post('/', protect, addPortfolio)
router.delete('/:id', protect, deletePortfolio)

module.exports = router