const express = require('express');
const EmailController = require('../../controller/nodemailer_controller/nodemailer_controller');
const EmailRoutes = express.Router();

EmailRoutes.post('/',EmailController.createEmail);

module.exports = EmailRoutes;