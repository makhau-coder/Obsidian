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
            console.log('Validation Error: Invalid pincode');
            throw new Error('Invalid pincode');
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

        const userResult = await userService.createUserService(userData);

        const restroData = {
            restro_id: restro_id,
            restro_name: data.restro_name,
            restro_owner_id: userResult.user_id, 
            restro_location: data.restro_location,
            restro_pincode: data.restro_pincode
        }

        const result = await restroModel.createRestro(restroData);
        return result; 
    } catch (error) {
        console.log('Error creating restro in service:', error);
        throw error;
    }
}

const editRestroService = async (restroParams, restroData) => {
    try {
        if (!restroParams.restro_id) {
            console.log('Validation Error: Restaurant ID is missing');
            throw new Error('Restaurant ID is missing');
        }

        if (restroData.restro_email) {
            restroData.restro_email = restroData.restro_email.trim().toLowerCase();
        }

        const result = await restroModel.editRestro(restroParams, restroData);
        return result;
    } catch (error) {
        console.log('Error editing restro in service:', error);
        throw error;
    }
}

const getRestroService = async (restroParams) => {
    try {
        if (!restroParams.restro_id) {
            console.log('Validation Error: Restaurant ID is missing');
            throw new Error('Restaurant ID is missing');
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
            console.log('Validation Error: Restaurant ID is missing');
            throw new Error('Restaurant ID is missing');
        }

        const result = await restroModel.deleteRestro(restroParams);
        return result;
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
            console.log('Validation Error: Restaurant ID is required for a menu item');
            throw new Error('Restaurant ID is required for a menu item');
        }

        const item_id = miscellaneousFunctions.generateUniqueId('ITEM');
        menuData.item_id = item_id;

        const result = await restroModel.createMenuItem(menuData);
        return result;
    } catch (error) {
        console.log('Error creating menu item in service:', error);
        throw error;
    }
}

const editMenuItemService = async (menuParams, menuData) => {
    try {
        if (!menuParams.item_id) {
            console.log('Validation Error: Menu Item ID is missing');
            throw new Error('Menu Item ID is missing');
        }

        const result = await restroModel.editMenuItem(menuParams, menuData);
        return result;
    } catch (error) {
        console.log('Error editing menu item in service:', error);
        throw error;
    }
}

const getMenuItemService = async (menuParams) => {
    try {
        if (!menuParams.item_id) {
            console.log('Validation Error: Menu Item ID is missing');
            throw new Error('Menu Item ID is missing');
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
            console.log('Validation Error: Restaurant ID is missing');
            throw new Error('Restaurant ID is missing');
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
            console.log('Validation Error: Menu Item ID is missing');
            throw new Error('Menu Item ID is missing');
        }

        const result = await restroModel.deleteMenuItem(menuParams);
        return result;
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