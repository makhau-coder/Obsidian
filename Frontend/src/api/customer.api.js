import {api} from "./axios.js";

// RESTRO API
export const getAllRestros = async ()=> {
    try {
        const response = await api.get('/restro/getAllRestros');
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
            throw new Error('Error in fetching all restros');
        }
    }
}

export const getRestroById = async (restroId)=> {
    try {
        const response = await api.get(`/restro/getRestro/${restroId}`);
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
            throw new Error('Error in fetching restro');
        }
    }
}

export const getMenuItemsByRestro = async (restroId)=> {
    try {
        const response = await api.get(`/restro/getAllMenuItems/${restroId}`);
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
            throw new Error('Error in fetching menu items by restro');
        }
    }
}

// USER API
export const getUserById = async (userId)=> {
    try {
        const response = await api.get(`/user/getUser/${userId}`);
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
            throw new Error('Error in fetching user');
        }
    }
}

// ORDER API
export const getOrderById = async (orderId)=> {
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

export const getOrdersByUserId = async (userId)=> {
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

export const getAllOrderedItems = async (orderId)=> {
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
            throw new Error('Error in fetching ordered items');
        }
    }
}
