const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');


orderRouter.get('/',(req,res)=>{
    res.send('Order service is running')
})

orderRouter.post('/createOrder', orderController.createOrderController)
orderRouter.put('/editOrder/:order_id', orderController.editOrderController)
orderRouter.get('/getOrder/:order_id', orderController.getOrderController)
orderRouter.get('/getAllOrders', orderController.getAllOrdersController)
orderRouter.delete('/deleteOrder/:order_id', orderController.deleteOrderController)

module.exports = orderRouter;