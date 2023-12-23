const express = require("express")
const { getmovie, getpagination, getgenre, getsearch, getfilter, putgenre, deletegenre, deletemovie } = require("../controller/movieController")
const cloudinary = require("cloudinary").v2
const multer = require("multer")
const movie = require("../models/movieModel")
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const extension = file.originalname.split(".").pop();
        cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
      },
  })
  
  
  const upload = multer({ storage: storage ,
     limits: {
    fileSize: 1024 * 1024 * 5, 
  },
})

router.get("/",getmovie)
router.get("/genre/:movieid",getgenre)
router.get("/pagination",getpagination)
router.get("/search",getsearch)
router.get("/filter",getfilter)
router.post("/",upload.single("upload_file"),async(req,res)=>{
    try {
        const {description,genre,rating,title,_id} = req.body
        let response 
        const isexist = await movie.findOne({title:req.body.title})
        let idexist 
        if(_id !== ''){
          idexist=await movie.findById(_id)
        }else{
          idexist=null
        }
      
       if(title === ""){
          return res.status(400).json("title is required")
        }else if(description?.length > 120 || description?.length === 0) {
          return res.status(400).json("description is required less than 120 letters")
        }else if(rating < 1){
          return res.status(400).json("rating is required")
        }else if(JSON.parse(genre).length > 3){
          return res.status(400).json("more than 3 genre or didn't selected")
        }else if(!isexist && !idexist){
           if( req.file === null){
          return res.status(400).json("image is required")
        }else if(req.file) {
            if (!req.file || typeof req.file !== "object") {
                return res.status(400).json("Invalid file upload");
              }
              const file = req.file.path
                response =  await cloudinary.uploader.upload(file,{folder:"tmp"})
                      let genres = await JSON.parse(genre)
                       await movie.create({
                         imagepath:response.url,
                         title:req.body.title,
                         rating:req.body.rating,
                         description:req.body.description,
                         genre:genres,
                      },
                      )   
                      return res.status(200).json("movie uploaded")  
                    }
        }else if(idexist){
           if( req.file){
            const file = req.file.filename
            response =  await cloudinary.uploader.upload(file,{folder:"tmp"})
                  // console.log(response,"====response");
                  let genres = await JSON.parse(genre)
                   await movie.findByIdAndUpdate(_id,{
                     imagepath:response.url,
                     title:req.body.title,
                     rating:req.body.rating,
                     description:req.body.description,
                     genre:genres,
                  },
                  )   
                  return res.status(200).json("movie updated")  
        }
          let genres = await JSON.parse(genre)
            await movie.findByIdAndUpdate(_id,{title:title,description:description,genre:genres,rating:rating})
            console.log("2");
            return res.status(200).json("movie updated")
        }else{
          return res.status(400).json("title is already exist")
        } 
       
            
    } catch (error) {
        res.status(400).json(error.message) 
        console.log(error)
    }
})
router.put("/genre/:movieid",putgenre)
router.delete("/genre/:movieid",deletegenre)
router.delete("/delete/:movieid",deletemovie)
module.exports = router