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

        const result = await orderModel.createOrder(orderData);
        return result; 
    } catch (error) {
        console.log('Error creating order in service:', error);
        throw error;
    }
}

const editOrderService = async (orderParams, orderData) => {
    try {
        if (!orderParams.order_id) {
            console.log('Validation Error: Order ID is missing');
            throw new Error('Order ID is missing');
        }

        if (orderData.order_status) {
            orderData.order_status = orderData.order_status.trim().toUpperCase();
        }

        const result = await orderModel.editOrder(orderParams, orderData);
        return result;
    } catch (error) {
        console.log('Error editing order in service:', error);
        throw error;
    }
}

const getOrderService = async (orderParams) => {
    try {
        if (!orderParams.order_id) {
            console.log('Validation Error: Order ID is missing');
            throw new Error('Order ID is missing');
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
            console.log('Validation Error: Order ID is missing');
            throw new Error('Order ID is missing');
        }

        const result = await orderModel.deleteOrder(orderParams);
        return result;
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
            console.log('Validation Error: Order ID is required for an ordered item');
            throw new Error('Order ID is required for an ordered item');
        }

        if (!orderedItemData.item_id) {
            console.log('Validation Error: Item ID is required for an ordered item');
            throw new Error('Item ID is required for an ordered item');
        }

        const result = await orderedItemsModel.createOrderedItem(orderedItemData);
        return result;
    } catch (error) {
        console.log('Error creating ordered item in service:', error);
        throw error;
    }
}

const editOrderedItemService = async (orderedItemParams, orderedItemData) => {
    try {
        if (!orderedItemParams.order_item_id) {
            console.log('Validation Error: Ordered item ID is missing');
            throw new Error('Ordered item ID is missing');
        }

        const result = await orderedItemsModel.editOrderedItem(orderedItemParams, orderedItemData);
        return result;
    } catch (error) {
        console.log('Error editing ordered item in service:', error);
        throw error;
    }
}

const getOrderedItemService = async (orderedItemParams) => {
    try {
        if (!orderedItemParams.order_item_id) {
            console.log('Validation Error: Ordered item ID is missing');
            throw new Error('Ordered item ID is missing');
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
            console.log('Validation Error: Order ID is missing');
            throw new Error('Order ID is missing');
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
            console.log('Validation Error: Ordered item ID is missing');
            throw new Error('Ordered item ID is missing');
        }

        const result = await orderedItemsModel.deleteOrderedItem(orderedItemParams);
        return result;
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