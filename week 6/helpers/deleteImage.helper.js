const fs = require('fs') 

exports.deleteImageHelper = async (image) => {
    try{
        fs.unlinkSync(`./public${image}`)
    }catch(err){
        console.log(err)
    }
}