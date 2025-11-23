const express = require('express');
const ResumeRoutes = express.Router();

const ResumeController = require('../../controller/resume_controller/resume_controller.js');
const multer = require('../../config/pdf_multer/pdf_multer.js');


// Update Resume Route
ResumeRoutes.put("/:id", multer.single("resume"), ResumeController.updateResume);
ResumeRoutes.get("/",ResumeController.getResume);
module.exports = ResumeRoutes;

