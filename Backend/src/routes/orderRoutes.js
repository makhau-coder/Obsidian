const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../auth/authMiddleware')

orderRouter.use(express.json());

orderRouter.get('/', (req, res) => {
    res.send('Order service is running')
})

orderRouter.post('/createOrder', authMiddleware.authMiddleware, orderController.createOrderController)
orderRouter.put('/editOrder/:order_id', authMiddleware.authMiddleware, orderController.editOrderController)
orderRouter.get('/getOrder/:order_id', authMiddleware.authMiddleware, orderController.getOrderController)
orderRouter.get('/getAllOrders', authMiddleware.authMiddleware, orderController.getAllOrdersController)
orderRouter.delete('/deleteOrder/:order_id', authMiddleware.authMiddleware, orderController.deleteOrderController)
orderRouter.get('/getTotalOrderAmount', authMiddleware.authMiddleware, orderController.getTotalOrderAmountController)
orderRouter.get('/getTotalOrderAmountByUserId/:user_id', authMiddleware.authMiddleware, orderController.getTotalOrderAmountByUserIdController)
orderRouter.get('/getTotalOrderAmountByRestroId/:restro_id', authMiddleware.authMiddleware, orderController.getTotalOrderAmountByRestroIdController)
orderRouter.get('/getOrdersByUserId/:user_id', authMiddleware.authMiddleware, orderController.getOrdersByUserIdController)
orderRouter.get('/getOrdersByRestroId/:restro_id', authMiddleware.authMiddleware, orderController.getOrdersByRestroIdController)

// Ordered Items Routes
orderRouter.post('/createOrderedItem', authMiddleware.authMiddleware, orderController.createOrderedItemController)
orderRouter.put('/editOrderedItem/:order_item_id', authMiddleware.authMiddleware, orderController.editOrderedItemController)
orderRouter.get('/getOrderedItem/:order_item_id', authMiddleware.authMiddleware, orderController.getOrderedItemController)
orderRouter.get('/getAllOrderedItems/:order_id', authMiddleware.authMiddleware, orderController.getAllOrderedItemsController)
orderRouter.delete('/deleteOrderedItem/:order_item_id', authMiddleware.authMiddleware, orderController.deleteOrderedItemController)

module.exports = orderRouter;