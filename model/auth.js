const mongoose = require("mongoose")
var jwt = require('jsonwebtoken');

const AuthSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{  
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
})
AuthSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id:this._id, isAdmin: this.isAdmin }, 'izzatillo', { expiresIn: '365d' });
    return token
}

const Auth = mongoose.model("Auth", AuthSchema)


exports.Auth = Auth