const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

orderRouter.post('/createOrder', orderController.createOrder);
orderRouter.get('/getOrders', orderController.getOrders);
orderRouter.get('/getOrder/:order_id', orderController.getOrderById);
orderRouter.put('/updateOrder/:order_id', orderController.updateOrder);
orderRouter.delete('deleteOrder/:user_id', orderController.deleteOrder);

module.exports = orderRouter;