const wishlist = require('express').Router();
const WishlistController = require('../../controller/wishlist/wishlist')
const isAuthenticated = require('../../middleware/isAuthenticated')

wishlist.use(isAuthenticated)
wishlist.get('/', WishlistController.viewWishlist)
wishlist.post('/', WishlistController.createWishlist)
wishlist.delete('/', WishlistController.deleteWishlist)

module.exports = wishlist