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
        const query = `SELECT orders.*, users.user_firstname AS customer_firstname, users.user_lastname AS customer_lastname, restros.restro_name FROM orders JOIN users ON orders.user_id = users.user_id JOIN restros ON orders.restro_id = restros.restro_id WHERE order_id=$1`;
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
        const query = `SELECT orders.*, users.user_firstname AS customer_firstname, users.user_lastname AS customer_lastname, restros.restro_name FROM orders JOIN users ON orders.user_id = users.user_id JOIN restros ON orders.restro_id = restros.restro_id ORDER BY orders.created_at DESC`;
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

const getTotalOrderAmount = async () => {
    try {
        const query = `SELECT SUM(total_amount) as total_amount FROM orders`;
        const result = await db.oneOrNone(query);
        return result;
    } catch (error) {
        console.log('Error calculating total order amount in model:', error);
        throw error;
    }
}

const getTotalOrderAmountByUserId = async (orderParams) => {
    try {
        const query = `SELECT SUM(total_amount) as total_amount FROM orders WHERE user_id=$1`;
        const result = await db.oneOrNone(query, [orderParams.user_id]);
        return result;
    } catch (error) {
        console.log('Error calculating total order amount by user id in model:', error);
        throw error;
    }
}

const getTotalOrderAmountByRestroId = async (orderParams) => {
    try {
        const query = `SELECT SUM(total_amount) as total_amount FROM orders WHERE restro_id=$1`;
        const result = await db.oneOrNone(query, [orderParams.restro_id]);
        return result;
    } catch (error) {
        console.log('Error calculating total order amount by restro id in model:', error);
        throw error;
    }
}

const getOrdersByUserId = async (orderParams) => {
    try {
        const query = `SELECT orders.*, users.user_firstname AS customer_firstname, users.user_lastname AS customer_lastname, restros.restro_name FROM orders JOIN users ON orders.user_id = users.user_id JOIN restros ON orders.restro_id = restros.restro_id WHERE orders.user_id=$1 ORDER BY orders.created_at DESC`;
        const result = await db.any(query, [orderParams.user_id]);
        return result;
    } catch (error) {
        console.log('Error returning all orders by user id in model:', error);
        throw error;
    }
}

const getOrdersByRestroId = async (orderParams) => {
    try {
        const query = `SELECT orders.*, users.user_firstname AS customer_firstname, users.user_lastname AS customer_lastname, restros.restro_name FROM orders JOIN users ON orders.user_id = users.user_id JOIN restros ON orders.restro_id = restros.restro_id WHERE orders.restro_id=$1 ORDER BY orders.created_at DESC`;
        const result = await db.any(query, [orderParams.restro_id]);
        return result;
    } catch (error) {
        console.log('Error returning all orders by restro id in model:', error);
        throw error;
    }
}

module.exports = {
    createOrder,
    editOrder,
    getOrder,
    getAllOrders,
    deleteOrder,
    getTotalOrderAmount,
    getTotalOrderAmountByUserId,
    getTotalOrderAmountByRestroId,
    getOrdersByUserId,
    getOrdersByRestroId
};