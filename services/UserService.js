const UserModel = require('../models/UsersModel')
const bcrypt = require('bcrypt')

//create user
// const QueryCreateUser = async (user) => {
//     return await UserModel.create(user)
// }
//Returns user with id
const QueryGetUserById = async (id) => {
    return await UserModel.findById(id).exec()
    
}
//Returns all users
const QueryGetAllUsers = async () => {
    return await UserModel.find().exec()
}
//Updates user with id
const QueryUpdateUserById =async (id, user) => {
    if(user.password){
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
    }
    return await UserModel.findByIdAndUpdate(id, user, {new:true}).exec()
}
//Deletes user with id
const QueryDeleteUserById =async (id) => {
    return await UserModel.findByIdAndDelete(id).exec()
}

module.exports = {QueryDeleteUserById, QueryUpdateUserById, QueryGetUserById, QueryGetAllUsers}
