const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../auth/authMiddleware')

userRouter.use(express.json());

userRouter.get('/', (req, res) => {
    res.send('User service is running')
})

// userRouter.post('/createUser',authMiddleware.authMiddleware, userController.createUserController)
userRouter.put('/editUser/:user_id',authMiddleware.authMiddleware, userController.editUserController)
userRouter.get('/getUser/:user_id', authMiddleware.authMiddleware, userController.getUserController)
userRouter.get('/getAllUsers', authMiddleware.authMiddleware, userController.getAllUsersController)
userRouter.delete('/deleteUser/:user_id', authMiddleware.authMiddleware, userController.deleteUserController)

module.exports = userRouter;