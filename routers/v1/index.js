const v1 = require('express').Router();
const auth = require('./authRouter');
const cart = require('./cartController');
const order = require('./orderRouter');
const product = require('./productRouter');
const user = require('./userRouter');
const wishlist = require('./wishlistRouter');

v1.use('/auth', auth)
v1.use('/product', product)
v1.use('/user', user)
v1.use('/wishlist', wishlist)
v1.use('/cart', cart)
v1.use('/order', order)

module.exports = v1;