const mongoose = require('mongoose');

const SkillsSchema = new mongoose.Schema({
  skillname: {
    type: String,   
    required: true,
    trim: true,
    },
    skillimage: {
      type: String,
      required: true,
      trim: true,
    },

    cloudinary_id:{
        type: String,
        required: true,
        trim: true,
    },

},{
    timestamps: true,
});

const SkillsModel = mongoose.model('Skills', SkillsSchema);

module.exports = SkillsModel;