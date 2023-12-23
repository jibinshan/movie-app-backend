const genre = require("../models/genreModel")

const genreget = async(req,res)=>{
    try {
        const genreList = await genre.find()
        return res.status(200).json(genreList)
        
    } catch (error) {
          console.log(error,"====genre/get");
          res.status(400).json(error.message)
    }
}

const genrepost = async(req,res)=>{
    try {
        const {title,_id} = req.body
        const isexist = await genre.findOne({title})
        const idexist = await genre.findById(_id)
        console.log(idexist,"====idexis");
        console.log(_id);
        if (!idexist && !isexist) {
            
            await genre.create({
                title:title,
            })
            
            const genreList = await genre.find()
            return res.status(200).json(genreList)
        }else if(idexist){
           await genre.findByIdAndUpdate(_id,{title:title})
           const genreList = await genre.find()
           return res.status(200).json(genreList)
        }else{

            return res.status(400).json("this genre already exist")
        }
        
    } catch (error) {
        console.log(error.message,"===errormessage");
          res.status(400).json(error.message)
    }
}

const genredelete = async(req,res)=>{
    try {
        const {_id} = req.body
        const isexist = await genre.findById(_id)
        if (isexist) {
            
            await genre.findByIdAndDelete(_id)
            const genres = await genre.find() 
            return res.status(200).json(genres)
        }
        return res.status(400).json("can't find that genre")
    } catch (error) {
          res.status(400).json(error.message)
    }
}

module.exports = {genredelete,genreget,genrepost}