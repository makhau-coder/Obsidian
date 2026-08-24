const userService = require('../services/userService');

const createUserController = async (req, res) => {
    try {
        const result = await userService.createUserService(req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(201).json({ success: true, message: result.message });
    }
    catch (error) {
        console.error('Error creating user in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const editUserController = async (req, res) => {
    try {
        const result = await userService.editUserService(req.params, req.body);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({ success: true, message: `User ${req.params.user_id} edited successfully` });
    }
    catch (error) {
        console.error('Error editing user in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getUserController = async (req, res) => {
    try {
        const result = await userService.getUserService(req.params);

        if (!result.success) {
            return res.status(400).json(result);
        }

        if (!result.user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // handle stale Docker nested shape: result.user = { success, user: actualUser }
        const actualUser = result.user?.user !== undefined ? result.user.user : result.user;
        if (!actualUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, user: actualUser });
    }
    catch (error) {
        console.error(`Error retrieving user ${req.params.user_id} in controller:`, error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const getAllUsersController = async (req, res) => {
    try {
        const result = await userService.getAllUsersService();
        res.status(200).json({ success: true, users: result.users });
    }
    catch (error) {
        console.error('Error retrieving all users in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const deleteUserController = async (req, res) => {
    try {
        const result = await userService.deleteUserService(req.params);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.status(200).json({ success: true, message: result.message });
    }
    catch (error) {
        console.error('Error deleting user in controller:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = {
    createUserController,
    editUserController,
    getUserController,
    getAllUsersController,
    deleteUserController
}