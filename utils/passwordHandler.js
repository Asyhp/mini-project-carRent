require('dotenv').config();
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    return bcrypt.hashSync(password, parseInt(process.env.salt))
}

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
    hashPassword,
    verifyPassword
}