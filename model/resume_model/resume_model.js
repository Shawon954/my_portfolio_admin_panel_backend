const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  
    url: {
    type: String,
    required: true,
    trim: true,
    },

    cloudinary_id: {
    type: String,
    trim: true,
    }
},{
    timestamps: true,
});
const ResumeModel = mongoose.model('Resume', ResumeSchema);
module.exports = ResumeModel;