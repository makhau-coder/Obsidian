const userService = require('../services/userService');

const createUserController = async (req, res) => {
    try {
        const user = await userService.createUserService(req.body);
        res.status(201).json({ success: true, user:user });
    }
    catch (error) {
        console.error('Error creating user in controller:', error);
        next(error);
    }
}

const editUserController = async (req, res, next) => {
    try {
        const user = await userService.editUserService(req.params, req.body);
        res.status(200).json({ success: true, message: `User ${req.params.user_id} edited successfully`, user:user });
    }
    catch (error) {
        console.error('Error editing user in controller:', error);
        next(error);
    }
}

const getUserController = async (req, res) => {
    try {
        const user = await userService.getUserService(req.params);
        res.status(200).json({ success: true, user: user });
    }
    catch (error) {
        console.error(`Error retrieving user ${req.params.user_id} in controller:`, error);
        next(error);
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const users = await userService.getAllUsersService();
        res.status(200).json({ success: true, users: users });
    }
    catch (error) {
        console.error('Error retrieving all users in controller:', error);
        next(error);
    }
}

const deleteUserController = async (req, res) => {
    try {
        const user = await userService.deleteUserService(req.params);
        res.status(200).json({ success: true, user:user});
    }
    catch (error) {
        console.error('Error deleting user in controller:', error);
        next(error);
    }
}

module.exports = {
    createUserController,
    editUserController,
    getUserController,
    getAllUsersController,
    deleteUserController
}