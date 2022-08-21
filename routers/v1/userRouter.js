const user = require('express').Router();
const UserController = require('../../controller/user/user');

user.get('/', UserController.getUsers)
user.get('/:id', UserController.getUserById)
user.put('/:id', UserController.updateUser)
user.delete('/:id', UserController.deleteUser)

module.exports = user