const bcrypt = require("bcryptjs")


const genratepasswordhash = (password)=>{
    return bcrypt.hash(password,10)
}
const comparepasswordhash = (password,passwordhash)=>{
   return bcrypt.compare(password,passwordhash)
}

module.exports = {genratepasswordhash,comparepasswordhash}