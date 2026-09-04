const { proc } = require('../config/db');
const authFunctions = require('./authFunctions')
require('dotenv').config
const isAuth = process.env.IS_AUTH === 'true';

const authMiddleware = async (req, res, next) => {
    try {
        if(!isAuth) return next();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ result: false, message: "Access token is absent" });
        }
        const token = authHeader.split(' ')[1];
        const result = await authFunctions.verifyJWT(token);
        if (result.success) {
            next();
        }
        else {
            return res.status(401).json({ result: false, message: "Invalid token" });
        }
    }
    catch (error) {
        return res.status(401).json({result: false,message: 'Invalid or expired access token'});
    }
}

module.exports = {
    authMiddleware
}