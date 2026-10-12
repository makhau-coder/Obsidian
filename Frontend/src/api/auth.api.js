import {api} from "./axios.js";

// AUTH API
export const login = async (credentials) => {
    try {
        const response = await api.post('/auth/login', credentials);
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
            throw new Error('Error in logging in');
        }
    }
}

export const register = async (userData) => {
    try {
        const response = await api.post('/auth/register', userData);
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
            throw new Error('Error in registering user');
        }
    }
}

export const refresh = async () => {
    try {
        const response = await api.post('/auth/refresh');
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
            throw new Error('Error in refreshing token');
        }
    }
}

export const logout = async () => {
    try {
        const response = await api.post('/auth/logout');
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
            throw new Error('Error in logging out');
        }
    }
}
