const { Product } = require('../../models');

class ProductController {
    static getProducts = async (req, res) => {
        try {
            const products = await Product.findAll()
            res.status(200).json(products)
        } catch (err) {
            console.log(err)
            // res.status(500).json({ message: "internal server error"})
        }
    }

    static getProductById = async (req, res) => {
        try {
            const id = req.params.id
            const productById = await Product.findByPk(id)
            res.status(200).json(productById)
        } catch (err) {
            console.log(err)
            // res.status(500).json({ message: "internal server error"})
        }
    }

    static addProduct = async (req, res) => {
        try {
            const product = await Product.create(req.body)
            res.status(201).json(product)
        } catch (err) {
            res.status(500).json({ message: "internal server error"})
        }
    }

    static updateProduct = async (req, res) => {
        try {
            const id = req.params.id
            const updateProduct = await Product.update(req.body, {
                where: {id: id}
            })
            const newData = await Product.findAll({ where: {id:id}})
            res.status(201).json({ message: 'update success', data: newData})
        } catch (err) {
            res.status(500).json({ message: "internal server error"})
        }
    }

    static deleteProduct = async (req, res) => {
        try {
            const id = req.params.id
            const deleteProduct = await Product.destroy({
                where: {id:id}
            })
            if (!deleteProduct) res.status(500).json({ message: "id not found" })
            return res.status(200).json({ message: "delete success" })
        } catch (err) {
            res.status(500).json({ message: "internal server error"})
        }
    }
}

module.exports = ProductController