const authService = require('../services/auth.service')

exports.authControllerLogin = async (req, res, next) => {
    const result = await authService.authServiceLogin(req)
    console.log(result)
    return res.status(result.status).json(result)
}