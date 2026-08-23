const userModel = require('../models/userModels');
const regex = require('../models/regularExpressions');
const authentication = require('../auth/authFunctions');

// Helper function to capitalize the first letter and make the rest lowercase
const INITCAP = (str) => {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const createUserService = async (userData) => {
    try {
        userData.user_firstname = INITCAP(userData.firstname);
        userData.user_lastname = INITCAP(userData.lastname);
        userData.user_gender = (userData.user_gender).trim().toUpperCase();
        
        if (!regex.emailRegex.test(userData.user_email)) {
            return { success: false, message: 'Invalid email id' };
        }
        userData.user_email = (userData.user_email).toLowerCase();
        
        if (!regex.phoneRegex.test(userData.user_phone)) {
            return { success: false, message: 'Invalid phone number' };
        }

        userData.user_password = authentication.hashPassword(userData.user_password);

        await userModel.createUser(userData);
        return { success: true, message: 'User created service worked successfully' };
    } catch (error) {
        console.log('Error creating user in service:', error);
        throw error;
    }
}

const editUserService = async (userParams, userData) => {
    try {
        // Apply sanitization and validation if the fields are present in the update request
        if (userData.firstname) {
            userData.user_firstname = INITCAP(userData.firstname);
        }
        if (userData.lastname) {
            userData.user_lastname = INITCAP(userData.lastname);
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

        await userModel.editUser(userParams, userData);
        return { success: true, message: 'User edited service worked successfully' };
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
        return user;
    } catch (error) {
        console.log('Error retrieving user in service:', error);
        throw error;
    }
}

const getAllUsersService = async () => {
    try {
        const users = await userModel.getAllUsers();
        return users;
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

        await userModel.deleteUser(userParams);
        return { success: true, message: 'User deleted service worked successfully' };
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