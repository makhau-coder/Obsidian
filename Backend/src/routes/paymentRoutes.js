const express = require('express');
const paymentRouter = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../auth/authMiddleware');

paymentRouter.use(express.json());

paymentRouter.get('/', (req, res) => {
    res.send('Payment service is running');
});

// Initiate a new payment for an order
paymentRouter.post('/initiate', authMiddleware.authMiddleware, paymentController.initiatePaymentController);

// Process (simulate) an existing pending payment
paymentRouter.post('/process/:payment_id', authMiddleware.authMiddleware, paymentController.processPaymentController);

// Get the latest payment record for a specific order
paymentRouter.get('/getByOrder/:order_id', authMiddleware.authMiddleware, paymentController.getPaymentByOrderIdController);

// Get a single payment by its own ID
paymentRouter.get('/getById/:payment_id', authMiddleware.authMiddleware, paymentController.getPaymentByIdController);

// Get all payment records (admin use)
paymentRouter.get('/getAllPayments', authMiddleware.authMiddleware, paymentController.getAllPaymentsController);

module.exports = paymentRouter;
