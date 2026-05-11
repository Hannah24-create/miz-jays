const express = require('express')
const router = express.Router()
const { 
    getAllServices, 
    getSingleService, 
    createService 
} = require('../controllers/serviceController')

router.get('/', getAllServices)
router.get('/:id', getSingleService)
router.post('/', createService)

module.exports = router