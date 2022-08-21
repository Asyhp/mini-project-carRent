const v1 = require('express').Router();
const auth = require('./authRouter');
const product = require('./productRouter');
const user = require('./userRouter');

v1.use('/auth', auth)
v1.use('/product', product)
v1.use('/user', user)

module.exports = v1;