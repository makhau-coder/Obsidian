const db = require('../config/db');

const createRestro = async(restroData) => {
    try {
        const query = 'INSERT INTO restros (restro_id, restro_name, restro_location, restro_phone, created_at) VALUES ($1, $2, $3, $4, $5)';
        await db.none(query, [restroData.restro_id, restroData.restro_name, restroData.restro_location, restroData.restro_phone, new Date()]);
        return {success:true, message:'Restro created successfully'};
    }
    catch(error) {
        console.log('Error creating restro in model:', error);
        throw error;
    }
}

const editRestro = async(restroParams, restroData) => {
    try {
        const query=`UPDATE restros SET restro_name=$1, restro_location=$2, restro_phone=$3 WHERE restro_id=$4`;
        await db.none(query, [restroData.restro_name, restroData.restro_location, restroData.restro_phone, restroParams.restro_id]);
        return {success:true, message:'Restro updated successfully'};
    }
    catch(error) {
        console.log('Error updating restro in model:', error);
        throw error;
    }
}

const getRestro = async(restroParams) => {
    try {
        const query = `SELECT * from restros WHERE restro_id=$1`;
        const restro = await db.one(query, [restroParams.restro_id]);
        return {success:true, restro:restro};
    }
    catch(error) {
        console.log('Error finding restro in model:', error);
        throw error;
    }
}

const getAllRestros = async()=> {
    try {
        const query = `SELECT * from restros ORDER BY created_at DESC`;
        const restros = await db.many(query);
        return {success:true, restros:restros};
    }
    catch(error) {
        console.log('Error returning all restros in model:', error);
        throw error;
    }
}

const deleteRestro = async(restroParams)=> {
    try {
        const query = `DELETE from restros WHERE restro_id=$1`;
        await db.none(query, [restroParams.restro_id]);
        return {success:true, message:'Restro deleted successfully'};
    }
    catch(error) {
        console.log('Error deleting restro in model:', error);
        throw error;
    }
}

module.exports = {
    createRestro,
    editRestro,
    getRestro,
    getAllRestros,
    deleteRestro
}