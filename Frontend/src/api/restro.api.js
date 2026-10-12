import {api} from "./axios.js";

// RESTAURANT API
export const createRestro = async (restroData) => {
    try {
        const response = await api.post('/restro/createRestro', restroData);
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
            throw new Error('Error in creating restro');
        }
    }
}

export const editRestro = async (restroId, data) => {
    try {
        const response = await api.put(`/restro/editRestro/${restroId}`, data);
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
            throw new Error('Error in editing restro');
        }
    }
}

export const getRestroById = async (restroId) => {
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

export const getAllRestros = async () => {
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

export const deleteRestro = async (restroId) => {
    try {
        const response = await api.delete(`/restro/deleteRestro/${restroId}`);
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
            throw new Error('Error in deleting restro');
        }
    }
}

// MENU ITEM API
export const createMenuItem = async (menuItemData) => {
    try {
        const response = await api.post('/restro/createMenuItem', menuItemData);
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
            throw new Error('Error in creating menu item');
        }
    }
}

export const editMenuItem = async (itemId, data) => {
    try {
        const response = await api.put(`/restro/editMenuItem/${itemId}`, data);
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
            throw new Error('Error in editing menu item');
        }
    }
}

export const getMenuItemById = async (itemId) => {
    try {
        const response = await api.get(`/restro/getMenuItem/${itemId}`);
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
            throw new Error('Error in fetching menu item');
        }
    }
}

export const getMenuItemsByRestro = async (restroId) => {
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

export const deleteMenuItem = async (itemId) => {
    try {
        const response = await api.delete(`/restro/deleteMenuItem/${itemId}`);
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
            throw new Error('Error in deleting menu item');
        }
    }
}
