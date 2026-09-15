const paymentModel = require('../models/paymentModels');
const miscellaneousFunctions = require('../services/functions');
const crypto = require('crypto');

// Simulate an external gateway reference (e.g. Razorpay/Stripe txn ID)
const generateGatewayRef = () => {
    return 'GW_' + crypto.randomBytes(8).toString('hex').toUpperCase();
};

const initiatePaymentService = async (paymentData) => {
    try {
        if (!paymentData.order_id) {
            throw new Error('Order ID is required to initiate a payment');
        }
        if (!paymentData.amount || isNaN(paymentData.amount) || paymentData.amount <= 0) {
            throw new Error('A valid positive amount is required');
        }

        const ALLOWED_METHODS = ['CARD', 'UPI', 'WALLET', 'COD'];
        const method = paymentData.method
            ? paymentData.method.trim().toUpperCase()
            : 'CARD';
        if (!ALLOWED_METHODS.includes(method)) {
            throw new Error(`Invalid payment method. Allowed: ${ALLOWED_METHODS.join(', ')}`);
        }

        const payment_id = miscellaneousFunctions.generateUniqueId('PAY');

        const payment = await paymentModel.createPayment({
            payment_id,
            order_id: paymentData.order_id,
            amount: paymentData.amount,
            method,
            status: 'PENDING',
            gateway_ref: null
        });

        console.log('Payment initiated:', payment);
        return payment;
    } catch (error) {
        console.log('Error in initiatePaymentService:', error);
        throw error;
    }
};

const processPaymentService = async (payment_id) => {
    try {
        if (!payment_id) {
            throw new Error('Payment ID is required');
        }

        const existing = await paymentModel.getPaymentById(payment_id);
        if (!existing) {
            throw new Error('Payment not found');
        }
        if (existing.status !== 'PENDING') {
            throw new Error(`Payment already processed. Current status: ${existing.status}`);
        }

        // Fake simulation: 90% success rate, 10% failure
        const isSuccess = Math.random() < 0.9;
        const newStatus = isSuccess ? 'SUCCESS' : 'FAILED';
        const gateway_ref = isSuccess ? generateGatewayRef() : null;

        // Simulate processing delay (non-blocking — just for logging context)
        console.log(`Processing payment ${payment_id}... Result: ${newStatus}`);

        const updated = await paymentModel.updatePaymentStatus(payment_id, newStatus, gateway_ref);
        return {
            payment: updated,
            success: isSuccess,
            message: isSuccess
                ? `Payment successful. Gateway ref: ${gateway_ref}`
                : 'Payment failed. Please try again.'
        };
    } catch (error) {
        console.log('Error in processPaymentService:', error);
        throw error;
    }
};

const getPaymentByOrderIdService = async (order_id) => {
    try {
        if (!order_id) {
            throw new Error('Order ID is required');
        }
        const payment = await paymentModel.getPaymentByOrderId(order_id);
        return payment;
    } catch (error) {
        console.log('Error in getPaymentByOrderIdService:', error);
        throw error;
    }
};

const getPaymentByIdService = async (payment_id) => {
    try {
        if (!payment_id) {
            throw new Error('Payment ID is required');
        }
        const payment = await paymentModel.getPaymentById(payment_id);
        return payment;
    } catch (error) {
        console.log('Error in getPaymentByIdService:', error);
        throw error;
    }
};

const getAllPaymentsService = async () => {
    try {
        const payments = await paymentModel.getAllPayments();
        return payments;
    } catch (error) {
        console.log('Error in getAllPaymentsService:', error);
        throw error;
    }
};

module.exports = {
    initiatePaymentService,
    processPaymentService,
    getPaymentByOrderIdService,
    getPaymentByIdService,
    getAllPaymentsService
};
