const db = require('../config/db');

// ==========================================
// RESTAURANT OPERATIONS
// ==========================================

const createRestro = async (restroData) => {
    try {
        const query = 'INSERT INTO restros (restro_id, restro_name, restro_owner_id, restro_location, restro_pincode, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const result = await db.one(query, [restroData.restro_id, restroData.restro_name, restroData.restro_owner_id, restroData.restro_location, restroData.restro_pincode, new Date()]);
        return result;
    }
    catch (error) {
        console.log('Error creating restro in model:', error);
        throw error;
    }
}

const editRestro = async (restroParams, restroData) => {
    try {
        const query = `UPDATE restros SET restro_name=$1, restro_location=$2 WHERE restro_id=$3 RETURNING *`;
        const result = await db.one(query, [restroData.restro_name, restroData.restro_location, restroParams.restro_id]);
        return result;
    }
    catch (error) {
        console.log('Error updating restro in model:', error);
        throw error;
    }
}

const getRestro = async (restroParams) => {
    try {
        const query = `SELECT * from restros WHERE restro_id=$1`;
        const result = await db.oneOrNone(query, [restroParams.restro_id]);
        return result;
    }
    catch (error) {
        console.log('Error finding restro in model:', error);
        throw error;
    }
}

const getAllRestros = async () => {
    try {
        const query = `SELECT * from restros ORDER BY created_at DESC`;
        const result = await db.any(query);
        return result;
    }
    catch (error) {
        console.log('Error returning all restros in model:', error);
        throw error;
    }
}

const deleteRestro = async (restroParams) => {
    try {
        const query = `DELETE from restros WHERE restro_id=$1 RETURNING *`;
        const result = await db.one(query, [restroParams.restro_id]);
        return result;
    }
    catch (error) {
        console.log('Error deleting restro in model:', error);
        throw error;
    }
}

// ==========================================
// MENU ITEM OPERATIONS
// ==========================================

const createMenuItem = async (menuData) => {
    try {
        const query = 'INSERT INTO menu_items (item_id, restro_id, item_name, item_description, item_price, is_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
        const result = await db.one(query, [menuData.item_id, menuData.restro_id, menuData.item_name, menuData.item_description, menuData.item_price, menuData.is_available ?? true]);
        return result;
    }
    catch (error) {
        console.log('Error creating menu item in model:', error);
        throw error;
    }
}

const editMenuItem = async (menuParams, menuData) => {
    try {
        const query = `UPDATE menu_items SET item_name=$1, item_description=$2, item_price=$3, is_available=$4 WHERE item_id=$5 RETURNING *`;
        const result = await db.one(query, [menuData.item_name, menuData.item_description, menuData.item_price, menuData.is_available, menuParams.item_id]);
        return result;
    }
    catch (error) {
        console.log('Error updating menu item in model:', error);
        throw error;
    }
}

const getMenuItem = async (menuParams) => {
    try {
        const query = `SELECT * from menu_items WHERE item_id=$1`;
        const result = await db.oneOrNone(query, [menuParams.item_id]);
        return result;
    }
    catch (error) {
        console.log('Error finding menu item in model:', error);
        throw error;
    }
}

const getAllMenuItems = async (menuParams) => {
    try {
        const query = `SELECT * from menu_items WHERE restro_id=$1 ORDER BY created_at DESC`;
        const result = await db.any(query, [menuParams.restro_id]);
        return result;
    }
    catch (error) {
        console.log('Error returning all menu items in model:', error);
        throw error;
    }
}

const deleteMenuItem = async (menuParams) => {
    try {
        const query = `DELETE from menu_items WHERE item_id=$1 RETURNING *`;
        const result = await db.one(query, [menuParams.item_id]);
        return result;
    }
    catch (error) {
        console.log('Error deleting menu item in model:', error);
        throw error;
    }
}

module.exports = {
    createRestro,
    editRestro,
    getRestro,
    getAllRestros,
    deleteRestro,
    createMenuItem,
    editMenuItem,
    getMenuItem,
    getAllMenuItems,
    deleteMenuItem
}