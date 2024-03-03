var express = require('express');
const authController  = require('../controllers/auth.controller');
var router = express.Router();

// router.get('/', userController.getAllUsers)
router.post('/', authController.authControllerLogin)
// router.put('/:id', userController.editUser)
// router.delete('/:id', userController.deleteUser)
// router.get('/:id', userController.getDetailUser)

module.exports = router;