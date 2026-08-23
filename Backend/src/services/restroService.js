const restroModel = require('../models/restroModels');

// ==========================================
// RESTAURANT SERVICES
// ==========================================

const createRestroService = async (restroData) => {
    try {
        // Basic sanitization
        if (restroData.restro_email) {
            restroData.restro_email = restroData.restro_email.trim().toLowerCase();
        }

        await restroModel.createRestro(restroData);
        return { success: true, message: 'Restro created successfully via service' };
    } catch (error) {
        console.log('Error creating restro in service:', error);
        throw error;
    }
}

const editRestroService = async (restroParams, restroData) => {
    try {
        if (!restroParams.restro_id) {
            return { success: false, message: 'Restaurant ID is missing' };
        }

        if (restroData.restro_email) {
            restroData.restro_email = restroData.restro_email.trim().toLowerCase();
        }

        await restroModel.editRestro(restroParams, restroData);
        return { success: true, message: 'Restro edited successfully via service' };
    } catch (error) {
        console.log('Error editing restro in service:', error);
        throw error;
    }
}

const getRestroService = async (restroParams) => {
    try {
        if (!restroParams.restro_id) {
            return { success: false, message: 'Restaurant ID is missing' };
        }

        const restro = await restroModel.getRestro(restroParams);
        return restro;
    } catch (error) {
        console.log('Error retrieving restro in service:', error);
        throw error;
    }
}

const getAllRestrosService = async () => {
    try {
        const restros = await restroModel.getAllRestros();
        return restros;
    } catch (error) {
        console.log('Error retrieving all restros in service:', error);
        throw error;
    }
}

const deleteRestroService = async (restroParams) => {
    try {
        if (!restroParams.restro_id) {
            return { success: false, message: 'Restaurant ID is missing' };
        }

        await restroModel.deleteRestro(restroParams);
        return { success: true, message: 'Restro deleted successfully via service' };
    } catch (error) {
        console.log('Error deleting restro in service:', error);
        throw error;
    }
}

// ==========================================
// MENU ITEM SERVICES
// ==========================================

const createMenuItemService = async (menuData) => {
    try {
        if (!menuData.restro_id) {
            return { success: false, message: 'Restaurant ID is required for a menu item' };
        }

        await restroModel.createMenuItem(menuData);
        return { success: true, message: 'Menu item created successfully via service' };
    } catch (error) {
        console.log('Error creating menu item in service:', error);
        throw error;
    }
}

const editMenuItemService = async (menuParams, menuData) => {
    try {
        if (!menuParams.item_id) {
            return { success: false, message: 'Menu Item ID is missing' };
        }

        await restroModel.editMenuItem(menuParams, menuData);
        return { success: true, message: 'Menu item edited successfully via service' };
    } catch (error) {
        console.log('Error editing menu item in service:', error);
        throw error;
    }
}

const getMenuItemService = async (menuParams) => {
    try {
        if (!menuParams.item_id) {
            return { success: false, message: 'Menu Item ID is missing' };
        }

        const menuItem = await restroModel.getMenuItem(menuParams);
        return menuItem;
    } catch (error) {
        console.log('Error retrieving menu item in service:', error);
        throw error;
    }
}

const getAllMenuItemsService = async (menuParams) => {
    try {
        if (!menuParams.restro_id) {
            return { success: false, message: 'Restaurant ID is missing' };
        }

        const menuItems = await restroModel.getAllMenuItems(menuParams);
        return menuItems;
    } catch (error) {
        console.log('Error retrieving menu items in service:', error);
        throw error;
    }
}

const deleteMenuItemService = async (menuParams) => {
    try {
        if (!menuParams.item_id) {
            return { success: false, message: 'Menu Item ID is missing' };
        }

        await restroModel.deleteMenuItem(menuParams);
        return { success: true, message: 'Menu item deleted successfully via service' };
    } catch (error) {
        console.log('Error deleting menu item in service:', error);
        throw error;
    }
}

module.exports = {
    createRestroService,
    editRestroService,
    getRestroService,
    getAllRestrosService,
    deleteRestroService,
    createMenuItemService,
    editMenuItemService,
    getMenuItemService,
    getAllMenuItemsService,
    deleteMenuItemService
};