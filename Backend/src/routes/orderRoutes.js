const express = require('express');
const orderRouter = express.Router();

orderRouter.get('/',(req,res)=>{
    res.send('Order service is running')
})

module.exports = orderRouter;