const UserModel = require('../models/UsersModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// dotenv.config({path:'./config/.env'})

//Signup user
const QuerySignupUser = async (user) => {
    const { username, email, password } = user
    try {
        const salt = await bcrypt.genSalt(10)
        // if(!password){
        //     throw new Error("Please enter password")
        // }
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        const userExists = await UserModel.findOne({ email })
        if (userExists) {
            throw new Error("User already exists")
        }
        const usernameExists = await UserModel.findOne({ username })
        if (usernameExists) {
            throw new Error("Username already exists")
        }
        const user = await newUser.save()
        const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_KEY, { expiresIn: "1d" })
        return { user, token }

    } catch (error) {
        console.log({ message: error.message })
        throw error
    }

}

// Login user 
const QueryLoginUser = async (user) => {
    const {email, password} = user
    try {
        const user = await UserModel.findOne({email})

        if(!user){
            throw new Error("Invalid email or password")
        }
        // if(!password){
        //     throw new Error("Please enter password")
        // }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isPasswordMatched){
            throw new Error("Invalid email or password")
        }

        const token = jwt.sign({id:user._id, username:user.username}, process.env.JWT_KEY, {expiresIn:"1d"})
        return {user,token}

        
    } catch (error) {
        console.log({ message: error.message })
        throw error
        
    }

}

module.exports = { QuerySignupUser, QueryLoginUser }

