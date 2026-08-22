const db = require('../config/db');

const createOrder = async(orderData) => {
    try {
        // order_id and created_at are omitted because the database auto-generates them
        const query = 'INSERT INTO orders (user_id, restaurant_id, total_amount, order_status) VALUES ($1, $2, $3, $4)';
        await db.none(query, [orderData.user_id, orderData.restaurant_id, orderData.total_amount, orderData.order_status || 'PLACED']);
        return {success:true, message:'Order created successfully'};
    }
    catch(error) {
        console.log('Error creating order in model:', error);
        throw error;
    }
}

const editOrder = async(orderParams, orderData) => {
    try {
        const query=`UPDATE orders SET user_id=$1, restaurant_id=$2, total_amount=$3, order_status=$4 WHERE order_id=$5`;
        await db.none(query, [orderData.user_id, orderData.restaurant_id, orderData.total_amount, orderData.order_status, orderParams.order_id]);
        return {success:true, message:'Order updated successfully'};
    }
    catch(error) {
        console.log('Error updating order in model:', error);
        throw error;
    }
}

const getOrder = async(orderParams) => {
    try {
        const query = `SELECT * from orders WHERE order_id=$1`;
        const order = await db.one(query, [orderParams.order_id]);
        return {success:true, order:order};
    }
    catch(error) {
        console.log('Error finding order in model:', error);
        throw error;
    }
}

const getAllOrders = async()=> {
    try {
        const query = `SELECT * from orders ORDER BY created_at DESC`;
        const orders = await db.many(query);
        return {success:true, orders:orders};
    }
    catch(error) {
        console.log('Error returning all orders in model:', error);
        throw error;
    }
}

const deleteOrder = async(orderParams)=> {
    try {
        const query = `DELETE from orders WHERE order_id=$1`;
        await db.none(query, [orderParams.order_id]);
        return {success:true, message:'Order deleted successfully'};
    }
    catch(error) {
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