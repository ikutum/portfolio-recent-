const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
const userSchema =new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true,
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        lowercase:true,
        validate:[isEmail, 'please enter valid email'],
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minlength:[8, 'password should be minimum 8 characters'],
    },
    age:{
        type: Number,
        required: true,
    },
});

//hashed password




const user = mongoose.model('user',userSchema);
 
module.exports =user;
//console.log(user);