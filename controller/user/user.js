const { User } = require('../../models');

class UserController {
    static getUsers = async (req, res) => {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({ message: "internal server error"})
        }
    }

    static getUserById = async (req, res) => {
        try {
            const id = req.params.id
            const userById = await User.findByPk(id)
            res.status(200).json(userById)
        } catch (error) {
            res.status(500).json({ message: "internal server error"})
        }
    }

    static updateUser = async (req, res) => {
        try {
            const id = req.params.id
            const updateUser = await User.update(req.body, { where: {id:id} })
            const newData = await User.findAll({ where: {id:id} })
            res.status(201).json({ message: 'update success', data:newData })
        } catch (err) {
            res.status(500).json({ message: 'Internal server error'})
        }
    }

    static deleteUser = async (req, res) => {
        try {
            const id = req.params.id
            const deleteUser = await User.destroy({ where: {id:id}})
            if (!deleteUser) res.status(500).json({ message: "id not found"})
            res.status(200).json({ message: "delete success"})
        } catch (error) {
            res.status(500).json({ message: "internal server error"})
        }
    }
}

module.exports = UserController