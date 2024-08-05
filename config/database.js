const mongoose = require("mongoose")
require("dotenv").config()

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL , {
       
        useUnifiedTopology : true,
        useNewUrlParser :true
    }).then(console.log("Database connected successfully")).catch(e =>{
        console.log(e)
        process.exit(1)
    })
}

module.exports = connectWithDb