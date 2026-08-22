require('dotenv').config(); 

const db = require('../config/db');

console.log(process.env.DB_PASSWORD);

async function createTable() {
    try {
        const query = 
        `CREATE TABLE IF NOT EXISTS users (
            user_id VARCHAR(100) PRIMARY KEY,
            user_name VARCHAR(100) NOT NULL,
            user_gender VARCHAR(20) NOT NULL ,
            user_email VARCHAR(100) UNIQUE NOT NULL,
            user_phone VARCHAR(20),
            user_password VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
        await db.none(query)
        console.log('User table created successfully')
    }
    catch (error) {
        console.error('Error creating user table:', error)
    }
}

createTable()