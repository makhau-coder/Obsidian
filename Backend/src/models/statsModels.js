const db = require('../config/db');

const getTableCounts = async () => {
    try {
        const query = `
            SELECT 
                (SELECT COUNT(*) FROM users) AS users_count,
                (SELECT COUNT(*) FROM restros) AS restros_count,
                (SELECT COUNT(*) FROM menu_items) AS menu_items_count,
                (SELECT COUNT(*) FROM orders) AS orders_count,
                (SELECT COUNT(*) FROM ordered_items) AS ordered_items_count,
                (SELECT COUNT(*) FROM refresh_tokens) AS refresh_tokens_count
        `;
        const result = await db.oneOrNone(query);
        return result;
    } catch (error) {
        console.log('Error getting table counts in model:', error);
        throw error;
    }
}

module.exports = {
    getTableCounts
};
