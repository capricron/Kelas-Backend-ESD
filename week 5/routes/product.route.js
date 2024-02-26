var express = require('express');
var router = express.Router();

const productController = require('../controllers/product.controller')

router.get('/', productController.getAllProducts)
router.post('/', productController.createProduct)
// router.get('/:id', productController.getProducts)

module.exports = router;