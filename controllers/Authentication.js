const AuthService = require("../services/AuthService")

const Signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body
        // if(!username || !email || !password){
        //     throw new Error("Please provide all fields")
        // }
        if(!password){
            throw new Error("Please enter password")
        }
        if(password.length < 8){
            throw new Error("Password must be at least 8 characters long.")
        }
        const {user, token} = await AuthService.QuerySignupUser(req.body)
        res.status(200).json({
            user,
            token
        })


    } catch (error) {
        console.log({ message: error.message })
        next(error)

    }


}

const Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        // if( !email || !password){
        //     throw new Error("Please provide all fields")
        // }
        if(!password){
            throw new Error("Please enter password")
        }
        const {user, token} = await AuthService.QueryLoginUser(req.body)
        res.status(200).json({
            user,
            token
        })


    } catch (error) {
        console.log({ message: error.message })
        next(error)

    }


}

module.exports = { Signup, Login }