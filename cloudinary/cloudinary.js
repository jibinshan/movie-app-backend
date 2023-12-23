const cloudinary = require("cloudinary").v2
const fileUpload = require("express-fileupload")
const express = require("express")
const app = express()
app.use(fileUpload({
    useTempFiles:true,
}))
cloudinary.config({ 
    cloud_name:  "dqeqpx2dy",
    api_key: "766584237516655",
    api_secret:"FCNSM5QAuwHRrY92I7egQCNvswQ",
  });

const cloudinaryware = (req,res,next)=>{
    req.cloudinary = cloudinary
    next()
}

module.exports = cloudinaryware;
