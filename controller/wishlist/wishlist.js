const { Wishlist, User, Product } = require('../../models');

class WishlistController {
    static createWishlist = async (req, res) => {
        try {
            const userId = req.query.userId
            const productId = req.body.productId
            const existedWishlist = await Wishlist.findOne({ where: { userId: userId, productId: productId}})
            if (existedWishlist) return res.status(200).json({ message: 'item already existed'})
            const createWishlist = await Wishlist.create({ userId, productId})
            res.status(200).json({ message: 'success adding wishlist', data: createWishlist})
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static viewWishlist = async (req, res) => {
        try {
            const userId = req.query.userId
            const viewWishlist = await User.findAll({ include: {
                model: Product,
                as: 'product_wishlist'
            },  
                where: {
                    id: userId
                }  
            })
            const wishlistData = viewWishlist[0].product_wishlist
            if(wishlistData.length == 0) return null
            return res.status(200).send(wishlistData)
        } catch (error) {
            res.status(500).json({ message: 'internal server error'})
        }
    }

    static deleteWishlist = async (req, res) => {
        try {
            const userId = req.query.userId
            const productId = req.query.productId
            const deleteWishlist = await Wishlist.destroy({ where: {userId: userId, productId: productId}})
            return res.status(200).json({ message: 'delete success'})
        } catch (error) {
            res.status(500).json({ message: 'internal server error'})
        }
    }
}

module.exports = WishlistController