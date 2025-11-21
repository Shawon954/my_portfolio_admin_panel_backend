
const express = require('express');
const ContactRoutes = express.Router();
const ContactController = require('../../controller/contact_controller/contact_controller.js');
const multer = require('../../config/multer/multer.js');
const authMiddleware = require('../../middelware/auth_middelware.js');



ContactRoutes.post('/',authMiddleware, multer.single('contact_image'), ContactController.createContact);
ContactRoutes.get('/', authMiddleware,ContactController.getContacts);
ContactRoutes.delete('/:id',authMiddleware ,ContactController.deleteContact);

module.exports = ContactRoutes;