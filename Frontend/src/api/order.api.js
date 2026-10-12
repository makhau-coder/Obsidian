import {api} from "./axios.js";

// ORDER API
export const createOrder = async (orderData) => {
    try {
        const response = await api.post('/order/createOrder', orderData);
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
            throw new Error('Error in creating order');
        }
    }
}

export const editOrder = async (orderId, data) => {
    try {
        const response = await api.put(`/order/editOrder/${orderId}`, data);
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
            throw new Error('Error in editing order');
        }
    }
}

export const getOrderById = async (orderId) => {
    try {
        const response = await api.get(`/order/getOrder/${orderId}`);
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
            throw new Error('Error in fetching order');
        }
    }
}

export const getAllOrders = async () => {
    try {
        const response = await api.get('/order/getAllOrders');
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
            throw new Error('Error in fetching all orders');
        }
    }
}

export const deleteOrder = async (orderId) => {
    try {
        const response = await api.delete(`/order/deleteOrder/${orderId}`);
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
            throw new Error('Error in deleting order');
        }
    }
}

export const getTotalOrderAmount = async () => {
    try {
        const response = await api.get('/order/getTotalOrderAmount');
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
            throw new Error('Error in fetching total order amount');
        }
    }
}

export const getTotalOrderAmountByUserId = async (userId) => {
    try {
        const response = await api.get(`/order/getTotalOrderAmountByUserId/${userId}`);
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
            throw new Error('Error in fetching total order amount by user');
        }
    }
}

export const getTotalOrderAmountByRestroId = async (restroId) => {
    try {
        const response = await api.get(`/order/getTotalOrderAmountByRestroId/${restroId}`);
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
            throw new Error('Error in fetching total order amount by restro');
        }
    }
}

export const getOrdersByUserId = async (userId) => {
    try {
        const response = await api.get(`/order/getOrdersByUserId/${userId}`);
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
            throw new Error('Error in fetching orders by user');
        }
    }
}

export const getOrdersByRestroId = async (restroId) => {
    try {
        const response = await api.get(`/order/getOrdersByRestroId/${restroId}`);
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
            throw new Error('Error in fetching orders by restro');
        }
    }
}

// ORDERED ITEMS API
export const createOrderedItem = async (orderedItemData) => {
    try {
        const response = await api.post('/order/createOrderedItem', orderedItemData);
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
            throw new Error('Error in creating ordered item');
        }
    }
}

export const editOrderedItem = async (orderItemId, data) => {
    try {
        const response = await api.put(`/order/editOrderedItem/${orderItemId}`, data);
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
            throw new Error('Error in editing ordered item');
        }
    }
}

export const getOrderedItemById = async (orderItemId) => {
    try {
        const response = await api.get(`/order/getOrderedItem/${orderItemId}`);
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
            throw new Error('Error in fetching ordered item');
        }
    }
}

export const getAllOrderedItems = async (orderId) => {
    try {
        const response = await api.get(`/order/getAllOrderedItems/${orderId}`);
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
            throw new Error('Error in fetching all ordered items');
        }
    }
}

export const deleteOrderedItem = async (orderItemId) => {
    try {
        const response = await api.delete(`/order/deleteOrderedItem/${orderItemId}`);
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
            throw new Error('Error in deleting ordered item');
        }
    }
}
