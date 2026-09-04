const orderService = require('../services/orderService');

const createOrderController = async (req, res) => {
    try {
        const order = await orderService.createOrderService(req.body);
        res.status(201).json({ success: true, message: `Order ${order.order_id} created successfully`, order:order });
    }
    catch (error) {
        console.error('Error creating order in controller:', error);
        next(error);
    }
}

const editOrderController = async (req, res) => {
    try {
        const order = await orderService.editOrderService(req.params, req.body);
        res.status(200).json({ success: true, message: `Order ${req.params.order_id} edited successfully`, order:order});
    }
    catch (error) {
        console.error('Error editing order in controller:', error);
        next(error);
    }
}

const getOrderController = async (req, res) => {
    try {
        const order = await orderService.getOrderService(req.params);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, order:order });
    }
    catch (error) {
        console.error(`Error retrieving order ${req.params.order_id} in controller:`, error);
        next(error);
    }
}

const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderService.getAllOrdersService();
        res.status(200).json({ success: true, orders:orders });
    }
    catch (error) {
        console.error('Error retrieving orders in controller:', error);
        next(error);
    }
}

const deleteOrderController = async (req, res) => {
    try {
        const order = await orderService.deleteOrderService(req.params);
        res.status(200).json({ success: true, message: `Order ${req.params.order_id} deleted successfully`, order:order });
    }
    catch (error) {
        console.error('Error deleting order in controller:', error);
        next(error);
    }
}

// ==========================================
// ORDERED ITEMS CONTROLLERS
// ==========================================

const createOrderedItemController = async (req, res) => {
    try {
        const orderedItem = await orderService.createOrderedItemService(req.body);
        res.status(201).json({ success: true, orderedItem:orderedItem });
    }
    catch (error) {
        console.error('Error creating ordered item in controller:', error);
        next(error);
    }
}

const editOrderedItemController = async (req, res) => {
    try {
        const orderedItem = await orderService.editOrderedItemService(req.params, req.body);
        res.status(200).json({ success: true, message: `Ordered item ${req.params.order_item_id} edited successfully`, orderedItem: orderedItem });
    }
    catch (error) {
        console.error('Error editing ordered item in controller:', error);
        next(error);
    }
}

const getOrderedItemController = async (req, res) => {
    try {
        const ordered_item = await orderService.getOrderedItemService(req.params);
        if (!orderedItem) {
            return res.status(404).json({ success: false, message: 'Ordered item not found' });
        }
        res.status(200).json({ success: true, orderedItem: result.orderedItem });
    }
    catch (error) {
        console.error(`Error retrieving ordered item ${req.params.order_item_id} in controller:`, error);
        next(error);
    }
}

const getAllOrderedItemsController = async (req, res) => {
    try {
        const orderedItems = await orderService.getAllOrderedItemsService(req.params);
        res.status(200).json({ success: true, orderedItems: orderedItems});
    }
    catch (error) {
        console.error('Error retrieving ordered items in controller:', error);
        next(error);
    }
}

const deleteOrderedItemController = async (req, res) => {
    try {
        const orderedItem = await orderService.deleteOrderedItemService(req.params);
        res.status(200).json({ success: true, message: `Ordered item ${req.params.order_item_id} deleted successfully`, orderedItem:orderedItem });
    }
    catch (error) {
        console.error('Error deleting ordered item in controller:', error);
        next(error);
    }
}

module.exports = {
    createOrderController,
    editOrderController,
    getOrderController,
    getAllOrdersController,
    deleteOrderController,
    createOrderedItemController,
    editOrderedItemController,
    getOrderedItemController,
    getAllOrderedItemsController,
    deleteOrderedItemController
};