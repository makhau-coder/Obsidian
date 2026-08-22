const express = require('express');
const userRouter = express.Router();

userRouter.get('/',(req,res)=>{
    res.send('User service is running')
})

userRouter.post('/createUser/:id', (req,res)=>{
    createUser(req.params.id);
    res.send(`User with id ${req.params.id} created successfully`)
})

module.exports = userRouter;