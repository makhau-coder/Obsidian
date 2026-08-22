const restroModel = require('../models/restroModels')

const createRestroController = async(req,res) =>{
    try{
        await restroModel.createRestro(req.body);
        res.status(201).json({success:true, message: `Restro ${req.body.restro_id} created successfully`});
    }
    catch(error){
        console.error('Error creating restro in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const editRestroController = async(req,res) =>{
    try{
        await restroModel.editRestro(req.params,req.body);
        res.status(201).json({success:true, message: `Restro ${req.params.restro_id} edited successfully`});
    }
    catch(error){
        console.error('Error editing restro in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getRestroController = async(req,res) => {
    try{
        const restro= await restroModel.getRestro(req.params);
        res.status(201).json({success:true, restro: restro.restro});
    }
    catch(error) {
        console.error(`Error retrieving restro ${req.params.restro_id} in controller:`, error);
        res.status(500).json({success:false, message:error.message});
    }
}

const getAllRestrosController = async(req,res) => {
    try{
        const restros= await restroModel.getAllRestros();
        res.status(201).json({success:true, restros: restros.restros});
    }
    catch(error) {
        console.error('Error retrieving restros in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

const deleteRestroController = async(req,res) => {
    try{
        await restroModel.deleteRestro(req.params);
        res.status(201).json({success:true, message: `Restro ${req.params.restro_id} deleted successfully`});
    }
    catch(error) {
        console.error('Error deleting restro in controller:', error);
        res.status(500).json({success:false, message:error.message});
    }
}

module.exports = {
    createRestroController,
    editRestroController,
    getRestroController,
    getAllRestrosController,
    deleteRestroController
}