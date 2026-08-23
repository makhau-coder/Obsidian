const userModel = require('../models/userModels');
const regex = require('../models/regularExpressions');
const authentication = require('../auth/authFunctions');
const miscellaneousFunctions = require('../services/functions')

// Helper function to capitalize the first letter and make the rest lowercase
const INITCAP = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const createUserService = async (userData) => {
    try {

        const user_id = miscellaneousFunctions.generateUniqueId("USER");
        userData.user_firstname = miscellaneousFunctions.capitalizeFirstLetter(userData.user_firstname);
        userData.user_lastname = miscellaneousFunctions.capitalizeFirstLetter(userData.user_lastname);
        userData.user_gender = (userData.user_gender).trim().toUpperCase();

        if (!regex.emailRegex.test(userData.user_email)) {
            return { success: false, message: 'Invalid email id' };
        }
        userData.user_email = (userData.user_email).toLowerCase();

        if (!regex.phoneRegex.test(userData.user_phone)) {
            return { success: false, message: 'Invalid phone number' };
        }

        userData.user_password = await authentication.hashPassword(userData.user_password);

        const message=await userModel.createUser(user_id, userData);
        return { success: true, message: message.message, user_id:user_id };
    } catch (error) {
        console.log('Error creating user in service:', error);
        throw error;
    }
}

const editUserService = async (userParams, userData) => {
    try {
        // Apply sanitization and validation if the fields are present in the update request
        if (userData.firstname) {
            userData.user_firstname = miscellaneousFunctions.capitalizeFirstLetter(userData.user_firstname);
        }
        if (userData.lastname) {
            userData.user_lastname = miscellaneousFunctions.capitalizeFirstLetter(userData.user_lastname);
        }
        if (userData.user_gender) {
            userData.user_gender = (userData.user_gender).trim().toUpperCase();
        }

        if (userData.user_email) {
            if (!regex.emailRegex.test(userData.user_email)) {
                return { success: false, message: 'Invalid email id' };
            }
            userData.user_email = (userData.user_email).toLowerCase();
        }

        if (userData.user_phone) {
            if (!regex.phoneRegex.test(userData.user_phone)) {
                return { success: false, message: 'Invalid phone number' };
            }
        }

        if (userData.user_password) {
            userData.user_password = authentication.hashPassword(userData.user_password);
        }

        const message=await userModel.editUser(userParams, userData);
        return { success: true, message: message.message };
    } catch (error) {
        console.log('Error editing user in service:', error);
        throw error;
    }
}

const getUserService = async (userParams) => {
    try {
        // Basic validation to ensure the ID is passed
        if (!userParams.user_id) {
            return { success: false, message: 'User ID is missing' };
        }

        const user = await userModel.getUser(userParams);
        return {success: true, user:user};
    } catch (error) {
        console.log('Error retrieving user in service:', error);
        throw error;
    }
}

const getAllUsersService = async () => {
    try {
        const users = await userModel.getAllUsers();
        return {success: true, users:users};
    } catch (error) {
        console.log('Error retrieving all users in service:', error);
        throw error;
    }
}

const deleteUserService = async (userParams) => {
    try {
        // Basic validation to ensure the ID is passed before deleting
        if (!userParams.user_id) {
            return { success: false, message: 'User ID is missing' };
        }

        const message=await userModel.deleteUser(userParams);
        return { success: true, message: message.message };
    } catch (error) {
        console.log('Error deleting user in service:', error);
        throw error;
    }
}

module.exports = {
    createUserService,
    editUserService,
    getUserService,
    getAllUsersService,
    deleteUserService
};