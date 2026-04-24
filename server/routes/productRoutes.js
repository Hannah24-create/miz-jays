const express = require('express')

const router = express.Router()

const {getAllProducts, getSingleProduct, createProduct, getProductsByCategory} = require('../controllers/productController')


router.get('/', getAllProducts)
router.get('/category/:category', getProductsByCategory)
router.get('/:id', getSingleProduct)
router.post('/', createProduct)

module.exports = router