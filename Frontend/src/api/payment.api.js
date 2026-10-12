import {api} from "./axios.js";

// PAYMENT API
export const initiatePayment = async (paymentData) => {
    try {
        const response = await api.post('/payment/initiate', paymentData);
        return response.data;
    }
    catch(error) {
        if(error.response) {
            console.log(error.response);
            throw new Error(error.response.data.message);
        }
        else
        {
            console.log(error.message);
            throw new Error('Error in initiating payment');
        }
    }
}

export const processPayment = async (paymentId) => {
    try {
        const response = await api.post(`/payment/process/${paymentId}`);
        return response.data;
    }
    catch(error) {
        if(error.response) {
            console.log(error.response);
            throw new Error(error.response.data.message);
        }
        else
        {
            console.log(error.message);
            throw new Error('Error in processing payment');
        }
    }
}

export const getPaymentByOrderId = async (orderId) => {
    try {
        const response = await api.get(`/payment/getByOrder/${orderId}`);
        return response.data;
    }
    catch(error) {
        if(error.response) {
            console.log(error.response);
            throw new Error(error.response.data.message);
        }
        else
        {
            console.log(error.message);
            throw new Error('Error in fetching payment by order');
        }
    }
}

export const getPaymentById = async (paymentId) => {
    try {
        const response = await api.get(`/payment/getById/${paymentId}`);
        return response.data;
    }
    catch(error) {
        if(error.response) {
            console.log(error.response);
            throw new Error(error.response.data.message);
        }
        else
        {
            console.log(error.message);
            throw new Error('Error in fetching payment');
        }
    }
}

export const getAllPayments = async () => {
    try {
        const response = await api.get('/payment/getAllPayments');
        return response.data;
    }
    catch(error) {
        if(error.response) {
            console.log(error.response);
            throw new Error(error.response.data.message);
        }
        else
        {
            console.log(error.message);
            throw new Error('Error in fetching all payments');
        }
    }
}
