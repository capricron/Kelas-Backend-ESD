
const userService = require('../services/user.service')
const { imageValidations } = require('../validations/image.validation')
const {validateAddUser, validateEditUser} = require('../validations/user.validation')

exports.getAllUsers = async (req, res) => {

    const result = await userService.getAllUsers(req, res)

    return res.status(result.status).json(result)
}

exports.getDetailUser = async (req, res) => {
    
    const result = await userService.getDetailUser(req, res)

    return res.status(result.status).json(result)
}

exports.createUser = async (req, res) => {

    let {error} = validateAddUser(req.body)

    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    let imageVal = imageValidations(req)

    if(imageVal.error){
        return res.status(400).json({
            message: imageVal.message
        })
    
    }

    const result = await userService.createUser(req, res)

    return res.status(result.status).json(result)
}


// edit User
exports.editUser = async (req, res) => {

    let {error} = validateEditUser(req.body)

    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    let imageVal = imageValidations(req)

    if(imageVal.error){
        return res.status(400).json({
            message: imageVal.message
        })
    }

    const result = await userService.editUser(req, res)

    return res.status(result.status).json(result)
}

exports.deleteUser = async (req, res) => {

    const result = await userService.deleteUser(req, res)

    return res.status(result.status).json(result)
}