const db = require('../config/db');

const createOrder = async (orderData) => {
    try {
        const query = 'INSERT INTO orders (order_id, user_id, order_amount, order_status, created_at) VALUES ($1, $2, $3, $4, $5)';
        await db.none(query, [orderData.order_id, orderData.user_id, orderData.order_amount, orderData.order_status, new Date()]);
        return { success: true, message: 'Order created successfully' };
    }
    catch (error) {
        console.log('Error creating order in model:', error);
        throw error;
    }
}

const editOrder = async (orderParams, orderData) => {
    try {
        const query = `UPDATE orders SET user_id=$1, order_amount=$2, order_status=$3 WHERE order_id=$4`;
        await db.none(query, [orderData.user_id, orderData.order_amount, orderData.order_status, orderParams.order_id]);
        return { success: true, message: 'Order updated successfully' };
    }
    catch (error) {
        console.log('Error updating order in model:', error);
        throw error;
    }
}

const getOrder = async (orderParams) => {
    try {
        const query = `SELECT * from orders WHERE order_id=$1`;
        const order = await db.one(query, [orderParams.order_id]);
        return { success: true, order: order };
    }
    catch (error) {
        console.log('Error finding order in model:', error);
        throw error;
    }
}

const getAllOrders = async () => {
    try {
        const query = `SELECT * from orders ORDER BY created_at DESC`;
        const orders = await db.many(query);
        return { success: true, orders: orders };
    }
    catch (error) {
        console.log('Error returning all orders in model:', error);
        throw error;
    }
}

const deleteOrder = async (orderParams) => {
    try {
        const query = `DELETE from orders WHERE order_id=$1`;
        await db.none(query, [orderParams.order_id]);
        return { success: true, message: 'Order deleted successfully' };
    }
    catch (error) {
        console.log('Error deleting order in model:', error);
        throw error;
    }
}

module.exports = {
    createOrder,
    editOrder,
    getOrder,
    getAllOrders,
    deleteOrder
}