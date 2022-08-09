const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/UsersController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/profile', userController.loginRequired, userController.profile);
router.post('/sendemail', userController.sendemail);

module.exports = router;
