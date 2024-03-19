var express = require('express');
var router = express.Router();

const productController = require('../controllers/product.controller');
const { auth } = require('../middleware/index.middleware');

router.get('/', productController.getAllProducts)
router.post('/', productController.createProduct)
router.put('/:id', auth , productController.editProduct)
router.delete('/:id', auth , productController.deleteProduct)
router.get('/:id', productController.getDetailProduct)

module.exports = router;