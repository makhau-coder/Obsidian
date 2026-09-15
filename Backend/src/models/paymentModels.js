const db = require('../config/db');

const createPayment = async (paymentData) => {
    try {
        const query = `
            INSERT INTO payments (payment_id, order_id, amount, method, status, gateway_ref, created_at, processed_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;
        const result = await db.one(query, [
            paymentData.payment_id,
            paymentData.order_id,
            paymentData.amount,
            paymentData.method,
            paymentData.status,
            paymentData.gateway_ref || null,
            new Date(),
            null
        ]);
        return result;
    } catch (error) {
        console.log('Error creating payment in model:', error);
        throw error;
    }
};

const getPaymentByOrderId = async (order_id) => {
    try {
        const query = `
            SELECT payments.*, orders.order_status, orders.restro_id
            FROM payments
            JOIN orders ON payments.order_id = orders.order_id
            WHERE payments.order_id = $1
            ORDER BY payments.created_at DESC
            LIMIT 1
        `;
        const result = await db.oneOrNone(query, [order_id]);
        return result;
    } catch (error) {
        console.log('Error getting payment by order id in model:', error);
        throw error;
    }
};

const getPaymentById = async (payment_id) => {
    try {
        const query = `
            SELECT payments.*, orders.order_status
            FROM payments
            JOIN orders ON payments.order_id = orders.order_id
            WHERE payments.payment_id = $1
        `;
        const result = await db.oneOrNone(query, [payment_id]);
        return result;
    } catch (error) {
        console.log('Error getting payment by id in model:', error);
        throw error;
    }
};

const getAllPayments = async () => {
    try {
        const query = `
            SELECT payments.*,
                   orders.order_status,
                   users.user_firstname AS customer_firstname,
                   users.user_lastname  AS customer_lastname,
                   restros.restro_name
            FROM payments
            JOIN orders  ON payments.order_id  = orders.order_id
            JOIN users   ON orders.user_id     = users.user_id
            JOIN restros ON orders.restro_id   = restros.restro_id
            ORDER BY payments.created_at DESC
        `;
        const result = await db.any(query);
        return result;
    } catch (error) {
        console.log('Error getting all payments in model:', error);
        throw error;
    }
};

const updatePaymentStatus = async (payment_id, status, gateway_ref) => {
    try {
        const query = `
            UPDATE payments
            SET status = $1, gateway_ref = $2, processed_at = $3
            WHERE payment_id = $4
            RETURNING *
        `;
        const result = await db.one(query, [status, gateway_ref, new Date(), payment_id]);
        return result;
    } catch (error) {
        console.log('Error updating payment status in model:', error);
        throw error;
    }
};

module.exports = {
    createPayment,
    getPaymentByOrderId,
    getPaymentById,
    getAllPayments,
    updatePaymentStatus
};
