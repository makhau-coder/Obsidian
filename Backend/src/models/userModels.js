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
        const query = `UPDATE users SET user_firstname=COALESCE($1, user_firstname), user_lastname=COALESCE($2, user_lastname), user_gender=COALESCE($3, user_gender), user_email=COALESCE($4, user_email), user_phone=COALESCE($5, user_phone), user_role=COALESCE($6, user_role), user_password=COALESCE($7, user_password) WHERE user_id=$8 RETURNING *`;
        const result = await db.one(query, [userData.user_firstname || null, userData.user_lastname || null, userData.user_gender || null, userData.user_email || null, userData.user_phone || null, userData.user_role || null, userData.user_password || null, userParams.user_id]);
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