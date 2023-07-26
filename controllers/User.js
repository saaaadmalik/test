const UserService = require("../services/UserService")

const GetAllUsers = async (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            res.status(403)
            throw new Error("Not authorized")
        }
        const users = await UserService.QueryGetAllUsers()
        res.status(200).json(users)

    } catch (error) {
        console.log({ mesasge: error.message })
        // res.status(500).json(error)
        res.status(500)
        next(error)


    }
}

const GetUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        // console.log("token id is :" ,req.user.id)
        // console.log("params id is :" ,req.params.id)
        if (!req.user.isAdmin && req.user.id !== id) {
            res.status(403)
            throw new Error("Not authorizzzed")
        }
        const user = await UserService.QueryGetUserById(id)
        res.status(200).json(user)

    } catch (error) {
        console.log({ mesasge: error.message })
        // res.status(500).json(error)
        res.status(500)
        next(error)
    }
}

// const CreateUser = async (req, res) => {
//     console.log(req.body)
//     try {
//         const user =  await UserService.QueryCreateUser(req.body)
//         res.status(200).json(user)
//     } catch (error) {
//         console.log({ mesasge: error.message })
//         res.status(500).json(error)

//     }
// }

const UpdateUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!req.user.isAdmin && req.user.id !== id) {
            res.status(403)
            throw new Error("Not authorized")
        }
        if(req.body.password){
            if(req.body.password.length < 8){
                throw new Error("Password must be at least 8 characters long.")
            }
        }
        const user = await UserService.QueryUpdateUserById(req.params.id, req.body)
        res.status(200).json(user)
    } catch (error) {
        console.log({ mesasge: error.message })
        // res.status(500).json(error)
        res.status(500)
        next(error)

    }
}

const DeleteUserById = async (req, res, next) => {
    try {
        const id = req.params.id
        if (!req.user.isAdmin && req.user.id !== id) {
            res.status(403)
            throw new Error("Not authorized")
        }
        await UserService.QueryDeleteUserById(req.params.id)
        res.status(200).json({ message: "User deleted" })

    } catch (error) {
        console.log({ mesasge: error.message })
        // res.status(500).json(error)
        res.status(500)
        next(error)

    }
}

module.exports = { DeleteUserById, UpdateUserById, GetUserById, GetAllUsers }

