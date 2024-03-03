const { json } = require("body-parser")
const  jsonwebtoken  = require("jsonwebtoken")

exports.tes = (req, res, next) => {

    console.log(req)

}

exports.auth = (req, res, next) => {
    try{
        if(req.headers.authorization ){
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jsonwebtoken.verify(token, process.env.JWT)
            req.user_data = decoded
            next()
        }else{
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
    }catch{
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}