const jwt = require("jsonwebtoken")

const generatetockens = (userid)=>{
   return jwt.sign({_id:userid},"this-is-a-secret")
}
module.exports = {generatetockens}
