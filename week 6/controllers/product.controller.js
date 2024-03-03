
const productService = require('../services/product.service')
const { imageValidations } = require('../validations/image.validation')
const {validateAddProduct, validateEditProduct} = require('../validations/product.validation')

exports.getAllProducts = async (req, res) => {

    const result = await productService.getAllProducts(req, res)

    return res.status(result.status).json(result)
}

exports.getDetailProduct = async (req, res) => {
    
    const result = await productService.getDetailProduct(req, res)

    return res.status(result.status).json(result)
}

exports.createProduct = async (req, res) => {

    let {error} = validateAddProduct(req.body)

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

    const result = await productService.createProduct(req, res)

    return res.status(result.status).json(result)
}


// edit product
exports.editProduct = async (req, res) => {

    let {error} = validateEditProduct(req.body)

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

    const result = await productService.editProduct(req, res)

    return res.status(result.status).json(result)
}

exports.deleteProduct = async (req, res) => {

    const result = await productService.deleteProduct(req, res)

    return res.status(result.status).json(result)
}