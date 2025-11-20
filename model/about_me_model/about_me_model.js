const mongoose = require('mongoose');

const AboutMeSchema = new mongoose.Schema({
    aboutmetitle: {
        type: String, 
        required: true,
        trim: true,
    },});

const AboutMeModel = mongoose.model('AboutMe', AboutMeSchema);

module.exports = AboutMeModel;