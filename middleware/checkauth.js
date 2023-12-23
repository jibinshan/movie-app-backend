const jwt = require('jsonwebtoken');
const user = require("../models/userModel")
exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    const tokenValid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(tokenValid);
    req.userId = tokenValid._id;
    next();
  } catch (error) {
    res.status(401).json({
      message: "You are UnAuthorized",
    });
  }
};
exports.userRole = (userrole)=>{
return async(req,res,next)=>{
  try {
    const users = await user.findOne({_id:req.body._id})

    console.log(users);
    if (req.body.role !== userrole) {
      console.log(" not admin");
     return res.status(400).json("only admin can delete")
    }
    next()
  } catch (error) {
    console.log(error);
  }
}
}