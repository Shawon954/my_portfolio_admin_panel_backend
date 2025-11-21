const mongoose = require('mongoose');

const ownerImageSchema = new mongoose.Schema({

    ownerimage:{
        type: String,
        trim: true,
    },

    cloudinary_id:{
        type: String,
        trim: true,
    }
},{
    timestamps: true
});

const OwnerImageModel = mongoose.model('OwnerImage', ownerImageSchema);

module.exports = OwnerImageModel;   
