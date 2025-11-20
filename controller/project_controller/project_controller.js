const ProjectModel = require("../../model/project_model/project_model");
const cloudinary = require("../../config/cloudinary/cloudinary");

class ProjectController {
  static createProject = async (req, res) => {
    try {


      const { title, description } = req.body;

      if (!title || !description || !req.file) {
        return res.status(400).json({
          status: 400,
          message: "All fields are required",
        });
      }

      // Check duplicate
      const exists = await ProjectModel.findOne({ title });
      if (exists) {
        return res.status(409).json({
          status: 409,
          message: "Project with this title already exists",
        });
      }

      // Upload image
      const uploadImage = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects_images",
      });

      const newProject = new ProjectModel({
        title,
        description,
        project_img: uploadImage.secure_url,
        cloudinary_id: uploadImage.public_id,
      });

      const saved = await newProject.save();

      return res.status(201).json({
        status: 201,
        message: "Project created successfully",
        data: saved,
      });

    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
}

module.exports = ProjectController;
