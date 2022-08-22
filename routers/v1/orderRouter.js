const order = require('express').Router();
const OrderController = require('../../controller/order/order');
const isAuthenticated = require('../../middleware/isAuthenticated')

order.use(isAuthenticated)
order.post('/item', OrderController.orderItem)
order.post('/', OrderController.createOrder )

module.exports = order