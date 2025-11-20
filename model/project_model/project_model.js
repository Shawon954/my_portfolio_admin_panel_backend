const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,       
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
         trim: true,
    },

    project_img:{
        type: String,
        required: true,
         trim: true,
    },

    cloudinary_id:{
        type: String,
      
         trim: true,
    },
},{
    timestamps: true,
}
);

const ProjectModel = mongoose.model('Project', projectSchema);

module.exports = ProjectModel;