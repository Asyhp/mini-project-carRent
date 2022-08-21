const auth = require('express').Router();
const AuthController = require('../../controller/authentication/authentication');

auth.post('/signup', AuthController.register);
auth.post('/login', AuthController.login)


module.exports = auth
