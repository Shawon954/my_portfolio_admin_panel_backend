const mongoose = require('mongoose');   


const contactSchema = new mongoose.Schema({
    title: { type: String, required: true,trim: true },
    contact_image: { type: String, required: true, trim: true },
    cloudinary_id: { type: String, trim: true },
},{
    timestamps: true
});

const ContactModel = mongoose.model('Contact', contactSchema);

module.exports = ContactModel;