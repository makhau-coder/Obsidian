import {api} from "./axios.js";

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