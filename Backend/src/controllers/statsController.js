const statsService = require('../services/statsService');

const getTableCountsController = async (req, res, next) => {
    try {
        const counts = await statsService.getTableCountsService();
        res.status(200).json({ success: true, counts });
    } catch (error) {
        console.error('Error in getTableCountsController:', error);
        next(error);
    }
}

module.exports = {
    getTableCountsController
};
