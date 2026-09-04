const db = require('../config/db');

const createOrder = async (orderData) => {
    try {
        const query = 'INSERT INTO orders (order_id, user_id, restro_id, total_amount, order_status, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const result = await db.one(query, [orderData.order_id, orderData.user_id, orderData.restro_id, orderData.total_amount, orderData.order_status || 'PLACED', new Date()]);
        return result;
    }
    catch (error) {
        console.log('Error creating order in model:', error);
        throw error;
    }
}

const editOrder = async (orderParams, orderData) => {
    try {
        const query = `UPDATE orders SET user_id=$1, restro_id=$2, total_amount=$3, order_status=$4 WHERE order_id=$5 RETURNING *`;
        const result = await db.one(query, [orderData.user_id, orderData.restro_id, orderData.total_amount, orderData.order_status, orderParams.order_id]);
        return result;
    }
    catch (error) {
        console.log('Error updating order in model:', error);
        throw error;
    }
}

const getOrder = async (orderParams) => {
    try {
        const query = `SELECT * from orders WHERE order_id=$1`;
        const result = await db.oneOrNone(query, [orderParams.order_id]);
        return result;
    }
    catch (error) {
        console.log('Error finding order in model:', error);
        throw error;
    }
}

const getAllOrders = async () => {
    try {
        const query = `SELECT * from orders ORDER BY created_at DESC`;
        const result = await db.any(query);
        return result;
    }
    catch (error) {
        console.log('Error returning all orders in model:', error);
        throw error;
    }
}

const deleteOrder = async (orderParams) => {
    try {
        const query = `DELETE from orders WHERE order_id=$1 RETURNING *`;
        const result = await db.one(query, [orderParams.order_id]);
        return result;
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
};