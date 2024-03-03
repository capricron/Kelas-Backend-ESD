const bcrypt = require('bcrypt');

const {user} = require('../models');

// import read jwt
const jsonwebtoken = require('jsonwebtoken');

require('dotenv').config();

exports.authServiceLogin = async (req) => {

    const {email, password} = req.body;

    const dataUser = await user.findOne({
        where: {
            email
        }
    })

    if (email != dataUser.email) {
        return {
            status: 403,
            message: "email & password wrong"
        }
    }

    const checkPassword = await bcrypt.compare(password, dataUser.password);    

    if (!checkPassword) {
        return {
            status: 403,
            message: "email & password wrong"
        }
    }

    const token = jsonwebtoken.sign({
        id: dataUser.id,
        email: dataUser.email,
        name: dataUser.name,
    }, process.env.JWT , {
        expiresIn: '24h'
    })

    return {
        status: 201,
        message: "login success",
        data: {
            token
        }
    }

}