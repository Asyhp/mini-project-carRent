const product = require('express').Router();
const ProductController = require('../../controller/product/product');
// const { isAuthenticated, roleAuthorization } = require('../../middleware')
const isAuthenticated = require('../../middleware/isAuthenticated')

product.get('/', ProductController.getProducts);
product.get('/:id', ProductController.getProductById);
product.use(isAuthenticated);
product.post('/', ProductController.addProduct);
product.put('/:id', ProductController.updateProduct);
product.delete('/:id', ProductController.deleteProduct);

module.exports = product