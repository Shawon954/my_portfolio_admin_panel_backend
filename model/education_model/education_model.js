const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    
     certificate_image: {
        type: String,
        required: true, 
        trim: true,
    },

    institution: {
        type: String,
        required: true, 
        trim: true,
    },

    department: {
        type: String,
        required: true, 
        trim: true,
    },

    yearOfPassing: {
        type: String,
        required: true, 
        trim: true,
    },

    cgpa: {
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
});

const EducationModel = mongoose.model('Education', EducationSchema);

module.exports = EducationModel;