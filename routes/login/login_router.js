const express = require('express');
const LoginController = require('../../controller/signup/login_controller.js');
const router = express.Router();    

router.post('/', LoginController.login);

module.exports = router;