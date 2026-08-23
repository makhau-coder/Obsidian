const orderModel = require('../models/orderModels');

const createOrderService = async (orderData) => {
    try {
        if (orderData.order_status) {
            orderData.order_status = orderData.order_status.trim().toUpperCase();
        }

        await orderModel.createOrder(orderData);
        return { success: true, message: 'Order created successfully via service' };
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

module.exports = {
    createOrderService,
    editOrderService,
    getOrderService,
    getAllOrdersService,
    deleteOrderService
};