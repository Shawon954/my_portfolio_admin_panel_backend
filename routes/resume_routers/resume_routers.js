const express = require('express');
const ResumeRoutes = express.Router();

const ResumeController = require('../../controller/resume_controller/resume_controller.js');
const uploadPDF = require('../../config/pdf_multer/pdf_multer.js');


// Update Resume Route
ResumeRoutes.put("/:id", uploadPDF.single("resume"), ResumeController.updateResume);
module.exports = ResumeRoutes;

