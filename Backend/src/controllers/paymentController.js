const paymentService = require('../services/paymentService');

const initiatePaymentController = async (req, res, next) => {
    try {
        const payment = await paymentService.initiatePaymentService(req.body);
        res.status(201).json({ success: true, message: 'Payment initiated', payment });
    } catch (error) {
        console.error('Error in initiatePaymentController:', error);
        next(error);
    }
};

const processPaymentController = async (req, res, next) => {
    try {
        const result = await paymentService.processPaymentService(req.params.payment_id);
        const statusCode = result.success ? 200 : 402;
        res.status(statusCode).json({ success: result.success, message: result.message, payment: result.payment });
    } catch (error) {
        console.error('Error in processPaymentController:', error);
        next(error);
    }
};

const getPaymentByOrderIdController = async (req, res, next) => {
    try {
        const payment = await paymentService.getPaymentByOrderIdService(req.params.order_id);
        if (!payment) {
            return res.status(404).json({ success: false, message: 'No payment found for this order' });
        }
        res.status(200).json({ success: true, payment });
    } catch (error) {
        console.error('Error in getPaymentByOrderIdController:', error);
        next(error);
    }
};

const getPaymentByIdController = async (req, res, next) => {
    try {
        const payment = await paymentService.getPaymentByIdService(req.params.payment_id);
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        res.status(200).json({ success: true, payment });
    } catch (error) {
        console.error('Error in getPaymentByIdController:', error);
        next(error);
    }
};

const getAllPaymentsController = async (req, res, next) => {
    try {
        const payments = await paymentService.getAllPaymentsService();
        res.status(200).json({ success: true, payments });
    } catch (error) {
        console.error('Error in getAllPaymentsController:', error);
        next(error);
    }
};

module.exports = {
    initiatePaymentController,
    processPaymentController,
    getPaymentByOrderIdController,
    getPaymentByIdController,
    getAllPaymentsController
};
