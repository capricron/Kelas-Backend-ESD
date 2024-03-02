const { rupiahFormat } = require('../helpers/rupiahFormat.helpers')
const { checkout, products } = require('../models')

exports.createCheckoutProduct = async (req, res) => {

    const {id_user, id_product, quantity} = req.body

    const product = await products.findOne({where: {id: id_product}})

    if(!product){
        return {
            status: 404,
            message: "Product yang ingin kamu beli tidak ditemukan"
        }
    }

    let data = await checkout.create({id_user, id_product, quantity})
    
    data.dataValues.total = rupiahFormat(quantity * product.price)

    console.log(data)

    return {
        status: 201,
        data,
        message: "Success Create Data"
    }

}