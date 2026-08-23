require('dotenv').config();
const db = require('../config/db');

async function createTable() {
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS ordered_items(
            order_item_id SERIAL PRIMARY KEY,
            order_id VARCHAR(100) NOT NULL,
            item_id VARCHAR(100) NOT NULL,
            item_quantity INTEGER NOT NULL,
            item_amount DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

            CONSTRAINT fk_orderItems_order
            FOREIGN KEY(order_id)
            REFERENCES orders(order_id)
            ON DELETE CASCADE,

            CONSTRAINT fk_orderItems_menuItems
            FOREIGN KEY(item_id)
            REFERENCES menu_items(item_id)
            ON DELETE CASCADE
        ); `;        
        await db.none(query)
        console.log('Ordered items table created successfully')
    }
    catch (error) {
        console.error('Error creating ordered items table:', error)
    }
}

createTable();