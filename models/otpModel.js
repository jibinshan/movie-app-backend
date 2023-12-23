const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
userid:{
    type:String
},
otp:{
    type:String
},
email:{
type:String,
},
created:Date,
expire:Date,

})

const otpModel = mongoose.model("otpModel",userSchema)
module.exports = otpModel