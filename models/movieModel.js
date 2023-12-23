const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    imagepath:{
      type:String,
      required:true,
    },
    title:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        minlength:2,
        maxlength:120,
        required:true,
    },
    genre:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Genre",
        }
    ]
})
const movie = mongoose.model("Movie",userSchema)
module.exports = movie;