const movie = require("../models/movieModel")
const genre = require("../models/genreModel")



 
const getmovie = async(req,res)=>{
    try {
        const MovieList = await movie.find()
        return res.status(200).json(MovieList)
        
    } catch (error) {
          console.log(error,"====movie/get");
          res.status(400).json(error.message)
    }
}
const getgenre = async(req,res)=>{
try {
    const moviefiles = await movie.findById(req.params.movieid)
    .populate("genre")
    res.status(200).json(moviefiles)
} catch (error) {
    res.status(400).json(error)
}
}
const getpagination = async(req,res)=>{
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 4;
    const skip = (page-1)*limit
    const query = {}
    const movies = await movie.find(query)
    .skip(skip)
    .limit(limit)
    .populate("genre")
    .exec();
    
    
    const totalmovies = await movie.countDocuments(query)
    const totalpages = await Math.ceil(totalmovies/limit)

    res.status(200).json({
      result:movies.length,
      total:totalmovies,
      currentpage:page,
      totalpages,
      data:movies,
  })

  } catch (error) {
    res.status(400).json("internal error")
  }
}
const getsearch = async(req,res)=>{
  try {
    const {title} = req.body
    let filteredmovie = []
    if (title) {
      filteredmovie = await movie.filter((movies)=>
      movies.title.toLowerCase().includes(title.toLowerCase())
      )   
    }else{
      filteredmovie = movie
    }
   return res.status(200).json(filteredmovie)
  } catch (error) {
    res.status(400).json(error)
    console.log(error.message);
  }
}
const getfilter = async(req,res)=>{
  try {
    const {genretitle} = req.query
    console.log(req.query);
    console.log(genre,"====");
    const findgenre = await genre.findOne({title:genretitle})
    console.log(findgenre,"===findgenre");
    if (!findgenre) {
       return res.status(400).json("genre not found")
    }
    const filteredmovies = await movie.find({ genre: findgenre._id }).populate("genre")
    console.log(filteredmovies);
    return res.status(200).json(filteredmovies)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const putgenre = async(req,res)=>{
  try {
    const updategenre = await movie.findByIdAndUpdate(req.params.movieid,{
        $push:{
            genre:req.body.genreid
        }
    },
    {new:true})
    res.status(200).json(updategenre)
  } catch (error) {
    res.status(400).json(error)
  }
}
const deletegenre = async(req,res)=>{
    try {
      const updategenre = await movie.findByIdAndUpdate(req.params.movieid,{
          $pull:{
              genre:req.body.genreid
          }
      },
      {new:true})
      res.status(200).json(updategenre)
    } catch (error) {
      res.status(400).json(error)
    }
  }
 const deletemovie = async(req,res)=>{
    try {
       await movie.findByIdAndDelete(req.params.movieid)
       const page = req.query.page || 1;
       const limit = req.query.limit || 4;
       const skip = (page-1)*limit
       const query = {}
       const movies = await movie.find(query)
       .skip(skip)
       .limit(limit)
       .populate("genre")
       .exec();
       const totalmovies = await movie.countDocuments(query)
    const totalpages = await Math.ceil(totalmovies/limit)

    res.status(200).json({
      result:movies.length,
      total:totalmovies,
      currentpage:page,
      totalpages,
      data:movies,
  })
       
    } catch (error) {
      res.status(400).json(error.message)
    }
  }

  module.exports = {getmovie,getgenre,getpagination,getsearch,getfilter,putgenre,deletegenre,deletemovie}