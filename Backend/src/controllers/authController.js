const userService = require('../services/userService')
const authFunctions = require('../auth/authFunctions')
const authService = require('../services/authService')

const loginController = async (req, res, next) => {
    try {
        const { email, password } = { email: req.body.user_email, password: req.body.user_password };
        const { accessToken, refreshToken } = await authService.loginService(email, password);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        res.status(200).json({ success: true, JWT: { accessToken, refreshToken } });
        next();
    }
    catch (error) {
        console.error('Error in loginController:', error);
        next(error);
    }
}

const registerController = async (req, res, next) => {
    try {
        const { accessToken, refreshToken } = await authService.registerService(req.body);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        res.status(201).json({ success: true, message: 'User registered successfully', JWT: { accessToken, refreshToken } });
        next();
    }
    catch (error) {
        console.error('Error in registerController:', error);
        next(error);
    }
}

const refreshController = async (req, res) => {
    try {
        const refreshToken = req.body;
        const result = await authService.refreshService(refreshToken);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Error in refresh controller:', error);
        next (error);
    }
};


module.exports = {
    loginController,
    registerController,
    refreshController
}
