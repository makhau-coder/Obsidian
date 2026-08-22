require('dotenv').config(); 
const db = require('../config/db');

async function createTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS restros (
            restro_id VARCHAR(255) PRIMARY KEY,
            restro_name VARCHAR(255) NOT NULL,
            restro_location TEXT NOT NULL,
            restro_phone VARCHAR(20),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- FIXED: Added DEFAULT
        );`;
        await db.none(query)
        console.log('Restro table created successfully')
    }
    catch (error) {
        console.error('Error creating restro table:', error)
    }
}

createTable();