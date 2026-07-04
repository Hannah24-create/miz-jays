const express = require('express')
const router = express.Router()
const {
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
} = require('../controllers/productController')
const protect = require('../middleware/authMiddleware')

router.get('/', getAllProducts)
router.get('/category/:category', getProductsByCategory)
router.get('/:id', getSingleProduct)
router.post('/', protect, createProduct)
router.put('/:id', protect, updateProduct)
router.delete('/:id', protect, deleteProduct)

module.exports = router