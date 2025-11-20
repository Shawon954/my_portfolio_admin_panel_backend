const ResumeModel = require("../../model/resume_model/resume_model");
const cloudinary = require("../../config/cloudinary/cloudinary");

class ResumeController {

  static updateResume = async (req, res) => {
    try {
      const id = req.params.id;

      if (!req.file) {
        return res.status(400).json({
          status: 400,
          message: "Please upload a PDF file"
        });
      }

      // Find existing resume
      const resumeFind = await ResumeModel.findById(id);

      if (!resumeFind) {
        return res.status(404).json({
          status: 404,
          message: "Resume Not Found"
        });
      }

      // Delete old PDF from cloudinary
      if (resumeFind.cloudinary_id) {
        await cloudinary.uploader.destroy(resumeFind.cloudinary_id, {
          resource_type: "raw"
        });
      }

      // Upload new PDF to cloudinary
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        folder: "resume",
        resource_type: "raw"
      });

      const updatedResume = {
        url: uploaded.secure_url,
        cloudinary_id: uploaded.public_id,
      };

      const updated = await ResumeModel.findByIdAndUpdate(id, updatedResume, {
        new: true
      });

      return res.status(200).json({
        status: 200,
        message: "Resume Updated Successfully",
        data: updated
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Server Error",
        error: error.message
      });
    }
  };

}

module.exports = ResumeController;
