const db = require('../config/db');

const createOrderedItem = async (orderedItemData) => {
    try {
        const query = 'INSERT INTO ordered_items (order_id, item_id, item_quantity, item_amount, created_at) VALUES ($1, $2, $3, $4, $5)';
        await db.none(query, [orderedItemData.order_id, orderedItemData.item_id, orderedItemData.item_quantity, orderedItemData.item_amount, new Date()]);
        return { success: true, message: 'Ordered item created successfully' };
    }
    catch (error) {
        console.log('Error creating ordered item in model:', error);
        throw error;
    }
}

const editOrderedItem = async (orderedItemParams, orderedItemData) => {
    try {
        const query = `UPDATE ordered_items SET item_quantity=$1, item_amount=$2 WHERE order_item_id=$3`;
        await db.none(query, [orderedItemData.item_quantity, orderedItemData.item_amount, orderedItemParams.order_item_id]);
        return { success: true, message: 'Ordered item updated successfully' };
    }
    catch (error) {
        console.log('Error updating ordered item in model:', error);
        throw error;
    }
}

const getOrderedItem = async (orderedItemParams) => {
    try {
        const query = `SELECT * from ordered_items WHERE order_item_id=$1`;
        const orderedItem = await db.oneOrNone(query, [orderedItemParams.order_item_id]);
        return { success: true, orderedItem: orderedItem };
    }
    catch (error) {
        console.log('Error finding ordered item in model:', error);
        throw error;
    }
}

const getAllOrderedItems = async (orderedItemParams) => {
    try {
        const query = `SELECT * from ordered_items WHERE order_id=$1 ORDER BY created_at DESC`;
        const orderedItems = await db.any(query, [orderedItemParams.order_id]);
        return { success: true, orderedItems: orderedItems };
    }
    catch (error) {
        console.log('Error returning all ordered items in model:', error);
        throw error;
    }
}

const deleteOrderedItem = async (orderedItemParams) => {
    try {
        const query = `DELETE from ordered_items WHERE order_item_id=$1`;
        await db.none(query, [orderedItemParams.order_item_id]);
        return { success: true, message: `Ordered item ${orderedItemParams.order_item_id} deleted successfully` };
    }
    catch (error) {
        console.log('Error deleting ordered item in model:', error);
        throw error;
    }
}

module.exports = {
    createOrderedItem,
    editOrderedItem,
    getOrderedItem,
    getAllOrderedItems,
    deleteOrderedItem
}
