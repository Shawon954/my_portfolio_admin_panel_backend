const express = require('express');
const EmailController = require('../../controller/nodemailer_controller/nodemailer_controller.js');
const EmailRoutes = express.Router();

EmailRoutes.post('/',EmailController.createEmail);
EmailRoutes.get('/',EmailController.getEmail);
EmailRoutes.delete('/:id',EmailController.deleteMail);

module.exports = EmailRoutes;