const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: {
    type: String, 
    trim: true,
    required: true,
 },
  email: {
    type: String, 
    trim: true,
    required: true,
    unique: true,
    
},
  password: {
     type: String,  
        trim: true,
        required: true,
    minlength: 6,

},
},{
    timestamps: true,
});

const Login = mongoose.model('Login', loginSchema);

module.exports = Login;