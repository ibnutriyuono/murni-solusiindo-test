const router = require('express').Router()
const addDb = require('./addDb')
const products = require('./products')

router.use('/add-database', addDb)
router.use('/products', products)

module.exports = router