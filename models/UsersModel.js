const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:[true,'Please enter username'],
        unique:[true, 'Username already exists'],
        
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        // validate: {
        //     validator: function (value) {
        //       // Minimum password length should be 8 characters
        //       return value.length >= 8;
        //     },
        //     message: 'Password must be at least 8 characters long.',
        //   },

    },
    email:{
        type:String,
        required:[true,'Please enter email'],
        unique:[true, 'Email already exists']
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

})

const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel