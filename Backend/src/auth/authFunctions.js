const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const hashPassword = async (pass) => {
    try {
        const hashedPassword = await bcrypt.hash(pass, 10);
        console.log(hashedPassword);
        return hashedPassword;
    }
    catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const comparePassword = async (user_email, user_pass) => {

    try {
        const UserService = require('../services/userService');
        const user = await UserService.getUserService({ user_email: user_email });
        const hashedPassword = user.user_password;
        const isMatch = await bcrypt.compare(user_pass, hashedPassword);
        return isMatch;
    }
    catch (error) {
        console.error('Error comparing password:', error);
        throw error;
    }
}

const verifyJWT = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        return { success: true, data: decoded };
    }
    catch (error) {
        console.log('Error verifying access token:', error);
        throw error;
    }
}

const generateAccessToken = async (user) => {
    try {
        const token = jwt.sign(
            {
                user_id: user.user_id
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRES || '15m'
            }
        );
        return token;
    }
    catch (error) {
        console.log('Error while generating access token:', error);
        throw (error);
    }
}

const generateRefreshToken = async (user) => {
    try {
        const jti = crypto.randomUUID();
        const token = jwt.sign(
            {
                user_id: user.user_id
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
                jwtid: jti
            }
        );
        const decoded = jwt.decode(token);
        return {token,jti,expiresAt: new Date(decoded.exp * 1000)
        };
    }
    catch (error) {
        console.log('Error while generating refresh token:', error);
        throw (error);
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    verifyJWT,
    generateAccessToken,
    generateRefreshToken
}