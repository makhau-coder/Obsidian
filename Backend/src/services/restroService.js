const restroModel = require('../models/restroModels');
const userService = require('../services/userService');
const miscellaneousFunctions = require('../services/functions')
const regex = require('../models/regularExpressions');


// ==========================================
// RESTAURANT SERVICES
// ==========================================

const createRestroService = async (data) => {
    try {

        const restro_id = miscellaneousFunctions.generateUniqueId("RESTRO");

        if (data.restro_email) {
            data.restro_email = data.restro_email.trim().toLowerCase();
        }

        data.restro_name = miscellaneousFunctions.capitalizeFirstLetter(data.restro_name);

        if (!regex.pincodeRegex.test(data.restro_pincode)) {
            return { success: false, message: 'Invalid pincode' };
        }
        
        const userData = {
            user_firstname: data.user_firstname,
            user_lastname: data.user_lastname,
            user_gender: data.user_gender,
            user_role: data.user_role,
            user_email: data.restro_email,
            user_phone: data.restro_phone,
            user_password: data.restro_password
        }

        const user_message = await userService.createUserService(userData);

        const restroData = {
            restro_id: restro_id,
            restro_name: data.restro_name,
            restro_owner_id: user_message.user_id,
            restro_location: data.restro_location,
            restro_pincode: data.restro_pincode
        }

        const restro_message = await restroModel.createRestro(restroData);
        return { success: true, message: restro_message.message + "\n" + user_message.message };
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