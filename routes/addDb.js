const router = require('express').Router()
const AddDatabaseController = require('../controllers/AddDatabaseController')

router.get('/', AddDatabaseController.addDatabase)

module.exports = router