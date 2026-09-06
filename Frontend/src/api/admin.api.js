import {api} from "./axios.js";

// USER API
export const getAllUsers = async ()=> {
    try {
        const response = await api.get('/user/getAllUsers');
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
            throw new Error('Error in fetching all users');
        }
    }
}

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

export const editUserById = async (userId, userData)=> {
    try {
        console.log("user data:", userData);
        const response = await api.put(`/user/editUser/${userId}`, userData);
        return response.data;
    } catch (error) {
        if(error.response) {
            console.log(error.response);
            throw new Error(error.response.data.message);
        }
        else
        {
            console.log(error.message);
            throw new Error('Error in editing user');
        }
    }
}


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


// ORDER API
export const getAllOrders = async ()=> {
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

export const editOrder = async ({orderId, data})=> {
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

export const deleteOrder = async (orderId)=> {
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

export const getTotalOrderAmount = async ()=> {
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


// STATS API
export const getTableCounts = async ()=> {
    try {
        const response = await api.get('/stats/counts');
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
            throw new Error('Error in fetching table counts');
        }
    }
}