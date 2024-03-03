const joi = require('joi')

// validasi tambah User
exports.validateAddUser = (user) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  })

  return schema.validate(user)
}

exports.validateEditUser = (user) => {
  const schema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
  })

  return schema.validate(user)
}