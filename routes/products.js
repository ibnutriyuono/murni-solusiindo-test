const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getProducts)
router.get('/categories/:id', ProductController.getProductByCategory)

module.exports = router