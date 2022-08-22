const db = require('../../models');
const { Product, orderItem, User } = require('../../models');

class CartController {
    static getCart = async (req, res) => {
        try {
            const id = req.user
            const cart = await db.orderItem.findAll({
                include: {
                    model: db.Product,
                    as: 'productDetails',
                    attributes: {
                        exclude: ['detail', 'createdAt', 'updatedAt']
                    }
                }, where: {
                    userId: id,
                    status: 'cart'
                },
                order: [['createdAt', 'ASC']]
            })
            res.status(200).json(cart)
        } catch (error) {
            console.log(error)
        }
    }

    static addToCart = async (req, res) => {
        try {
            const id = req.user
            const { productId, lamaSewa, qty } = req.body
            if (isNaN(productId)) return res.status(400).json({ message: 'product id must be number'})
            const product = await Product.findOne({ where: {id: productId}})
            if (!product) return res.status(400).json({ message: 'no product found'})
            const check = await orderItem.findOne({ where: {
                userId: id, productId,
                status: 'cart'
            }})
            if (check) return res.status(200).json({ message: 'product already in cart'})
            const cartItem = await orderItem.create({
                userId: id, productId, lamaSewa,
                status: 'cart',
                priceItem: product.price,
                qty,
            })
            res.status(200).json({ message: 'product has been added to cart'})
        } catch (error) {
            console.log(error)
        }
    }

    static updateCart = async (req, res) => {
        try {
            const { id } = req.user
            const { productId, qty, lamaSewa } = req.body
            if (isNaN(productId)) return res.status(400).json({ message: 'product id must be number'})
            const product = await db.Product.findOne({ where: {id: productId}})
            if (!product) return res.status(400).json({ message: 'no product found'})
            const cartItem = await db.orderItem.update({
                qty, lamaSewa
            }, {
                where: { userId: id, status: 'cart', productId},
                individualHooks: true
            })
            cartItem[0]
                ? res.status(200).json({ message: 'update success'})
                : res.status(200).json({ message: 'no change'})
        } catch (error) {
            console.log(error)
        }
    }

    static deleteCart = async (req, res) => {
        try {
            const { id } = req.body
            const cartItem = await db.rrderItem.destroy({
                where: {
                    userId: req.user.id,
                    status: 'cart',
                    id: id
                }
            })
            res.status(200).json(cartItem)
        } catch (error) {
            res.status(500).json({ message: error.message})
        }
    }
}

module.exports = CartController