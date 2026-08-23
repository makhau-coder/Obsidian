require('dotenv').config(); 
const db = require('../config/db');

async function createTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS restros (
            restro_id VARCHAR(100) PRIMARY KEY,
            restro_owner_id VARCHAR(100) NOT NULL,
            restro_name VARCHAR(100) NOT NULL,
            restro_location TEXT NOT NULL,
            restro_pincode VARCHAR(7) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_restro_user
            FOREIGN KEY (restro_owner_id)
            REFERENCES users (user_id)
            ON DELETE CASCADE
        );`
        await db.none(query)
        console.log('Restro table created successfully')
    }
    catch (error) {
        console.error('Error creating restro table:', error)
    }
}

createTable();