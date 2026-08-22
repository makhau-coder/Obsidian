require('dotenv').config(); 
const db = require('../config/db');

async function createTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS menu_items (
            item_id SERIAL PRIMARY KEY,
            restro_id VARCHAR(255) NOT NULL, -- FIXED: Changed to VARCHAR to match restros PK
            item_name VARCHAR(255) NOT NULL,
            item_description TEXT,
            item_price DECIMAL(10,2) NOT NULL,
            is_available BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_menu_restro
                FOREIGN KEY (restro_id)
                REFERENCES restros(restro_id)
                ON DELETE CASCADE
        );`; 
        await db.none(query)
        console.log('Menu items table created successfully')
    }
    catch (error) {
        console.error('Error creating menu items table:', error)
    }
}

createTable();