const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');

orderRouter.use(express.json());

orderRouter.get('/', (req, res) => {
    res.send('Order service is running')
})

orderRouter.post('/createOrder', orderController.createOrderController)
orderRouter.put('/editOrder/:order_id', orderController.editOrderController)
orderRouter.get('/getOrder/:order_id', orderController.getOrderController)
orderRouter.get('/getAllOrders', orderController.getAllOrdersController)
orderRouter.delete('/deleteOrder/:order_id', orderController.deleteOrderController)

// Ordered Items Routes
orderRouter.post('/createOrderedItem', orderController.createOrderedItemController)
orderRouter.put('/editOrderedItem/:order_item_id', orderController.editOrderedItemController)
orderRouter.get('/getOrderedItem/:order_item_id', orderController.getOrderedItemController)
orderRouter.get('/getAllOrderedItems/:order_id', orderController.getAllOrderedItemsController)
orderRouter.delete('/deleteOrderedItem/:order_item_id', orderController.deleteOrderedItemController)

module.exports = orderRouter;