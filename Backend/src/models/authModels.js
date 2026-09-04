const db = require('../config/db');

const insertJTI = async (jti, user_id, expires_at) => {
    try {
        const query = `INSERT INTO refresh_tokens (jti, user_id, expires_at, created_at, revoked_at) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
        const result = await db.one(query, [jti, user_id, expires_at, new Date(), new Date()])
        return result;
    }
    catch (error) {
        console.log('Error inserting jti in model: ', error);
        throw error;
    }
}

const getJTI = async (jti) => {
    try {
        const query = `SELECT * FROM refresh_tokens WHERE jti = $1 AND revoked_at IS NULL`;
        const result = await db.oneOrNone(query, [jti]);
        return result;
    }
    catch (error) {
        console.log('Error getting jti in model:', error);
        throw error;
    }
};

module.exports = {
    insertJTI,
    getJTI
};