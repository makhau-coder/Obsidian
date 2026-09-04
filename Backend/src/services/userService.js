const userModel = require('../models/userModels');
const regex = require('../models/regularExpressions');
const authentication = require('../auth/authFunctions');
const miscellaneousFunctions = require('../services/functions')

const createUserService = async (userData) => {
    try {
        const user_id = miscellaneousFunctions.generateUniqueId("USER");
        userData.user_firstname = miscellaneousFunctions.capitalizeFirstLetter(userData.user_firstname);
        userData.user_lastname = miscellaneousFunctions.capitalizeFirstLetter(userData.user_lastname);
        userData.user_gender = (userData.user_gender).trim().toUpperCase();
        if (!regex.emailRegex.test(userData.user_email)) {
            console.log('Validation Error: Invalid email id');
            throw new Error('Invalid email id');
        }
        userData.user_email = (userData.user_email).toLowerCase();
        if (!regex.phoneRegex.test(userData.user_phone)) {
            console.log('Validation Error: Invalid phone number');
            throw new Error('Invalid phone number');
        }
        userData.user_password = await authentication.hashPassword(userData.user_password);
        const result = await userModel.createUser(user_id, userData);        
        return result; 
    } catch (error) {
        console.log('Error creating user in service:', error);
        throw error;
    }
}

const editUserService = async (userParams, userData) => {
    try {
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
                console.log('Validation Error: Invalid email id');
                throw new Error('Invalid email id');
            }
            userData.user_email = (userData.user_email).toLowerCase();
        }

        if (userData.user_phone) {
            if (!regex.phoneRegex.test(userData.user_phone)) {
                console.log('Validation Error: Invalid phone number');
                throw new Error('Invalid phone number');
            }
        }

        if (userData.user_password) {
            userData.user_password = await authentication.hashPassword(userData.user_password); // Added await here just in case!
        }

        const result = await userModel.editUser(userParams, userData);
        return result;
    } catch (error) {
        console.log('Error editing user in service:', error);
        throw error;
    }
}

const getUserService = async (userParams) => {

    try {
        if (!userParams.user_id && !userParams.user_email) {
            console.log('Validation Error: User ID and email both are missing');
            throw new Error('User ID and email both are missing');
        }
        if (userParams.user_id) {
            const user = await userModel.getUserbyId(userParams);
            return user;
        }
        else if (userParams.user_email) {
            const user = await userModel.getUserbyEmail(userParams);
            return user;
        }
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
        if (!userParams.user_id) {
            console.log('Validation Error: User ID is missing');
            throw new Error('User ID is missing');
        }

        const result = await userModel.deleteUser(userParams);
        return result; 
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