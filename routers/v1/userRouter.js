const user = require('express').Router();
const UserController = require('../../controller/user/user');
const isAuthenticated = require('../../middleware/isAuthenticated');

user.get('/', UserController.getUsers)
user.use(isAuthenticated)
user.get('/:id', UserController.getUserById)
user.put('/:id', UserController.updateUser)
user.delete('/:id', UserController.deleteUser)

module.exports = user