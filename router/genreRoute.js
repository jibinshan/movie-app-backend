const express = require("express")
const { genredelete, genrepost, genreget } = require("../controller/genreController")
const router = express.Router()

router.get("/",genreget)
router.post("/",genrepost)
// router.put("/",async(req,res)=>{
//     try {
//         const {_id} = req.body
//         const isexist = await genre.findById(_id)
//         console.log(isexist,"==isexi");
//         if (isexist){
            
//             await genre.findByIdAndUpdate(_id)
//             const genres = await genre.find() 
//             console.log(genres,"==genreupdate");
//             return res.status(200).json(genres)
//         }
//         return res.status(400).json("can't find that genre")
//     } catch (error) {
//           console.log(error.message,"====genre/get");
//           res.status(400).json(error.message)
//     }
// })

router.delete("/",genredelete)


module.exports = router