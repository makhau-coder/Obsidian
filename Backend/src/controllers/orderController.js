const orderService = require('../services/orderService');

const createOrderController = async (req, res) => {
    try {
        const result = await orderService.createOrderService(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json({ success: true, message: `Order ${result.order_id} created successfully` });
    }
    catch (error) {
        console.error('Error creating order in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const editOrderController = async (req, res) => {
    try {
        const result = await orderService.editOrderService(req.params, req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({ success: true, message: `Order ${req.params.order_id} edited successfully` });
    }
    catch (error) {
        console.error('Error editing order in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getOrderController = async (req, res) => {
    try {
        const result = await orderService.getOrderService(req.params);

        if (!result.success) {
            return res.status(400).json(result);
        }

        if (!result.order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.status(200).json({ success: true, order: result.order });
    }
    catch (error) {
        console.error(`Error retrieving order ${req.params.order_id} in controller:`, error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getAllOrdersController = async (req, res) => {
    try {
        const result = await orderService.getAllOrdersService();
        res.status(200).json({ success: true, orders: result.orders });
    }
    catch (error) {
        console.error('Error retrieving orders in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteOrderController = async (req, res) => {
    try {
        const result = await orderService.deleteOrderService(req.params);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({ success: true, message: `Order ${req.params.order_id} deleted successfully` });
    }
    catch (error) {
        console.error('Error deleting order in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

// ==========================================
// ORDERED ITEMS CONTROLLERS
// ==========================================

const createOrderedItemController = async (req, res) => {
    try {
        const result = await orderService.createOrderedItemService(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json({ success: true, message: result.message });
    }
    catch (error) {
        console.error('Error creating ordered item in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const editOrderedItemController = async (req, res) => {
    try {
        const result = await orderService.editOrderedItemService(req.params, req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({ success: true, message: `Ordered item ${req.params.order_item_id} edited successfully` });
    }
    catch (error) {
        console.error('Error editing ordered item in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getOrderedItemController = async (req, res) => {
    try {
        const result = await orderService.getOrderedItemService(req.params);

        if (!result.success) {
            return res.status(400).json(result);
        }

        if (!result.orderedItem) {
            return res.status(404).json({ success: false, message: 'Ordered item not found' });
        }

        res.status(200).json({ success: true, orderedItem: result.orderedItem });
    }
    catch (error) {
        console.error(`Error retrieving ordered item ${req.params.order_item_id} in controller:`, error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getAllOrderedItemsController = async (req, res) => {
    try {
        const result = await orderService.getAllOrderedItemsService(req.params);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({ success: true, orderedItems: result.orderedItems });
    }
    catch (error) {
        console.error('Error retrieving ordered items in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteOrderedItemController = async (req, res) => {
    try {
        const result = await orderService.deleteOrderedItemService(req.params);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({ success: true, message: `Ordered item ${req.params.order_item_id} deleted successfully` });
    }
    catch (error) {
        console.error('Error deleting ordered item in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
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