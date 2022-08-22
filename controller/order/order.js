const db = require('../../models');

class OrderController {
    static orderItem = async (req, res) => {
        try {
            const { productId, qty, lamaSewa } = req.body
            if (isNaN(productId)) return res.status(400).json({ message: 'no product found'})
            const product = await db.Product.findOne({ where: { id: productId}})
            if (!product) return res.status(400).json({ message: 'no product found'})
            const orderItem = await db.orderItem.create({
                productId, userId: req.user.id, lamaSewa, qty, priceItem: product.price, status: 'order'
            })
            const response = {...orderItem.dataValues, productDetails: product}
            res.status(201).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    static createOrder = async (req, res) => {
        try {
            const { id, email } = req.user
            const { items } = req.body
            if (!Array.isArray(items)) res.status(400).json({ message: 'items must be array'})
            const itemObj = await db.orderItem.findAll({ where: {id: items}})
            let totalPrice = 0
            let gagal = false
            for (let i=0; i<itemObj.length; i++) {
                totalPrice += itemObj[i].dataValues.subTotalPrice
                if (itemObj[i].dataValues.orderId) {
                    gagal = itemObj[i].dataValues.id
                }
            }
            if (gagal) return res.status(400).json({ message:`order item with id ${gagal} already in order`})
            const order = await db.order.create({
                userId: id,
                status: 'unpayed',
                totalPrice
            })
            const update = await db.orderItem.update({
                status: 'order',
                orderId: order.id
            }, { where: {id:items}})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = OrderController