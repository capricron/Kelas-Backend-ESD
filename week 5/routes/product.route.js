var express = require('express');
var router = express.Router();

const productController = require('../controllers/product.controller')

router.get('/', productController.getAllProducts)
router.post('/', productController.createProduct)
router.put('/:id', productController.editProduct)
router.delete('/:id', productController.deleteProduct)
router.get('/:id', productController.getDetailProduct)

module.exports = router;