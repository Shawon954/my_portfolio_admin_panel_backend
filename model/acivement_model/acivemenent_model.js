const mongoose = require('mongoose');

const AcivementSchema = new mongoose.Schema({
    title: {
        type: String,   
        required: true,
            trim: true
    },
    acivement_image: {
        type: String,
        required: true,
        trim: true
    },

    cloudinary_id: {
        type: String,
    
        trim: true
    }
});

const AcivementModel = mongoose.model('Acivement', AcivementSchema);

module.exports = AcivementModel;