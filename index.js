const express = require("express")
const cors = require("cors")
const cloudinaryware = require("./cloudinary/cloudinary")
const connectDB = require("./config/config")
const userRoute = require("./router/userRoute")
const movieRoute = require("./router/movieRoute")
const genreRoute = require("./router/genreRoute")

const app = express()
require("dotenv").config()
connectDB()
app.use(cloudinaryware)
app.use(express.json())
app.use(cors())

app.use("/user",userRoute)
app.use("/movie",movieRoute)
app.use("/genre",genreRoute)

app.listen(2010,()=>console.log("the server is running on port no.2010"))