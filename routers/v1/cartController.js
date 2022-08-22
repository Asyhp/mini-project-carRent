const cart = require('express').Router();
const CartController = require('../../controller/cart/cart');
const isAuthenticated = require('../../middleware/isAuthenticated')

cart.use(isAuthenticated)
cart.get('/', CartController.getCart);
cart.post('/', CartController.addToCart);
cart.put('/', CartController.updateCart);
cart.delete('/', CartController.deleteCart)

module.exports = cart