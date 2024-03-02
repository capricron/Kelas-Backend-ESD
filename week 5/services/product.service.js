const {products} = require('../models')   
const {rupiahFormat} = require('../helpers/rupiahFormat.helpers')
const { saveImage } = require('../helpers/saveImage.helper')
const fs = require('fs')
const { deleteImageHelper } = require('../helpers/deleteImage.helper')

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

exports.getDetailProduct = async (req, res) => {
    const {id} = req.params

    const data = await products.findOne({where: {id}})

    if(!data){
        return {
            status: 404,
            message: "Data Not Found"
        }
    }

    return {
        status: 200,
        data,
        message: "Success Get Detail Data"
    }
}

exports.createProduct = async (req, res) => {
    const {name,description, price, image} = req.body
    const slug = name.toLowerCase().split(' ').join('-')

    const imageFilePath = await saveImage(req.files.image,slug, "product")

    const data = await products.create({name, description, price, image: imageFilePath})

    return {
        status: 201,
        data: req.body,
        message: "Success Create Data"
    }
}


exports.editProduct = async (req, res) => {
    const {id} = req.params

    const data = await products.findOne({where: {id}})

    if(!data){
        return {
            status: 404,
            message: "Data Not Found"
        }
    }

    const {name,description, price} = req.body
    const slug = name.toLowerCase().split(' ').join('-')

    deleteImageHelper(data.image)

    const imageFilePath = await saveImage(req.files.image,slug, "product")

    console.log(imageFilePath)

    await products.update({name, description, price, image: imageFilePath}, {where: {id}})

    return {
        status: 200,
        data: req.body,
        message: "Success Update Data"
    }
} 

exports.deleteProduct = async (req, res) => {
    const {id} = req.params

    const data = await products.findOne({where: {id}})

    if(!data){
        return {
            status: 404,
            message: "Data Not Found"
        }
    }

    deleteImageHelper(data.image)

    await products.destroy({where: {id}})

    return {
        status: 200,
        message: "Success Delete Data"
    }
}




