const db = require('../config/db');

// ==========================================
// RESTAURANT OPERATIONS
// ==========================================

const createRestro = async (restroData) => {
    try {
        // FIXED: Added const
        const query = 'INSERT INTO restros (restro_id, restro_name, restro_location, restro_email, restro_phone, created_at) VALUES ($1, $2, $3, $4, $5, $6)';
        await db.none(query, [restroData.restro_id, restroData.restro_name, restroData.restro_location, restroData.restro_email, restroData.restro_phone, new Date()]);
        return { success: true, message: 'Restro created successfully' };
    }
    catch (error) {
        console.log('Error creating restro in model:', error);
        throw error;
    }
}

const editRestro = async (restroParams, restroData) => {
    try {
        const query = `UPDATE restros SET restro_name=$1, restro_location=$2, restro_phone=$3 WHERE restro_id=$4`;
        await db.none(query, [restroData.restro_name, restroData.restro_location, restroData.restro_phone, restroParams.restro_id]);
        return { success: true, message: 'Restro updated successfully' };
    }
    catch (error) {
        console.log('Error updating restro in model:', error);
        throw error;
    }
}

const getRestro = async (restroParams) => {
    try {
        const query = `SELECT * from restros WHERE restro_id=$1`;
        const restro = await db.oneOrNone(query, [restroParams.restro_id]);
        return { success: true, restro: restro };
    }
    catch (error) {
        console.log('Error finding restro in model:', error);
        throw error;
    }
}

const getAllRestros = async () => {
    try {
        const query = `SELECT * from restros ORDER BY created_at DESC`;
        // FIXED: Changed db.many to db.any
        const restros = await db.any(query);
        return { success: true, restros: restros };
    }
    catch (error) {
        console.log('Error returning all restros in model:', error);
        throw error;
    }
}

const deleteRestro = async (restroParams) => {
    try {
        const query = `DELETE from restros WHERE restro_id=$1`;
        await db.none(query, [restroParams.restro_id]);
        return { success: true, message: 'Restro deleted successfully' };
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
        const query = 'INSERT INTO menu_items (item_id, restro_id, item_name, item_description, item_price, is_available) VALUES ($1, $2, $3, $4, $5, $6)';
        await db.none(query, [menuData.item_id, menuData.restro_id, menuData.item_name, menuData.item_description, menuData.item_price, menuData.is_available ?? true]);
        return { success: true, message: 'Menu item created successfully' };
    }
    catch (error) {
        console.log('Error creating menu item in model:', error);
        throw error;
    }
}

const editMenuItem = async (menuParams, menuData) => {
    try {
        const query = `UPDATE menu_items SET item_name=$1, item_description=$2, item_price=$3, is_available=$4 WHERE item_id=$5`;
        await db.none(query, [menuData.item_name, menuData.item_description, menuData.item_price, menuData.is_available, menuParams.item_id]);
        return { success: true, message: 'Menu item updated successfully' };
    }
    catch (error) {
        console.log('Error updating menu item in model:', error);
        throw error;
    }
}

const getMenuItem = async (menuParams) => {
    try {
        const query = `SELECT * from menu_items WHERE item_id=$1`;
        const menuItem = await db.oneOrNone(query, [menuParams.item_id]);
        return { success: true, menuItem: menuItem };
    }
    catch (error) {
        console.log('Error finding menu item in model:', error);
        throw error;
    }
}

const getAllMenuItems = async (menuParams) => {
    try {
        const query = `SELECT * from menu_items WHERE restro_id=$1 ORDER BY created_at DESC`;
        const menuItems = await db.any(query, [menuParams.restro_id]);
        return { success: true, menuItems: menuItems };
    }
    catch (error) {
        console.log('Error returning all menu items in model:', error);
        throw error;
    }
}

const deleteMenuItem = async (menuParams) => {
    try {
        const query = `DELETE from menu_items WHERE item_id=$1`;
        await db.none(query, [menuParams.item_id]);
        return { success: true, message: 'Menu item deleted successfully' };
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