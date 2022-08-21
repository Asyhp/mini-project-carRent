require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = async (payload) => {
    return await jwt.sign(payload, process.env.JWT_SECRET)
}

const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    generateToken,
    verifyToken
}