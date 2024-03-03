const checkoutService = require('../services/checkout.service')

exports.checkoutProducController = async (req, res) => {
 
    const result = await checkoutService.createCheckoutProduct(req, res)
 
    return res.status(result.status).json(result)
}