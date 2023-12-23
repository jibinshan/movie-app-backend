const user = require("../models/userModel")
const otpModel = require("../models/otpModel")
const { genratepasswordhash, comparepasswordhash } = require("../utils/bcrypt")
const { generatetockens } = require("../utils/jwt")
const nodemailer = require("nodemailer")
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 587,
  secure: false,
    auth:{
        user: "dudequiz9@gmail.com",
        pass: "brvingbdmwfevglg",
    }
})
const signup = async(req,res)=>{
    try {
        const {username,password,phone,email,role} = req.body
        const isExist = await user.findOne({username})
        if (isExist) {
           return res.status(400).json("this username is already exist")
        } 

 


            const hashedpassword = await genratepasswordhash(password)       
            await user.create({username,password:hashedpassword,phone,email,role})
           return  res.status(200).json("account created succesfully")
    }catch (error) {
        console.log(error,"====error");  
       return res.status(400).json(error.message)   
    }
}
const login = async (req,res)=>{
    try {
        const {username,password} = req.body
        const users = await user.findOne({username})
        if (!users) {
            return res.status(400).json("username is invalid")
        }

        const validpassword = await comparepasswordhash(password,users.password)
        if (!validpassword) {
            return res.status(400).json("password is invalid")
        }
         const acesstocken = generatetockens(user._id)
         console.log(acesstocken,"==acess");
        return res.status(200).json({_id:users._id,username:users.username,role:users.role,acesstocken})
    } catch (error) {
        console.log(error);
       return res.status(400).json(error.message)
    }
}
const sendotpverfication = async(result,res)=>{
try {
    const otp = `${Math.floor(1000 + Math.random() * 9000 )}`
    const mailoptions = {
        from:"dudequiz9@gmail.com",
        to:result.email,
        subject:"verify your email",
        html: `<p>Note the OTP <p>
        <p>Enter this OTP <b>${otp}</b> in the app to verify your account</p>`,
    }
    const hashedotp = await genratepasswordhash(otp)
    const newotpdata = otpModel({
     otp:hashedotp,
     email:result.email,
     userid:result._id,
    })
    await newotpdata.save()
    await transporter.sendMail(mailoptions)
   return res.status(200).json("OTP code sended to your email address")
} catch (error) {
    console.log(error);
   return res.status(400).json(error.message)
}
}
const forgottenpassword = async(req,res)=>{
    try {
        const {email} = req.body
        const isExist = await user.findOne({email})
        if (isExist) {
            sendotpverfication(isExist,res)
        }else{
            return res.status(400).json("invalid email")
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message)
    }
}
const verifyotp = async(req,res)=>{
 try {
    const {otp} = req.body
    const isexist = await otpModel.find()
    if (isexist.length === 0) {
        return res.status(400).json("something went wrong")
    }
    const latestotp = isexist[isexist.length - 1]
    const checkotp = await comparepasswordhash(otp,latestotp.otp)
    console.log(checkotp,"==checkotp");
    if (checkotp) {
        return res.status(200).json("verified")
    }else{
        return res.status(400).json("otp not valid")
    }
 } catch (error) {
    console.log(error);
   return res.status(400).json(error.message)    
 }
}
const changepassword = async(req,res)=>{
   try {
    const {email,password} = req.body
    const isexist = await user.findOne({email})
    const isExistotp = await otpModel.findOne({email})
    const hashpassword = await genratepasswordhash(password)
    if (isexist.email === isExistotp.email) {
        if (isexist) {
            await isexist.updateOne({password:hashpassword})
            await otpModel.deleteMany({email:isExistotp.email})
           return res.status(200).json("password succesfuly changed")
        }
    }
   else{
        return res.status(400).json("email is invalid")
    }
   } catch (error) {
    console.log(error);
    return res.status(400).json(error.message)
   }

}
const watchlater = async(req,res)=>{
    try {
      const watchlater =  await user.findByIdAndUpdate(req.params.userid,{
          $push:{
              movie:req.body.movieid
          },
      },
      {new:true},
      )
      console.log(watchlater,"===watchlater");
      return res.status(200).json(watchlater)
    } catch (error) {
      console.log(error);
      res.status(400).json(error)
    }
  }
module.exports = {signup,login,changepassword,verifyotp,forgottenpassword,watchlater} 
