const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
    },
    phone:{
        type:Number
    },
    email:{
       type:String,
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    password:{
        type:String,
    },
    movie:[
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:"Movie"
        },
    ],
},
{timestamps:true}
)
const user = mongoose.model("User",userSchema)
module.exports = user;