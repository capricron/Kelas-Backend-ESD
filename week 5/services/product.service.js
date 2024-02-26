const {products} = require('../models')   
const {rupiahFormat} = require('../helpers/rupiahFormat.helpers')

exports.getAllProducts = async (req, res) => {

    const data = await products.findAll()

    // convert data price to rupiah format
    const dataConvertRupiah = rupiahFormat(data)

    return {
        status: 200,
        data: dataConvertRupiah,
        message: "Success Get All Data"
    }
} 

exports.createProduct = async (req, res) => {
    const {name, description, price, image} = req.body

    const data = await products.create({name, description, price, image})

    return {
        status: 201,
        data: req.body,
        message: "Success Create Data"
    }
}