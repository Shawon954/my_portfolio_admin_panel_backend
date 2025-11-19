const express = require('express');
const SocialRoutes = express.Router();
const multer = require('../../config/multer/multer.js');
const SocialContactController = require('../../controller/social_contact/social_contact.js');

// Get Social Contacts
SocialRoutes.get('/',SocialContactController.getSocialContacts);

// Create Social Contact
SocialRoutes.post('/',multer.single('socialIcon'),SocialContactController.createSocialContact);
SocialRoutes.delete('/:id',SocialContactController.deleteSocialContact);

module.exports = SocialRoutes;