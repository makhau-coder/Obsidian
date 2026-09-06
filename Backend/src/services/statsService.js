const statsModels = require('../models/statsModels');

const getTableCountsService = async () => {
    try {
        const result = await statsModels.getTableCounts();
        
        // PostgreSQL COUNT() returns a string, so we parse it to an integer
        return {
            users_count: parseInt(result.users_count, 10) || 0,
            restros_count: parseInt(result.restros_count, 10) || 0,
            menu_items_count: parseInt(result.menu_items_count, 10) || 0,
            orders_count: parseInt(result.orders_count, 10) || 0,
            ordered_items_count: parseInt(result.ordered_items_count, 10) || 0,
            refresh_tokens_count: parseInt(result.refresh_tokens_count, 10) || 0
        };
    } catch (error) {
        console.log('Error getting table counts in service:', error);
        throw error;
    }
}

module.exports = {
    getTableCountsService
};
