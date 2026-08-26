const authService = require('../services/authService')

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = { email: req.body.user_email, password: req.body.user_password };
        const { accessToken, refreshToken } = await authService.loginService(email, password);
        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
        res.status(200).json({ success: true, accessToken });
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
        res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
        res.status(201).json({ success: true, message: 'User registered successfully', accessToken });
    }
    catch (error) {
        console.error('Error in registerController:', error);
        next(error);
    }
}

const refreshController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ success: false, message: 'Refresh token not found' });
        }
        const accessToken = await authService.refreshService(refreshToken);
        return res.status(200).json({ success: true, accessToken });
    } catch (error) {
        console.error('Error in refreshController:', error);
        next(error);
    }
};

const logoutController = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            await authService.logoutService(refreshToken);
        }
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        return res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
        console.error('Error in logoutController:', error);
        next(error);
    }
};

module.exports = {
    loginController,
    registerController,
    refreshController,
    logoutController
}
