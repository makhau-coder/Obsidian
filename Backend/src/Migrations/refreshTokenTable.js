require('dotenv').config(); 
const db = require('../config/db');

async function createTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS refresh_tokens (
            jti VARCHAR(255) PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL, 
            expires_at TIMESTAMP,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            revoked_at TIMESTAMP,

            CONSTRAINT fk_user
            FOREIGN KEY (user_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE 

        );`;
        await db.none(query)
        console.log('Refresh tokens table created successfully')
    }
    catch (error) {
        console.error('Error creating refresh tokens table:', error)
    }
}

createTable();