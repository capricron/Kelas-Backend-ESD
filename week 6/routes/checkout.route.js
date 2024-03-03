var express = require('express');
const checkoutController = require('../controllers/checkout.controller');
const { tes, auth } = require('../middleware/index.middleware');
var router = express.Router();

// router.get('/', userController.getAllUsers)
router.post('/', auth, checkoutController.checkoutProducController)
// router.put('/:id', userController.editUser)
// router.delete('/:id', userController.deleteUser)
// router.get('/:id', userController.getDetailUser)

module.exports = router;