const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');

userRouter.use(express.json());

userRouter.get('/', (req, res) => {
    res.send('User service is running')
})

userRouter.post('/createUser', userController.createUserController)
userRouter.put('/editUser/:user_id', userController.editUserController)
userRouter.get('/getUser/:user_id', userController.getUserController)
userRouter.get('/getAllUsers', userController.getAllUsersController)
userRouter.delete('/deleteUser/:user_id', userController.deleteUserController)

module.exports = userRouter;