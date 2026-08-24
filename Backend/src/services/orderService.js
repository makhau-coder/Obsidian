const orderModel = require('../models/orderModels');
const orderedItemsModel = require('../models/orderedItemsModels');
const miscellaneousFunctions = require('../services/functions');

const createOrderService = async (orderData) => {
    try {
        const order_id = miscellaneousFunctions.generateUniqueId('ORDER');
        orderData.order_id = order_id;

        if (orderData.order_status) {
            orderData.order_status = orderData.order_status.trim().toUpperCase();
        }

        await orderModel.createOrder(orderData);
        return { success: true, message: 'Order created successfully', order_id: order_id };
    } catch (error) {
        console.log('Error creating order in service:', error);
        throw error;
    }
}

const editOrderService = async (orderParams, orderData) => {
    try {
        if (!orderParams.order_id) {
            return { success: false, message: 'Order ID is missing' };
        }

        if (orderData.order_status) {
            orderData.order_status = orderData.order_status.trim().toUpperCase();
        }

        await orderModel.editOrder(orderParams, orderData);
        return { success: true, message: 'Order edited successfully via service' };
    } catch (error) {
        console.log('Error editing order in service:', error);
        throw error;
    }
}

const getOrderService = async (orderParams) => {
    try {
        if (!orderParams.order_id) {
            return { success: false, message: 'Order ID is missing' };
        }

        const order = await orderModel.getOrder(orderParams);
        return order;
    } catch (error) {
        console.log('Error retrieving order in service:', error);
        throw error;
    }
}

const getAllOrdersService = async () => {
    try {
        const orders = await orderModel.getAllOrders();
        return orders;
    } catch (error) {
        console.log('Error retrieving all orders in service:', error);
        throw error;
    }
}

const deleteOrderService = async (orderParams) => {
    try {
        if (!orderParams.order_id) {
            return { success: false, message: 'Order ID is missing' };
        }

        await orderModel.deleteOrder(orderParams);
        return { success: true, message: 'Order deleted successfully via service' };
    } catch (error) {
        console.log('Error deleting order in service:', error);
        throw error;
    }
}

// ==========================================
// ORDERED ITEMS SERVICES
// ==========================================

const createOrderedItemService = async (orderedItemData) => {
    try {
        if (!orderedItemData.order_id) {
            return { success: false, message: 'Order ID is required for an ordered item' };
        }

        if (!orderedItemData.item_id) {
            return { success: false, message: 'Item ID is required for an ordered item' };
        }

        await orderedItemsModel.createOrderedItem(orderedItemData);
        return { success: true, message: 'Ordered item created successfully' };
    } catch (error) {
        console.log('Error creating ordered item in service:', error);
        throw error;
    }
}

const editOrderedItemService = async (orderedItemParams, orderedItemData) => {
    try {
        if (!orderedItemParams.order_item_id) {
            return { success: false, message: 'Ordered item ID is missing' };
        }

        await orderedItemsModel.editOrderedItem(orderedItemParams, orderedItemData);
        return { success: true, message: 'Ordered item edited successfully via service' };
    } catch (error) {
        console.log('Error editing ordered item in service:', error);
        throw error;
    }
}

const getOrderedItemService = async (orderedItemParams) => {
    try {
        if (!orderedItemParams.order_item_id) {
            return { success: false, message: 'Ordered item ID is missing' };
        }

        const orderedItem = await orderedItemsModel.getOrderedItem(orderedItemParams);
        return orderedItem;
    } catch (error) {
        console.log('Error retrieving ordered item in service:', error);
        throw error;
    }
}

const getAllOrderedItemsService = async (orderedItemParams) => {
    try {
        if (!orderedItemParams.order_id) {
            return { success: false, message: 'Order ID is missing' };
        }

        const orderedItems = await orderedItemsModel.getAllOrderedItems(orderedItemParams);
        return orderedItems;
    } catch (error) {
        console.log('Error retrieving all ordered items in service:', error);
        throw error;
    }
}

const deleteOrderedItemService = async (orderedItemParams) => {
    try {
        if (!orderedItemParams.order_item_id) {
            return { success: false, message: 'Ordered item ID is missing' };
        }

        await orderedItemsModel.deleteOrderedItem(orderedItemParams);
        return { success: true, message: 'Ordered item deleted successfully via service' };
    } catch (error) {
        console.log('Error deleting ordered item in service:', error);
        throw error;
    }
}

module.exports = {
    createOrderService,
    editOrderService,
    getOrderService,
    getAllOrdersService,
    deleteOrderService,
    createOrderedItemService,
    editOrderedItemService,
    getOrderedItemService,
    getAllOrderedItemsService,
    deleteOrderedItemService
};