const mongoose = require('mongoose');

const HomeTitleSchema = new mongoose.Schema({

    title: { type: String, required: true,trim:true   },
    logoText: { type: String, required: true,trim:true  },       
    name: { type: String, required: true,trim:true  },       
    short_description: { type: String, required: true,trim:true  },       

},{
    timestamps: true,
});


const HomeTitleModel = mongoose.model('HomeTitle', HomeTitleSchema);

module.exports = HomeTitleModel;