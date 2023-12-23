const mongoose = require("mongoose")

const connectDB = async ()=>{
    try {
        const {connection} = await mongoose.connect("mongodb+srv://shanjibin10:2ZowYqKgxl46mVhO@cluster0.euayt4z.mongodb.net/movieapp?retryWrites=true&w=majority")
        console.log("database connected:" +connection.host);       
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;