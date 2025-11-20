const express = require('express');
const EducationRouter = express.Router();
const EducationController = require('../../controller/educatuon_controller/educatuon_controller.js');
const multer = require('../../config/multer/multer.js');
const authMiddleware = require('../../middelware/auth_middelware.js');


EducationRouter.post('/', authMiddleware,multer.single('certificate_image'), EducationController.createEducation);
EducationRouter.get('/',authMiddleware ,EducationController.getEducations);
EducationRouter.put('/:id',authMiddleware ,multer.single('certificate_image'), EducationController.updateEducation);
EducationRouter.delete('/:id',authMiddleware ,EducationController.deleteEducation);

module.exports = EducationRouter;