const UserModel = require('../models/UsersModel')

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
    return await UserModel.findByIdAndUpdate(id, user, {new:true}).exec()
}
//Deletes user with id
const QueryDeleteUserById =async (id) => {
    return await UserModel.findByIdAndDelete(id).exec()
}

module.exports = {QueryDeleteUserById, QueryUpdateUserById, QueryGetUserById, QueryGetAllUsers}
