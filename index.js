const express = require("express");  
const dotenv = require("dotenv");  
var bodyParser = require('body-parser')
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/dbConfig");
const cors = require("cors");
const error = require("./middleware/ErrorHandler");
const authRoutes  = require("./routes/authRoutes"); 

const app = express();

dotenv.config({path:'./config/.env'})
connectDB()

app.use(cors())
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use('/user', userRoutes)
app.use('/user', authRoutes)

app.use(error)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})