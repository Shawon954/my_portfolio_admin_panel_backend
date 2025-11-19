
const mongoose = require('mongoose');

const SocialContactSchema = new mongoose.Schema({

   
    link:{  
        type:String,
        required:true,
        trim:true
    },
   
    socialIcon:{  
        type:String,
        required:true,
        trim:true
    },

    cloudinary_id:{  
        type:String,   
        trim:true
    }

},{ timestamps: true }

);

const SocialContactModel = mongoose.model('SocialContact',SocialContactSchema);

module.exports = SocialContactModel;