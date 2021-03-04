const router = require('express').Router()
const ProductController = require('../controllers/ProductController')

router.get('/', ProductController.getProducts)
router.get('/categories/:id', ProductController.getProductByCategory)
router.get('/xml', ProductController.getProductsXML)
router.post('/', ProductController.addProduct)
router.put('/:id', ProductController.editProductById)
router.delete('/:id', ProductController.deleteProductById)
router.get('/csv', ProductController.dataToCsv)

module.exports = router