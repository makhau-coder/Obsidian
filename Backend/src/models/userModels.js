const db = require('../config/db');

const createUser = async (userData) => {
    try {
        // FIXED: Added missing 'const' declaration
        const query = 'INSERT INTO users (user_id, user_name, user_gender, user_email, user_phone, user_password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7)';
        await db.none(query, [userData.user_id, userData.user_name, userData.user_gender, userData.user_email, userData.user_phone, userData.user_password, new Date()]);
        return { success: true, message: 'User created successfully' };
    }
    catch (error) {
        console.log('Error creating user in model:', error);
        throw error;
    }
}

const editUser = async (userParams, userData) => {
    try {
        const query = `UPDATE users SET user_name=$1, user_gender=$2, user_email=$3, user_phone=$4, user_password=$5 WHERE user_id=$6`;
        await db.none(query, [userData.user_name, userData.user_gender, userData.user_email, userData.user_phone, userData.user_password, userParams.user_id]);
        return { success: true, message: 'User updated successfully' };
    }
    catch (error) {
        console.log('Error updating user in model:', error);
        throw error;
    }
}

const getUser = async (userParams) => {
    try {
        const query = `SELECT * from users WHERE user_id=$1`;
        const user = await db.oneOrNone(query, [userParams.user_id]); 
        return { success: true, user: user };
    }
    catch (error) {
        console.log('Error finding user in model:', error);
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        const query = `SELECT * from users ORDER BY created_at DESC`;
        const users = await db.any(query);
        return { success: true, users: users };
    }
    catch (error) {
        console.log('Error returning all users in model:', error);
        throw error;
    }
}

const deleteUser = async (userParams) => {
    try {
        const query = `DELETE from users WHERE user_id=$1`;
        await db.none(query, [userParams.user_id]);
        return { success: true, message: 'User deleted successfully' };
    }
    catch (error) {
        console.log('Error deleting users in model:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    editUser,
    getUser,
    getAllUsers,
    deleteUser
}