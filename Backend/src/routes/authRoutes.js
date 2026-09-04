const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController')

authRouter.use(express.json());

authRouter.get('/', (req, res) => {
    res.send('Auth service is running')
})

authRouter.post('/login', authController.loginController)
authRouter.post('/register', authController.registerController)
authRouter.post('/refresh', authController.refreshController)

module.exports = authRouter