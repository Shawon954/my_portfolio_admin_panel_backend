const ResumeModel = require("../../model/resume_model/resume_model.js");
const cloudinary = require("../../config/cloudinary/cloudinary.js");
const fs = require("fs");


class ResumeController {

  static getResume = async(req,res)=>{
 try {
        const resume = await ResumeModel.find();
        return res.status(200).json({ status:200,message: 'Resume records fetched successfully', data: resume });
    } catch (error) {
        return res.status(500).json({ status:500,message: 'Internal Server Error', error: error.message });
    }
  };

  static updateResume = async (req, res) => {
    try {
      const id = req.params.id;

      if (!req.file) return res.status(400).json({ message: "Upload a PDF file" });

      const resume = await ResumeModel.findById(id);
      if (!resume) return res.status(404).json({ message: "Resume not found" });

      // Delete old file from Cloudinary
      if (resume.cloudinary_id) await cloudinary.uploader.destroy(resume.cloudinary_id);

      // Upload new PDF
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: "resume"
      });

      // Delete local temp file
      fs.unlinkSync(req.file.path);

      // Update DB
      const updated = await ResumeModel.findByIdAndUpdate(id, {
        url: uploaded.secure_url,
        cloudinary_id: uploaded.public_id
      }, { new: true });

      res.status(200).json({ message: "Resume updated successfully", data: updated });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };



};


module.exports = ResumeController;


