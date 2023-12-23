const express = require("express")
const user = require("../models/userModel")
const { signup, login,changepassword,verifyotp,forgottenpassword, watchlater } = require("../controller/userController")
const router = express.Router()

router.get("/",async(req,res)=>{
    try {
        const userList = await user.findOne({username:req.body.username,password:req.body.password})
        if (userList) {
            
            return res.status(200).json(userList)
        }
        return res.status(300).json("cant find the user")
        
    } catch (error) {
          console.log(error,"====user/get");
          res.status(400).json(error.message)
    }
})
router.get("/watchlater/:userid",async(req,res)=>{
    try {
        const watchlater = await user.findById(req.params.userid)
        .populate({
            path:"movie",
            model:"Movie",
            populate:{
                path:"genre",
                model:"Genre",
            }
        }
        )
        res.status(200).json(watchlater)
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
})
router.post("/signup",signup)
router.post("/login",login)
router.post("/changepassword",changepassword)
router.post("/verifyotp",verifyotp)
router.post("/forgottenpassword",forgottenpassword)
router.put("/watchlater/:userid",watchlater)
router.delete("/watchlater/:userid",async(req,res)=>{
    try {
        console.log(req.params.userid);
        await user.findByIdAndUpdate(
            req.params.userid,
            {
                $pull:{
                    movie:req.body.movieid
                }
                
                
            }, 
            {new:true}
            )
            console.log(req.body.movieid);
            const watchlater = await user.findOne({_id:req.params.userid}).populate("movie")
            console.log(watchlater);
        res.status(200).json(watchlater.movie)
    } catch (error) {
        res.status(400).json(error.message)
        console.log(error);
    }
})
router.delete("/:userid",async(req,res)=>{
    try {
        const deleteuser = await user.findByIdAndDelete(req.params.userid)
        res.status(200).json(deleteuser)
    } catch (error) {
        res.status(400).json(error)
    }
   
})

module.exports = router