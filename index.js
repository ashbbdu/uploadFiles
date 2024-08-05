const express = require("express")
const fileUpload = require("express-fileupload")
const cors = require('cors')
 
const app = express()



// Adding middlewares
app.use(express.json())
app.use(cors())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

 
const PORT = process.env.PORT || 4000;


// connect with db
const connectWithDb = require("./config/database")
connectWithDb()

// Connect with cloundinary
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect()


// Routes
const fileRoute = require("./routes/FileUpload")
app.use("/api/v1" , fileRoute)


app.listen(PORT , () => {
    console.log("App Started at Port" + PORT)
})


// default route
app.get("/" , (req , res) => {
    res.send("This is homepage")
})


