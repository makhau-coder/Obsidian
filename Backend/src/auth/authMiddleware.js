const authFunctions = require('./authFunctions')
const isAuth = process.env.IS_AUTH === 'true';

const authMiddleware = async (req, res, next) => {
    try {
        if(!isAuth) return next();
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, message: "Access token is absent" });
        }
        const token = authHeader.split(' ')[1];
        const decoded = await authFunctions.verifyJWT(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({success: false, message: 'Invalid or expired access token'});
    }
}

module.exports = {
    authMiddleware
}