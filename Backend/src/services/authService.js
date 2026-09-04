const authFunctions = require('../auth/authFunctions')
const userService = require('../services/userService')
const authModel = require('../models/authModels')

const loginService = async(email, password)=> {
    try {
        const isGood = await authFunctions.comparePassword(email, password);
        const user = await userService.getUserService({"user_email" : email});
        if (isGood) {
            const accessToken = await authFunctions.generateAccessToken(user);
            const {refreshToken,jti,expiresAt}=await authFunctions.generateRefreshToken(user);
            const refreshTokenRow = await authModel.insertJTI(jti, user.user_id, expiresAt);
            console.log('Refresh token Id saved in DB', refreshTokenRow);
            console.log('User logged in:', user);
            return {accessToken,refreshToken};
        }
        else {
            console.log("Validation Error: Email or password is incorrect!!");
            throw new Error("Email or password is incorrect!!");
        }
    }
    catch (error)
    {
        console.log("Error in login Service. Error:", error);
        throw error;
    }
}

const registerService = async(userData)=> {
    try {
        const user = await userService.createUserService(userData);
        const accessToken = await authFunctions.generateAccessToken(user);
        const {refreshToken,jti,expiresAt}=await authFunctions.generateRefreshToken(user);
        const refreshTokenRow = await authModel.insertJTI(jti, user.user_id, expiresAt);
        console.log('Refresh token Id saved in DB', refreshTokenRow);        
        console.log('New User Registered:', user);
        return {accessToken,refreshToken};
    }
    catch (error) {
        console.log("Error in register Service. Error:", error);
        throw error;
    }
}

const jwt = require('jsonwebtoken');

const refreshService = async (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_SECRET);
        const { user_id, jti } = decoded;
        const session = await authModel.getRefreshToken(jti);
        if (!session) {
            return {success: false,message: 'Refresh token is invalid or revoked'};
        }
        const accessToken =authFunctions.generateAccessToken({user_id});
        return accessToken;
    } catch (error) {
        console.error('Error in refresh service:', error);
        throw error;
    }
};

module.exports = {
    loginService,
    registerService,
    refreshService
}