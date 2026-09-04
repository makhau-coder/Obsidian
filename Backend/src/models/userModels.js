const db = require('../config/db');

const createUser = async (user_id, userData) => {
    try {
        const query = 'INSERT INTO users (user_id, user_firstname, user_lastname, user_gender, user_role, user_email, user_phone, user_password, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const result = await db.one(query, [user_id, userData.user_firstname, userData.user_lastname, userData.user_gender, userData.user_role, userData.user_email, userData.user_phone, userData.user_password, new Date()]);
        return result;
    }
    catch (error) {
        console.log('Error creating user in model:', error);
        throw error;
    }
}

const editUser = async (userParams, userData) => {
    try {
        const query = `UPDATE users SET user_firstname=$1, user_lastname=$2, user_gender=$3, user_email=$4, user_phone=$5, user_role=$6, user_password=$7 WHERE user_id=$8 RETURNING *`;
        const result = await db.one(query, [userData.user_firstname, userData.user_lastname, userData.user_gender, userData.user_email, userData.user_phone, userData.user_role, userData.user_password, userParams.user_id]);
        return result;
    }
    catch (error) {
        console.log('Error updating user in model:', error);
        throw error;
    }
}

const getUserbyId = async (userParams) => {
    try {
        const query = `SELECT * from users WHERE user_id=$1`;
        const user = await db.oneOrNone(query, [userParams.user_id]);
        return user;
    }
    catch (error) {
        console.log('Error finding user in model by Id:', error);
        throw error;
    }
}

const getUserbyEmail = async (userParams) => {
    try {
        const query = `SELECT * from users WHERE user_email=$1`;
        const user = await db.oneOrNone(query, [userParams.user_email]);
        return user;
    }
    catch (error) {
        console.log('Error finding user in model by email:', error);
        throw error;
    }
}

const getAllUsers = async () => {
    try {
        const query = `SELECT * from users ORDER BY created_at DESC`;
        const users = await db.any(query);
        return users;
    }
    catch (error) {
        console.log('Error returning all users in model:', error);
        throw error;
    }
}

const deleteUser = async (userParams) => {
    try {
        const query = `DELETE from users WHERE user_id=$1 RETURNING *`;
        const result = await db.one(query, [userParams.user_id]);
        return result;
    }
    catch (error) {
        console.log('Error deleting users in model:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    editUser,
    getUserbyId,
    getUserbyEmail,
    getAllUsers,
    deleteUser
}