const db = require('../config/db');

const createOrder = async (user_id, order_amount, order_status) => {
    try {
        const result = await db.none.query(
            'INSERT INTO orders (user_id, order_amount, order_status) VALUES ($1, $2, $3) RETURNING *',
            [user_id, order_amount, order_status]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const getAllOrders = async () => {
    try {
        const result = await db.manyOrNone.query('SELECT * FROM orders');
        return result.rows;
    } catch (error) {
        throw error;
    }
};

const getOrderById = async (order_id) => {
    try {
        const result = await db.manyOrNone.query('SELECT * FROM orders WHERE order_id = $1', [order_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const updateOrder = async (order_id, order_amount, order_status) => {
    try {
        const result = await db.query(
            'UPDATE orders SET order_amount = $1, order_status = $2 WHERE order_id = $3 RETURNING *',
            [order_amount, order_status, order_id]
        );
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

const deleteOrder = async (order_id) => {
    try {
        const result = await db.query('DELETE FROM orders WHERE order_id = $1 RETURNING *', [order_id]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder
};