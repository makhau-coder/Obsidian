require('dotenv').config();
const db = require('../config/db');

async function createTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS orders (
            order_id VARCHAR(100) PRIMARY KEY NOT NULL,
            user_id VARCHAR(100) NOT NULL,
            restro_id VARCHAR(255) NOT NULL,
            order_status VARCHAR(30) DEFAULT 'PLACED',
            total_amount DECIMAL(10,2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_order_user
                FOREIGN KEY (user_id)
                REFERENCES users(user_id)
                ON DELETE CASCADE,

            CONSTRAINT fk_order_restro
                FOREIGN KEY (restro_id)
                REFERENCES restros(restro_id) -- FIXED: Pointed to correct restros table
                ON DELETE CASCADE
        );`;
        await db.none(query)
        console.log('Order table created successfully')
    }
    catch (error) {
        console.error('Error creating order table:', error)
    }
}

createTable();