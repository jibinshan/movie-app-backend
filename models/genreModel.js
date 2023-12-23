const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    title:{
        type:String,
    },
})
const genre = mongoose.model("Genre",userSchema)
module.exports = genre;