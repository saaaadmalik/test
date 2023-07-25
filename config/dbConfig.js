const mongoose = require('mongoose');  
const dotenv = require('dotenv')
dotenv.config({path:'./config/.env'})

const connectDB = ()=>{
    mongoose.connect(process.env.MONGO_DB)   
    .then((connectiondetail)=>{
        console.log("connected to the databse")

    })
    .catch((err)=>{
        console.log(err)
    })
     
}

module.exports = connectDB              
