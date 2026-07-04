const express = require('express')
const router = express.Router()
const {
    getAllServices,
    getSingleService,
    createService,
    updateService,
    deleteService
} = require('../controllers/serviceController')
const protect = require('../middleware/authMiddleware')

router.get('/', getAllServices)
router.get('/:id', getSingleService)
router.post('/', protect, createService)
router.put('/:id', protect, updateService)
router.delete('/:id', protect, deleteService)

module.exports = router