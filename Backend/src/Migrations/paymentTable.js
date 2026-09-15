const db = require('../config/db');

const createPaymentTable = async () => {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS payments (
                payment_id    VARCHAR(100) PRIMARY KEY,
                order_id      VARCHAR(100) NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
                amount        DECIMAL(10, 2) NOT NULL,
                method        VARCHAR(30)  NOT NULL DEFAULT 'CARD',
                status        VARCHAR(20)  NOT NULL DEFAULT 'PENDING',
                gateway_ref   VARCHAR(100),
                created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
                processed_at  TIMESTAMP
            );
        `;
        await db.none(query);
        console.log('payments table created (or already exists)');
        process.exit(0);
    } catch (error) {
        console.error('Error creating payments table:', error);
        process.exit(1);
    }
};

createPaymentTable();
